const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const multer = require("multer")
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');
const upload = multer({dest: "uploads/"}); //store the files here !!
const path = require("path");
const fs = require("fs");


app.use(bodyParser.urlencoded({ extended: false }));

router.put("/:userId/follow", async (req, res, next) => {

    var userId = req.params.userId;

    var user = await User.findById(userId);

    if (user == null) return res.sendStatus(404);

    var isFollowing = user.followers && user.followers.includes(req.session.user._id);
    var option = isFollowing ? "$pull" : "$addToSet";

    req.session.user = await User.findByIdAndUpdate(req.session.user._id, { [option]: { following: userId } }, { new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    User.findByIdAndUpdate(userId, { [option]: { followers: req.session.user._id } })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(req.session.user);
})

router.get("/:userId/following", async (req, res, next) => {
    User.findById(req.params.userId)
    .populate("following")
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

router.get("/:userId/followers", async (req, res, next) => {
    User.findById(req.params.userId)
    .populate("followers")
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

router.post("/profilePicture", upload.single("croppedImage") , async(req, res, next) =>{
    //now we will use a package called multer that handles all the nasty image handling stuff
    //this behaves like middleware we found this online
    if(!req.file){
        console.log("No file uploaded with ajax request");
        return res.sendStatus(400);
    }
    //WE MUST HANDLE THIS ROUTE !!!!
    var filePath = `/uploads/images/${req.file.filename}.png`; //file is a png??
    var tempPath = req.file.path;
    var targetPath = path.join(__dirname,`../../${filePath}`)
    //now move the file from that location to this one since we need it to be acessed for upload purposes on all locations
    fs.rename(tempPath, targetPath, async error => {
        if(error != null){
            console.log(error);
            return res.sendStatus(400);
        }
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, {profilePic : filePath},{new : true});
        //needs to put it inside the session
        res.sendStatus(204);
    });
});
module.exports = router;
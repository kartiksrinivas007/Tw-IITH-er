const express  = require('express');
const path = require('path');
const app = express();
const port = 3003;
const middleware = require("./middleware");

const server = app.listen(port, ()=> console.log('Server listening on port', port));


app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, 'public')));
//when you need a view  go to folder called views

const loginRoute = require('./routes/loginRoutes');
app.use('/login', loginRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
    //Middleware to Create authentication!

    var payload = {
        pageTitle : "Home"
    }
    //basically passing an object that contains all the data
    res.status(200).render("home", payload); //show that status code

})
//in case you enter something you can't get anything

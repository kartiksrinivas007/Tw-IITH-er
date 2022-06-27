
exports.requireLogin = (req, res, next) =>{
    if(req.session && req.session.user){
        return next();
        //passes on to the next step in the request response cycle
        //i.e it basically is in between the process of entering the app.use () and executing the content 
        
    }
    else{
        return res.redirect('/login')
        //res.redirect is how you redirect !
    }
}

// Route Protection Middlewear
let isUserAuthenticated = (req, res, next) =>{
    if (req.user) {
        next();
    } else {
        res.redirect("/");
    }
};



module.exports = isUserAuthenticated;
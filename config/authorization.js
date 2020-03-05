// Route Protection Middlewear
let isUserAuthenticated = (req, res, next) =>{
    if (req.user) {
        next();
    } else {
        res.riderect("/");
    }
};



module.exports = isUserAuthenticated;
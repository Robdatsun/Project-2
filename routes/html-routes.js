// Obj random variable placement

// Modules
const router = require("express").Router();
const path = require("path");
const isUserAuthenticated = require("../config/authorization");

// HTML routes
// Secure Route--isUserAuthenticated is a middlewear

router.get("/secret", isUserAuthenticated, (req, res) => {
    res.render("index", Obj);
});

module.exports = router;
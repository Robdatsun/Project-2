// res.sendFile will change to res.render

// Modules
const router = require("express").Router();
const path = require("path");
const isUserAuthenticated = require("../config/authorization");

// HTML routes
// Secure Route--isUserAuthenticated is a middlewear

router.get("/secret", isUserAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/secret.html"));
});

module.exports = router;
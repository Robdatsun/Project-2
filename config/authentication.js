require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

// Passport Initiate Google Strat
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CONSUMER_KEY,
            clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
            callbackURL: "http://localhost:8080/api/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            done(null, profile); // passes the profile data to serializeUser
        }
    )
);

// Handles token login
passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user);
});

// Handles token logout
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
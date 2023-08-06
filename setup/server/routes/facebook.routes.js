/* DEV-CGP-6 */

/* import packages */
const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");

/* import models */
const EmailAuthModel = require("../models/emailAuth.model");
const UserDetailModel = require("../models/userDetails.model");

/* setup user serialization */ 
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

/* Setup Facebook Strategy */
const FacebookStrategy = require("passport-facebook").Strategy;

passport.authorize('facebook', { scope : ['email'] })
passport.use(
  new FacebookStrategy ({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.BASE_URL + "/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'name', 'verified'],
    },
  async function(accessToken, refreshToken, profile, cb){

    const emailAuth = await EmailAuthModel.findOne({ facebookID: profile.id });

    if (emailAuth) {
        /* user exists -> generate token -> redirect to dashboard */
        const userDetail = await UserDetailModel.findOne({ email: emailAuth.email });

        const token = jwt.sign({ id: userDetail._id, userDetail: userDetail }, "shhhhh", {
          expiresIn: "2h",
        });

        userDetail.token = token;
        await userDetail.save(); // Save the user with the updated token
    }
    else {
        /* unregistered user -> create emaulAuth -> redirect to FBAccountSetup */
        const newEmailAuth = new EmailAuthModel({
          email: profile.id + "@facebook.com", password: profile.id,
          username: profile.name.givenName + " " + profile.name.familyName,
          facebookID: profile.id
        });

        newEmailAuth.save() 
    }

    return cb(null, profile);
  })
);

/* Facebook authorization routes */
router.get('/auth/facebook', cors(), passport.authenticate('facebook')
);

router.get('/auth/facebook/callback', cors(),
  passport.authenticate('facebook', { scope: ['email'], failureRedirect: 'http://localhost:3000/dashboard' }),
  async function(req, res) {
      // Successful authentication
      const userDetail = await UserDetailModel.findOne({ email: req.user.id + "@facebook.com" });
      const username = req.user.name.givenName + " " + req.user.name.familyName;
      const email = req.user.id + "@facebook.com";

      if (userDetail){        
        /* redirect to dashboard -> username and email in url for dashboard to access jwt */
        res.redirect('http://localhost:3000/dashboard?facebookEmail=' + email + "?username=" + username);
      }
      else{
        /* redirect to account setup */
        res.redirect('http://localhost:3000/account-setup?facebookEmail=' + email + "?username=" + username);
      }
  }
);

module.exports = router;

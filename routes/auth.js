const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const router = express.Router();
const dbUsers = require('../db/users');

function verify(username, password, done) {
    dbUsers.findByUserName(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!dbUsers.verifyPassword(user, password)) { return done(null, false); }
      return done(null, user);
    });
}
const options = {
    usernameField: "username",
    passwordField: "password",
}
passport.use('local', new LocalStrategy(options, verify));


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser( (id, cb) => {
    dbUsers.findById(id,  (err, user) => {
      if (err) { return cb(err) }
      cb(null, user)
    })
});

router.get('/user/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
});
router.get('/user/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/api/user/login');
    });
});
router.get('/user/me', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }else 
      next();
    },
    (req, res) => {
        res.render('auth/profile', {
            title: 'My pofile',
            user: req.user,
    });
});
router.post('/user/login', 
    passport.authenticate('local', { failureRedirect: '/api/user/login'}),
    (req, res) => {
        res.redirect('/api/user/me');
});
router.post('/user/signup', 
   (req, res, next) => {
        const { userName, displayName, email, age, password } = req.body;
        const result = dbUsers.createUser({ userName, displayName, email, age, password });
        if(result.user){
            req.logIn(result.user, function(err) {
                if (err) { return next(err); }
                res.redirect('/api/user/me');
              });      
        }else{
            res.json(result.err);
        }

    },

);

module.exports = router;
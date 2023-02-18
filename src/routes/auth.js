"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();
var dbUsers = require('../db/users');
function verify(username, password, done) {
    dbUsers.findByUserName(username, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!dbUsers.verifyPassword(user, password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}
var options = {
    usernameField: "username",
    passwordField: "password",
};
passport.use('local', new LocalStrategy(options, verify));
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    dbUsers.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
router.get('/user/login', function (req, res) {
    res.render('auth/login', {
        title: 'Login'
    });
});
router.get('/user/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/api/user/login');
    });
});
router.get('/user/me', function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }
    else
        next();
}, function (req, res) {
    res.render('auth/profile', {
        title: 'My pofile',
        user: req.user,
    });
});
router.post('/user/login', passport.authenticate('local', { failureRedirect: '/api/user/login' }), function (req, res) {
    res.redirect('/api/user/me');
});
router.post('/user/signup', function (req, res, next) {
    var _a = req.body, userName = _a.userName, displayName = _a.displayName, email = _a.email, age = _a.age, password = _a.password;
    var result = dbUsers.createUser({ userName: userName, displayName: displayName, email: email, age: age, password: password });
    if (result.user) {
        req.logIn(result.user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/api/user/me');
        });
    }
    else {
        res.json(result.err);
    }
});
exports.default = router;

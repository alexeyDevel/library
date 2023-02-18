const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const router = express.Router();
const dbUsers = require('../db/users');

function verify(username: string, password: string, done: any) {
    dbUsers.findByUserName(username, function (err:any, user:any) {
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


passport.serializeUser((user:any, cb:any) => {
    cb(null, user.id);
});
passport.deserializeUser( (id:any, cb:any) => {
    dbUsers.findById(id,  (err:any, user:any) => {
      if (err) { return cb(err) }
      cb(null, user)
    })
});

router.get('/user/login', (req: any, res: any) => {
    res.render('auth/login', {
        title: 'Login'
    });
});
router.get('/user/logout', (req: any, res: any, next: any) => {
    req.logout(function(err: any) {
        if (err) { return next(err); }
        res.redirect('/api/user/login');
    });
});
router.get('/user/me', (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }else 
      next();
    },
    (req: any, res: any) => {
        res.render('auth/profile', {
            title: 'My pofile',
            user: req.user,
    });
});
router.post('/user/login', 
    passport.authenticate('local', { failureRedirect: '/api/user/login'}),
    (req: any, res: any) => {
        res.redirect('/api/user/me');
});
router.post('/user/signup', 
   (req: any, res: any, next: any) => {
        const { userName, displayName, email, age, password } = req.body;
        const result = dbUsers.createUser({ userName, displayName, email, age, password });
        if(result.user){
            req.logIn(result.user, function(err: any) {
                if (err) { return next(err); }
                res.redirect('/api/user/me');
              });      
        }else{
            res.json(result.err);
        }

    },

);

export default router;
var User = require('../Dao/user');
var Event = require('../Dao/dummyjson');

module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/login', function(req, res){
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function(req, res){
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        Event.find({}).exec(function (err,even) {
            if(err){res.send('sorry please sleep')}
            else{

                res.render('profile.ejs', { user: req.user, event: even });
            }
        })

    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/profile',
            failureRedirect: '/' }));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/profile',
            failureRedirect: '/' }));


    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })

};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}
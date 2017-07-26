var express = require('express');
var router = express.Router();
var passport = require('passport');
const models = require('../models');
var cel = require('connect-ensure-login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
	res.render('index', {title : 'Register'});
})

router.post('/register', function(req, res, next) {
	//todo: no duplicate usernames
	models.Users.create({
		username: req.body.username,
		password: req.body.password,
		accountType: req.body.type === 'true' ? 'ADMIN' : 'CUSTOMER'
	}).then(function(resp) {
		res.redirect('/');
	}).catch(function(resp) {
		res.status(500).send(resp);
	});
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/'}),
 	function(req, res, next) {
	res.redirect('/profile');
});

router.get('/profile',
  cel.ensureLoggedIn(),
  function(req, res){
  	//console.log(req);
  	//console.log(req.session.passport.user);
    res.render('index', { title: 'Profile for: ' + req.session.passport.user });
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
const models = require('../models');
var cel = require('connect-ensure-login');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/login', function(req, res, next) {
	res.redirect('/');
});

router.get('/register', function(req, res, next) {
	res.render('index', {title : 'Register'});
})

router.get('/getUser/:id', cel.ensureLoggedIn(),
	function(req, res, next) {
		var id = req.params.id;
		models.Users.findOne({
			where: {
				id: id
			}
		}).then(function(resp) {
			res.status(200).send(resp);
		})
});

router.get('/getUsers', cel.ensureLoggedIn(), 
	function(req, res, next) {
		models.Users.findAll().then(function(resp) {
			res.status(200).send(resp);
		});
});

router.post('/deleteUser', cel.ensureLoggedIn(),
	function(req, res, next) {
		models.Users.destroy({
			where: {
				id: req.body.id
			}
		}).then(function(resp) {
			res.status(200).send({msg: 'deleted'});
		});
});

router.post('/register', function(req, res, next) {
	//todo: no duplicate usernames
	models.Users.findOne({
		where: {
			username: req.body.username
		}
	}).then(function(resp) {
			if(resp !== null) {
				//duplicate username
				res.status(200).send("Duplicate Username. Try another one.");
				return;
			}
			bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(req.body.password, salt, function(err, hash) {
		      models.Users.create({
						username: req.body.username,
						password: hash,
						accountType: req.body.type === 'true' ? 'ADMIN' : 'CUSTOMER',
						salt: salt
					}).then(function(resp) {
						//todo send email. Ran out of time
						res.redirect('/');
					}).catch(function(resp) {
						res.status(500).send(resp);
					});
		    });
			});
	})
	

	
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

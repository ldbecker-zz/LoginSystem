var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
	res.render('index', {title : 'Register'});
})

router.post('/register', function(req, res, next) {
	console.log(req.body.type);
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

router.post('/login', function(req, res, next) {
	//todo
});

module.exports = router;

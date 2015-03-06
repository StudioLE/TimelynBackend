/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	/**
	 * `UserController.login()`
	 */
	login: function (req, res) {
		var bcrypt = require('bcrypt');

		User.findOneByEmail(req.body.email).done(function (err, user) {
			if (err) res.json({ error: 'DB error' }, 500);

			if (user) {
				bcrypt.compare(req.body.password, user.password, function (err, match) {
					if (err) res.json({ error: 'Server error' }, 500);

					if (match) {
						// password match
						req.session.user = user.id;
						res.json(user);
					} else {
						// invalid password
						if (req.session.user) req.session.user = null;
						res.json({ error: 'Invalid password' }, 400);
					}
				});
			} else {
				res.json({ error: 'User not found' }, 404);
			}
		});

		/*// Search the user model
		User.findOne({
			email: req.body.email,
			password: req.body.password
		}, function(err, user) {
			// If application error
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			}
			// If username and password match
			else if (user) {
			   res.json({
					type: true,
					data: user,
					token: user.token
				}); 
			}
			// Else invalid credentials
			else {
				res.json({
					type: false,
					data: "Incorrect email/password"
				});    
			}
		});*/
	},

	/**
	 * `UserController.logout()`
	 */
	logout: function (req, res) {
		req.session.user = null;
		res.send("Successfully logged out");
	},

	/**
	 * `UserController.signup()`
	 */
	signup: function (req, res) {
		User.findOne({
			email: req.body.email,
			password: req.body.password
		}, function(err, user) {
			// If application error
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			}
			// If username and password match
			else if (user) {
				res.json({
					type: false,
					data: "User already exists!"
				});
			}
			else {
				var userModel = new User();
				userModel.email = req.body.email;
				userModel.password = req.body.password;
				userModel.save(function(err, user) {
					user.token = jwt.sign(user, process.env.JWT_SECRET);
					user.save(function(err, user1) {
						res.json({
							type: true,
							data: user1,
							token: user1.token
						});
					});
				})
			}
		});
	},

	/**
	 * `UserController.test()`
	 */
	test: function (req, res) {
		function ensureAuthorized(req, res, next) {
			var bearerToken;
			var bearerHeader = req.headers["authorization"];
			if (typeof bearerHeader !== 'undefined') {
				var bearer = bearerHeader.split(" ");
				bearerToken = bearer[1];
				req.token = bearerToken;
				next();
			} else {
				res.send(403);
			}
		}

		ensureAuthorized(req, res, function(){
			return 'sdafsdf';
		});
	}
};


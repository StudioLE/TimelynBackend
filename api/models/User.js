/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// User data
		email: {
			type: 'string',
			unique: true,
			required: true
		},
		password: {
			type: 'string',
			required: true,
			minLength: 6
		},
		//token: 'string',

		// Sails associations
		timelines: {
			collection: 'timeline',
			via: 'user'
		},

		// Hash passwords on user creation
		beforeCreate: function (attrs, next) {
			var bcrypt = require('bcrypt');
			
			bcrypt.genSalt(10, function(err, salt) {
				if (err) return next(err);

				bcrypt.hash(attrs.password, salt, function(err, hash) {
					if (err) return next(err);

					attrs.password = hash;
					next();
				});
			});
		}
	}
};
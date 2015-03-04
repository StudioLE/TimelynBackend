/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// User data
		email: 'string',
		password: 'string',

		// Sails associations
		timelines: {
			collection: 'timeline',
			via: 'user'
		}
	}
};


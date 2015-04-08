/**
* Timeline.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// TimelineJS data
		headline: {
			type: 'string',
			required: true
		},
		type: { 
			type: 'string',
			defaultsTo: 'default'
		},
		text: 'text',
		era: {  
			type: 'array',
			defaultsTo: []
		},

		// Sails associations
		user: {
			model: 'user'
		},
		date: {
			collection: 'event',
			via: 'timeline'
		},
		asset: {
			model: 'media'
		}
	}
};


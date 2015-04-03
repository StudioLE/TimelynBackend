/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// TimelineJS data
		startDate: {
			type: 'date',
			required: true,
			date: true
		},
		endDate: {
			type: 'date',
			date: true
		},
		headline: {
			type: 'string',
			required: true
		},
		text: 'text',
		tag: 'string',
		classname: 'string',
		// asset: {
		// 	type: 'json',
		// 	defaultsTo: {
		// 		"media": "",
		// 		"thumbnail": "",
		// 		"credit": "",
		// 		"caption": ""
		// 	}
		// },

		// Sails associations
		user: {
			model: 'user'
		},
		timeline: {
			model: 'timeline'
		},
		asset: {
			collection: 'media',
			via: 'event'
		}
	}
};


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

		// Sails associations
		user: {
			model: 'user'
		},
		timeline: {
			model: 'timeline'
		},
		asset: {
			model: 'media'
		},

		// Lifecycle callbacks
		afterDestroy: function(records, cb) {
			// @todo Destroy associated media when a event is deleted
			sails.log('Event destroyed')
			sails.log(records)
			cb()
		},
		afterUpdate: function(records, cb) {
			// @todo Destroy associated media when event is updated and media changes
			sails.log('Event Updated')
			sails.log(records)
			cb()
		}
	}
};


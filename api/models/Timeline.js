/**
* Timeline.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// TimelineJS data
		headline: 'string',
		type: 'string',
		text: 'text',
		asset: 'json', /*{
			media: 'string',
			credit: 'string',
			caption: 'string'
		},*/

		// Sails associations
		user: {
			model: 'user'
		},
		dates: {
			collection: 'event',
			via: 'timeline'
		}
	}
};


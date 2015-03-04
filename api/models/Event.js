/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// TimelineJS data
		startDate: 'date',
		endDate: 'date',
		headline: 'string',
		text: 'text',
		tag: 'string', // Optional
		classname: 'string', // Optional
		asset: 'json', /*{
			media: 'string',
			thumbnail: 'string',
			credit: 'string',
			caption: 'string',
		},*/

		// Sails associations
		timeline: {
			model: 'timeline'
		}
	}
};


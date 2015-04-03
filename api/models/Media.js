/**
* Media.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // Asset attributes
    media: {
      type: 'string',
      required: true
    },
    thumbnail: 'string',
    credit: 'string',
    caption: 'string',

    // Sails associations
    user: {
      model: 'user'
    },
    timeline: {
      model: 'timeline'
    },
    event: {
      model: 'event'
    }
  }
};


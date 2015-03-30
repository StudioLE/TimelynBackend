/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
    
    username: {
      type: 'string',
      required: true,
      alphanumericdashed: true
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      email: true
    }
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};

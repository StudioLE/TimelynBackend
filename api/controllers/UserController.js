/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
  
  /**
   * Current user getter
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Object} user
   */
  current: function(req, res) {
    return res.ok(req.session.user)
  },

  /**
   * Register new user
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Object} jwt
   */
  register: function(req, res) {
    var data = req.params

    sails.models['user'].create(data, function(err, user) {
      if(err) {
        console.log(err)
        return false
      }
      waterlock.engine.attachAuthToUser({
        email: data.email,
        password: data.password
      }, user, function(err, user) {
        console.log('Added user ' + user.name)
        // Now return JWT
      })
    })
  }

});

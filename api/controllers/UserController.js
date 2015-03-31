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
    var data = req.body

    sails.models['user'].create(data, function(err, user) {
      if(err) {
        return res.badRequest(err)
      }
      waterlock.engine.attachAuthToUser({
        email: data.email,
        password: data.password
      }, user, function(err, user) {
        sails.log('Added user ' + user.name)
        // waterlock loginSuccess will log the user in then apply the 
        // post login event defined in config/waterlock.js 
        waterlock.cycle.loginSuccess(req, res, user)
      })
    })
  }

});

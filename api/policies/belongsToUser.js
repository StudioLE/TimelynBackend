/**
 * belongsToUser
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // Add access_token to criteria blacklist
  // Not necessary if overriding where
  // @todo add blacklist to hasJSON
  // https://github.com/balderdashy/sails/blob/master/lib/hooks/blueprints/actionUtil.js
  // parseCriteria: function ( req )
  // req.options.criteria.blacklist =  ['limit', 'skip', 'sort', 'populate', 'access_token']

  if(req.session.user.id) {
    // Add user id as a where parameter
    // Only match rows with the user id
    req.query.where = {
      user: req.session.user.id
    }
    // Proceed to the next policy, or if this is the last policy, the controller
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};

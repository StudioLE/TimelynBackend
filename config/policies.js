/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // Deny all by default
  '*': false,

  AuthController: {
    'login': true
  },

  EventController: {
    '*': false,
    // Only loggedIn may create
    'create': ['hasJWT'],
    // Only owner may findOne/update/destroy
    'findOne': ['hasJWT', 'belongsToUser'],
    'update': ['hasJWT', 'belongsToUser'],
    'destroy': ['hasJWT', 'belongsToUser']
  },
  
  TimelineController: {
    '*': false,
    // Anyone can find individual
    'findOne': true,
    // Only loggedIn may create
    'create': ['hasJWT'],
    // Only owner may find-all/update/destroy
    'find': ['hasJWT', 'belongsToUser'],
    'update': ['hasJWT', 'belongsToUser'],
    'destroy': ['hasJWT', 'belongsToUser']
  },

  TestController: {
    // '*': ['isLoggedIn', 'belongsToUser'],
    // 'find': true,
    // 'findOne': true,
    // 'create': true,
    // 'update': true,
    // 'destroy': true
    restricted: ['sessionAuth'],
    open: true,
    jwt: ['hasJWT']
  },

  UserController: {
    '*': false,
    // Anyone can register
    register: true,
    // Only loggedIn may fetch themselves
    current: ['hasJWT']
  }
  
};

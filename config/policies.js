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

	// '*': true,

	/***************************************************************************
	*                                                                          *
	* Here's an example of mapping some policies to run before a controller    *
	* and its actions                                                          *
	*                                                                          *
	***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }

	

	'*': false, //['passport', 'isLoggedIn'],

	AuthController: {
		'*': ['passport']
	},
	
	DashboardController: {
		// Must be loggedIn to view dashboard
		'*': ['passport']
	},
	
	TimelineController: {
		// Blacklist
		'*': ['passport'],
		// Anyone can find individual
		// 'findOne': ['passport'],
		// Only loggedIn may create
		// 'create': ['passport', 'isLoggedIn'],
		// Only owner may update/destroy
		// 'update': ['passport', 'isLoggedIn', 'belongsToUser'],
		// 'destroy': ['passport', 'isLoggedIn', 'belongsToUser']
	},

	EventController: {
		// Blacklist
		'*': ['passport'],
		// Only loggedIn may create
		//'create': ['passport', 'isLoggedIn'],
		// Only owner may findOne/update/destroy
		//'findOne': ['passport', 'isLoggedIn', 'belongsToUser'],
		//'update': ['passport', 'isLoggedIn', 'belongsToUser'],
		//'destroy': ['passport', 'isLoggedIn', 'belongsToUser']
	},

	TestController: {
		'*': ['passport', 'isLoggedIn', 'belongsToUser'],
		'find': true,
		'findOne': true,
		'create': true,
		'update': true,
		'destroy': true
	}
};

/**
 * LeController
 *
 * @description :: Server-side logic for managing les
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
    * Dashboard index
    *
    * @param {Object} req
    * @param {Object} res
    */
    index: function (req, res) {

        // If the use is logged in use that data
        if(req.user) {
            user = req.user
            user.role = 'user'
        }
        // If not logged in apply guest
        else {
            user = {
                id: null,
                email: null,
                username: 'guest',
                role: null
            }
        }

        // Log the user
        sails.log('User:');
        sails.log(user);
        
        // Render a view
        sails.log(res.view('dashboard', {
            user: user
        }))
    }
};


/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For more information on views and layouts, check out:
 * http://sailsjs.org/#/documentation/concepts/Views
 */

module.exports.auth = {

  /****************************************************************************
  *                                                                           *
  * Auth check                                                                *
  *                                                                           *
  ****************************************************************************/

  // Check if a user is logged in
  isLoggedIn: function(req, res) {
    console.log(req.user)
    if (req.user) {
      res.status(200).send({
        status: 'user is logged in',
        user: {
          username: req.user.username,
          email: req.user.email,
          id: req.user.id
        }
      })
    }
    else {
      res.status(401).send({
        error: 'user not logged in',
        user: false
      })
    }
  },

  /****************************************************************************
  *                                                                           *
  * Auth success responses                                                    *
  *                                                                           *
  ****************************************************************************/

  // Redirect to route after login or logout
  afterLogout: function(req, res) {
    res.status(200).send({
      success: 'logout successful'
    })
  },
  
  afterLogin: function(req, res) {
    // res.redirect('/dashboard')
    res.status(200).send({
      success: 'login successful',
      user: {
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      }
    })
  },

  /****************************************************************************
  *                                                                           *
  * Auth error responses                                                      *
  *                                                                           *
  * If an error was thrown, redirect the user to the
  * login, register or disconnect action initiator view.
  * These views should take care of rendering the error messages.
  *                                                                           *
  ****************************************************************************/
  // 
  loginError: function(req, res) {
    // res.redirect('/login')
    res.status(401).send({
      error: 'login failed'
    })
  },

  registerError: function(req, res) {
    // res.redirect('/register')
    res.status(401).send({
      error: 'registration failed'
    })
  },

  disconnectError: function(req, res) {
    // res.redirect('back')
    res.status(401).send({
      error: 'disconnect error'
    })
  }

};
/**
 * TestController
 *
 * @description :: Server-side logic for managing test
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  restricted: function(req, res){
    return res.ok("If You can see this you are authenticated");
  },
  
  open: function(req, res){
    return res.ok("This is open to all!!!");
  },

  jwt: function(req, res){
    return res.ok("Cor blimey guvnor. This finally works!");
  },

  user: function(req, res){
    user = req.session.user
    console.log(user)

    return res.ok(user)
    // var token = waterlock._utils.allParams(req).access_token
    // console.log(token)
    // waterlock.validator.findUserFromToken(token, function(err, user) {
    //   if(err) console.error(err)

    //   console.log(user)
    //   return res.ok(user)
    // })
  }
  
};


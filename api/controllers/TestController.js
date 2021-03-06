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
  }
  
};


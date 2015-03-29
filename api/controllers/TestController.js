/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  restricted:function(req,res){
    return res.ok("If You can see this you are authenticated");
  },  
  open:function(req,res){
    return res.ok("This is open to all!!!");
  }
  
};


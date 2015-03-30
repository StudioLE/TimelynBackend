var fs = require('fs')
var p = require('path')

/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 * Usage:
 * sails console
 * > sails.controllers.data.insert('timeline')
 * > sails.controllers.data.insert('event')
 * > sails.controllers.data.insert('user')
 */

module.exports = {

  insert: function(model_id) {
    if(_.contains(['timeline', 'event'], model_id)) {
      this.insertToModel(model_id)
    }
    else if(model_id === 'user') {
      this.registerNewUsers()
    }
    else {
      console.error('No sample for model_id ' + model_id)
      return false
    }
    return true
  },

  readSampleJSON: function(model_id) {
    var path = p.join(__dirname, '../data', model_id + '.json')
    var data = fs.readFileSync(path, 'utf8')

    try {
      json = JSON.parse(data)
    } catch(err){
      console.error('Invalid JSON')
      throw err
    }

    return json
  },

  insertToModel: function(model_id) {
    var model = sails.models[model_id]
    var data = this.readSampleJSON(model_id)

    model.create(data, function(err, items) {
      if(err) throw err
      console.log('Added ' + items.length + ' items to ' + model_id)
    })
  },

  registerNewUsers: function() {
    var users = this.readSampleJSON('user')

    _.each(users, function(data) {
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
        })
      })
    })
  }

}

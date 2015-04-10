/**
 * LogController
 *
 * @description :: Server-side logic for fetching and analysing embed logs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 * sails console
 * > sails.controllers.log.count('/path/to/object')
 * > sails.controllers.log.fetch('04-07-2015')
 */

module.exports = {

  /**
   * Count GET requests for path
   *
   * @param {String|Object} path Either a path as a string '/sarah/1' or object { startsWith: '/sarah' }
   * @return void
   */
  count: function(path) {
    EmbedLog.count({
      'cs-method': 'GET',
      'cs-uri-stem': path
    }).exec(function(err, result) {
      if(err) throw err
      sails.log(result)
    })
  },

	fetch: function(date) {
    var params = {
      date: date || '2015-04'
    }

    var logConfig = sails.config.connections.s3Logs

    FetchedEmbedLog.find({
      'date': { startsWith: params.date }
    }).exec(function(err, exclude) {
      if(err) throw err

      // Convert the object to array of paths
      params.exclude = _.pluck(exclude, 'path')

      var watchkeep = require('watchkeep')(sails.config.connections.s3, logConfig, sails.log)

      watchkeep.run(params, function(err, results, paths) {
        if(err) throw err

        // Format paths for insertion
        paths = _.map(paths, function(path) {
          return {
            // Removing the bucket prefix from the path will give us
            // YYYY-MM-DD-HH as the next 13 characters
            date: path.substr(logConfig.prefix.length, 13),
            path: path
          }
        })
        // Record which logs we have fetched
        // so they can be excluded from future fetches
        FetchedEmbedLog.create(paths, sails.error).exec(function(err, created) {
          if(err && err.code === 'E_VALIDATION') throw err
          if(err) throw err
          // We store the records first because if path is
          // not unique then we have fetched these logs before
          // so we want to reject them.

          // Now store the logs
          EmbedLog.create(results).exec(function(err, created) {
            if(err) throw err
            sails.log.debug('%d logs collected from %d files', results.length, paths.length)
          })
        })
      })
    })
  }
};

var fs = require('fs')
var p = require('path')
var s3 = require('s3')

/**
 * PublishController
 *
 * @description :: Server-side logic to publish timeline embed files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 * Usage:
 * sails console
 * > sails.controllers.publish.execute(timelineId)
 */

module.exports = {

  user: {},
  timeline: {},
  file: {},

  /**
   * Get timeline
   *
   * @param {Integer} timeline id
   * @param {Function} callback
   * @return void
   */
  getTimeline: function(id, callback) {
    var Publish = this
    var model = sails.models.timeline
    var format = sails.controllers.timeline.formatV2

    model.findOne(id)
      .populate('user')
      .populate('date')
      .populate('asset')
      .exec(function(err, timeline) {
        if(err) callback(err)
        Publish.user = timeline.user
        delete timeline.user
        Publish.timeline = format(timeline)
        callback(null, Publish.timeline)
      })
  },

  /**
   * Get timeline
   *
   * @param {Integer} timeline id
   * @param {Function} callback
   * @return void
   */
  render: function(partial, locals, callback) {
    var ejs = sails.hooks.http.app

    ejs.render('timeline/timeline-' + partial, locals, function(err, html) {
      if(err) callback(err)
      callback(null, html)
    })
  },

  /**
   * Write timeline embed file locally
   *
   * @param {String} html
   * @param {Function} callback
   * @return void
   */
  write: function(html, callback) {
    var Publish = this

    // @todo Write directly to S3. We don't need a local version
    this.file.dir = p.join(__dirname, '../../../published', this.user.username)
    this.file.name = this.timeline.id.toString()
    this.file.path = p.join(this.file.dir, this.file.name)
    this.file.key = p.join(this.user.username, this.file.name)

    fs.mkdir(Publish.file.dir, function(err) {
      if(err && err.code !== 'EEXIST') callback(err)
      fs.writeFile(Publish.file.path, html, function(err) {
        if(err) callback(err)
        sails.log.verbose('Saved embed file', Publish.file.key)
        callback(null, html)
      })
    })
  },

  /**
   * Write timeline embed file to S3
   *
   * @param {Function} callback
   * @return void
   */
  upload: function(callback) {
    var Publish = this

    var client = s3.createClient({
      s3Options: {
        accessKeyId: sails.config.connections.s3.key,
        secretAccessKey: sails.config.connections.s3.secret
      }
    })

    var uploader = client.uploadFile({
      localFile: this.file.path,
      s3Params: {
        Bucket: sails.config.connections.s3.bucket,
        Key: p.join('embed', this.file.key),
        ContentType: 'text/html'
      },
    }).on('error', function(err) {
      sails.log.error('Unable to upload to s3:', err.stack)
    }).on('progress', function() {
      // sails.log.verbose('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
    }).on('end', function() {
      sails.log.verbose('Published embed file', Publish.file.key)
      callback(null, Publish.file.key)
    })
  },

  /**
   * Update publish info
   *
   * @param {String} s3 path
   * @param {Function} callback
   * @return void
   */
  record: function(path, callback) {
    var Publish = this

    // sails.models.published.create({
    //   date: new Date(),
    //   path: path,
    //   timeline: this.timeline.id
    // }).exec(function(err, published) {
    //     if(err) callback(err)
    //     callback(null, published)
    //   })
    sails.models.timeline.update(this.timeline.id, {
      published: {
        date: new Date(),
        path: path
      }
    }).exec(function(err, published) {
        if(err) callback(err)
        callback(null, published)
      })
  },

  /**
   * Publish timeline embed file
   *
   * @param {Integer} timeline id
   * @return {Object} timeline
   */
  execute: function(id, callback) {
    var Publish = this

    async.waterfall([
      function(cb) { // Get timeline
        Publish.getTimeline(id || 1, function(err, timeline) {
          if(err) cb(err)
          cb(null)
        })
      },
      function(cb) { // Render timeline-embed.ejs
        Publish.render('embed', { timeline: Publish.timeline }, function(err, html) {
          if(err) cb(err)
          cb(null, html)
        })
      },
      function(html, cb) { // Render timeline-layout.ejs
        Publish.render('layout', { body: html }, function(err, html) {
          if(err) cb(err)
          cb(null, html)
        })
      },
      function(html, cb) { // Save file locally
        Publish.write(html, function(err, data) {
          if(err) cb(err)
          cb(null, data)
        })
      },
      function(html, cb) { // Upload to s3
        Publish.upload(function(err, path) {
          if(err) cb(err)
          cb(null, path)
        })
      },
      function(path, cb) { // Create Published record
        Publish.record(path, function(err, published) {
          if(err) cb(err)
          cb(null, published)
        })
      }
    ], function(err, result) { // Complete
      if(err) {
        throw err
      }
      else {
        sails.log('Published timeline', Publish.file.key)
        if(callback) callback(null, result)
      }
    })
  }
}

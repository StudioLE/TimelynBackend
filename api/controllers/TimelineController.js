/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Publish timeline
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Object} res
   */
  publish: function(req, res) {
    var self = this
    var Publish = sails.controllers.publish

    if( ! _.isFinite(req.param('id'))) {
      return res.forbidden('You do not have permission to do that')
    }

    console.log(req.param('id'), req.session.user.id)

    Timeline.findOne({
      id: req.param('id'),
      user: req.session.user.id
    })
    .exec(function(err, timeline) {
      if(err) throw err
      if( ! timeline) return res.notFound()

      Publish.execute(req.param('id'), function(err, key) {
        if(err) throw err
        return res.json({
          id: timeline.id,
          headline: timeline.headline,
          status: 'success',
          path: key 
        })
      })
    })
  },

  /**
   * JSON Response
   *
   * Get timeline, format and return
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Object} res
   */
  json: function(req, res) {
    var self = this

    if( ! _.isFinite(req.param('id'))) {
      return res.forbidden('You do not have permission to do that')
    }

    Timeline.findOne({
      id: req.params.id,
      user: req.session.user.id
    })
      .populate('date')
      .populate('asset')
      .exec(function(err, timeline) {
        if(err) throw err
        if( ! timeline) return res.notFound()

        // Array of event media ids to fetch
        event_media = _.pluck(timeline.date, 'asset')
        // @todo Check what happens if asset = null

        Media.find({id: event_media}).exec(function(err, media) {
          if(err) throw err
          if( ! media) return res.serverError()

          // Index media by id
          media = _.indexBy(media, 'id')

          // Get a plain object version
          timeline = timeline.toObject()

          // Populate timeline.date[n]asset with it's media object
          timeline.date = _.map(timeline.date, function(event) {
            // Take the opportunity to prepend embedUrl
            event.asset = self.embedUrl(media[event.asset])
            return event
          })

          return res.json(self.formatV2(timeline))

        })
      })
  },

  /**
   * Format for Timeline JS v2
   *
   * @param {Object} timeline
   * @return {Object} timeline v2
   */
  formatV2: function(timeline) {
    return {
      id: timeline.id,
      headline: timeline.headline,
      text: timeline.text,
      type: timeline.type,
      asset: this.embedUrl(timeline.asset),
      date: timeline.date,
      era: timeline.era
    }
  },

  /**
   * Format for TimelineJS v3
   *
   * @param {Object} timeline
   * @return {Object} timeline v3
   */
  formatV3: function(timeline) {
    // The data file should be in JSON format with the following structure
    // via https://github.com/NUKnightLab/TimelineJS3#data-file

    return {
      "title": {
        "media": {
          "caption":  "",
          "credit":   "",
          "url":      "url_to_your_media.jpg",
          "thumb":    "url_to_your_media.jpg"
        },
        "text": {
          "headline": "Headline Goes Here",
          "text":     "Your slide text goes here."
        }
      },
      "events": [{
        "start_date": {
          "year":         "1900",
          "month":        "01",
          "day":          "05",
          "hour":         "",
          "minute":       "",
          "second":       "",
          "millisecond":  "",
          "format":       ""
        },
        "end_date": {
          "year":         "1900",
          "month":        "06",
          "day":          "07",
          "hour":         "",
          "minute":       "",
          "second":       "",
          "millisecond":  "",
          "format":       ""
        },
        "media": {
          "caption":  "",
          "credit":   "",
          "url":      "url_to_your_media.jpg",
          "thumb":    "url_to_your_media.jpg"
        },
        "text": {
          "headline": "Headline Goes Here",
          "text":     "Your slide text goes here."
        }
      }]
    }
  },

  /**
   * Prepend embed url to upload keys
   *
   * @param {Object} asset
   * @return {Object} asset
   */
  embedUrl: function(asset) {
    if(asset && asset.type == 'upload') {
      // @todo Better method of extracting embed url from upload key
      asset.media = 'http://embed.timelyn.io' + asset.media.substr(6)
    }
    return asset
  }

};

/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

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
        return res.json(self.formatV2(timeline))
      })
  },

  /**
   * Format timeline v2
   *
   * Format a timeline for use with Timeline JS v2
   *
   * @param {Object} timeline
   * @return {Object} timeline v2
   */
  formatV2: function(timeline) {
    var asset = timeline.asset[0]
    if(asset && asset.type == 'upload') {
      // @todo Better method of extracting embed url from upload key
      asset.media = 'http://embed.timelyn.io' + asset.media.substr(6)
    }

    return {
      id: timeline.id,
      headline: timeline.headline,
      text: timeline.text,
      type: timeline.type,
      asset: asset,
      date: timeline.date,
      era: timeline.era
    }
  },

  /**
   * Format timeline v3
   *
   * Format a timeline for use with Timeline JS v3
   *
   * @param {Object} timeline
   * @return {Object} timeline v3
   */
  formatV3: function(timeline) {
    return false
  }

};

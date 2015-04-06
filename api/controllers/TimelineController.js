/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  json: function(req, res) {

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
        var asset = timeline.asset[0]
        if(asset && asset.type == 'upload') {
          // @todo Better method of extracting embed url from upload key
          asset.media = 'http://embed.timelyn.io' + asset.media.substr(6)
        }
        return res.json({
          id: timeline.id,
          headline: timeline.headline,
          text: timeline.text,
          type: timeline.type,
          asset: asset,
          date: timeline.date,
          era: timeline.era
        })
      })
  }
	
};


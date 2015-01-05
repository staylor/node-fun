var _ = require('underscore'),
	ApiMixin = require( '../app/api-mixin.js' ),
	app_id = 'scott_node_test',
	baseUri = 'http://api.bandsintown.com',
	BandsInTown;

BandsInTown = function () {
	var api = {
		getArtistEvents: function (artist, res) {
			var requestUri = this.format(
				'{0}/artists/{1}/events.json?app_id={2}',
				baseUri,
				encodeURIComponent(artist),
				encodeURIComponent(app_id)
			);

			this.sendJson( requestUri, res );
		}
	};

	return _.extend( {}, ApiMixin, api );
};

module.exports = BandsInTown;
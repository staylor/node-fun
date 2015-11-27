var Songkick,
	_ = require( 'underscore' ),
	Show = require( './show' );

Songkick = Show.extend({
	artistNames: function () {
		return _.pluck( this.get( 'artists' ), 'displayName' ).shift();
	},

	parse: function ( data ) {
		return Songkick.parseData( data );
	}
}, {
	/**
	 * `parse` only gets called for network requests internally, use this
	 * method statically to parse arbitrary data
	 *
	 * @param {Object} data
	 * @returns {Object}
	 */
	parseData: function ( data ) {
		var response = {},
			venueParts = data.location.city ? data.location.city.split( ', ' ) : [];

		response.datetime = data.start.datetime || data.start.date;
		response.artists = _.pluck( data.performance, 'artist' );

		venueParts.pop();

		response.venue = {
			name: data.venue.displayName,
			region: venueParts.pop(),
			city: venueParts.join( ', ' )
		};

		if ( data.spotify ) {
			response.spotify = data.spotify;
		}

		return response;
	}
} );

module.exports = Songkick;

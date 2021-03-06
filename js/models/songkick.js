var Songkick,
	_ = require( 'underscore' ),
	Show = require( './show' );

Songkick = Show.extend({
	mapUri: function () {
		if ( ! this.get( 'venue' ).lat ) {
			return;
		}

		var v = this.get( 'venue' );

		return [
			'comgooglemaps://?',
			'center=' + v.lat + ',' + v.lng,
			'&zoom=12',
			'&q=' + encodeURIComponent( v.displayName )
		].join( '' );
	},

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

		response.venue = _.defaults( {
			name: data.venue.displayName,
			region: venueParts.pop(),
			city: venueParts.join( ', ' )
		}, data.venue );

		if ( data.spotify ) {
			response.spotify = data.spotify;
		}

		return response;
	}
} );

module.exports = Songkick;

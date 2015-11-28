var BandsInTown,
	Show = require( './show' );

BandsInTown = Show.extend({
	mapUri: function () {
		if ( ! this.get( 'venue' ).latitude ) {
			return;
		}

		var v = this.get( 'venue' );

		return [
			'comgooglemaps://?',
			'center=' + v.latitude + ',' + v.longitude,
			'&zoom=12',
			'&q=' + encodeURIComponent( v.name )
		].join( '' );
	},

	parse: function ( data ) {
		return BandsInTown.parseData( data );
	}
}, {
	parseData: function ( data ) {
		var response = data;

		if ( ! data.venue.region ||
			data.venue.region.length < 4 ||
			data.venue.region === data.venue.city
		) {
			response.venue.region = response.venue.country;
		}

		return response;
	}
});

module.exports = BandsInTown;

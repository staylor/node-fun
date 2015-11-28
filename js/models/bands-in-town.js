var BandsInTown,
	Show = require( './show' );

BandsInTown = Show.extend({
	parse: function ( data ) {
		return BandsInTown.parseData( data );
	}
}, {
	parseData: function ( data ) {
		var response = data;

		if ( ! data.venue.region || data.venue.region.length < 4 ) {
			response.venue.region = response.venue.country;
		}

		return response;
	}
});

module.exports = BandsInTown;

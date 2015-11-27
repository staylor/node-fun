var BandsInTown,
	Show = require( './show' );

BandsInTown = Show.extend({
	parse: function ( data ) {
		return BandsInTown.parseData( data );
	}
}, {
	parseData: function ( data ) {
		var response = data;

		if ( ! data.venue.region ) {
			response.venue.region = response.venue.country;
		}

		return response;
	}
});

module.exports = BandsInTown;

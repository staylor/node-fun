var BandsInTown,
	_ = require( 'underscore' ),
	dateParse = require( '../app/date-parse' ),
	Show = require( './show' );

BandsInTown = Show.extend({
	parse: function ( data ) {
		var timestamp = dateParse( data.datetime ), date;
		date = new Date( timestamp );
		data.datetime = date.toLocaleString();
		return data;
	}
});

module.exports = BandsInTown;
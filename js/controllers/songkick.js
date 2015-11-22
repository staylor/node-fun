var _ = require( 'underscore' ),
	Songkick = require( '../providers/songkick' ),
	SongkickModel = require( '../models/songkick' ),
	SongkickCollection = require( '../collections/songkick' );

module.exports = function ( req, res ) {
	var s = new Songkick(), metro, metroName, locations;

	if ( req.query.metro ) {
		metro = parseInt( req.query.metro, 10 );
	} else {
		metro = parseInt( Songkick.METRO.NYC.id, 10 );
	}

	metroName = Songkick.Locations[ metro ];
	locations = _.map( Songkick.METRO, function ( value ) {
		value.selected = parseInt( value.id, 10 ) === metro;
		return value;
	} );

	s.getMetroEvents( metro ).then( function ( shows ) {
		var SongkickShows,
			parsed;

		parsed = shows.map( function ( show ) {
			return SongkickModel.parseData( show );
		} );

		SongkickShows = new SongkickCollection( parsed );

		res.locals = {
			locations: locations,
			metroName: metroName,
			shows: SongkickShows.models
		};
		res.render( 'index', {
			partials: {
				show: 'show'
			}
		} );
	}, function ( err ) {
		console.error( err.stack );
		res.status( 500 ).send( 'Something broke!' );
	} );
};

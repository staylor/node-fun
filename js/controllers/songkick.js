var Songkick = require( '../providers/songkick' ),
	SongkickModel = require( '../models/songkick' ),
	SongickCollection = require( '../collections/songkick' );

module.exports = function ( req, res ) {
	var s = new Songkick();

	s.getMetroEvents( Songkick.NYC_METRO ).then( function ( shows ) {
		var SongkickShows,
			parsed;

		parsed = shows.map( function ( show ) {
			return SongkickModel.parseData( show );
		} );

		SongkickShows = new SongickCollection( parsed );

		res.locals = {
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

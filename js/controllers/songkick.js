var _ = require( 'underscore' ),
	Songkick = require( '../providers/songkick' ),
	SongkickModel = require( '../models/songkick' ),
	SongickCollection = require( '../collections/songkick' );

module.exports = function ( req, res ) {
	var s = new Songkick(), metro, metroName, locations;

	if ( req.query.metro ) {
		metro = req.query.metro;
	} else {
		metro = Songkick.METRO.NYC.id;
	}

	metroName = Songkick.Locations[ metro ];
	locations = _.map( Songkick.Locations, function ( value, id ) {
		return {
			id: id,
			name: value,
			selected: id === metro
		};
	} );

	s.getMetroEvents( metro ).then( function ( shows ) {
		var SongkickShows,
			parsed;

		parsed = shows.map( function ( show ) {
			return SongkickModel.parseData( show );
		} );

		SongkickShows = new SongickCollection( parsed );

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

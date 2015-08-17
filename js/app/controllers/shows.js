var BandsInTown = require( '../bands-in-town' ),
	Songkick = require( '../songkick' ),
	ShowsController;

ShowsController = function ( req, res ) {
	var api;

	if ( req.query.artist ) {
		api = new BandsInTown();
		api.getArtistEvents( req.query.artist, res );
	} else if ( req.query.metro ) {
		api = new Songkick();
		api.getMetroEvents( req.query.metro, res );
	}
};

module.exports = ShowsController;
var BandsInTown = require( '../bands-in-town' ),
	ShowsController;

ShowsController = function ( req, res ) {
	var artist = req.query.artist, api;
	
	api = new BandsInTown();
	api.getArtistEvents( artist, res );
};

module.exports = ShowsController;
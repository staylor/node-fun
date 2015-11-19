var BandsInTown = require( '../bands-in-town' ),
	Songkick = require( '../songkick' ),
	ShowsController,
	api;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */
ShowsController = function ( req, res ) {
	var deferred;

	if ( req.query.artist ) {
		deferred = BandsInTown.getArtistEvents( req.query.artist );
	} else if ( req.query.metro ) {
		deferred = Songkick.getMetroEvents( req.query.metro );
	}

	return deferred.then( function ( data ) {
		res.json( data );
	} );
};

module.exports = ShowsController;
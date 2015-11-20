var BandsInTown = require( '../providers/bands-in-town' ),
	Songkick = require( '../providers/songkick' ),
	ShowsController;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */
ShowsController = function ( req, res ) {
	var deferred, api;

	if ( req.query.artist ) {
		api = new BandsInTown();
		deferred = api.getArtistEvents( req.query.artist );
	} else if ( req.query.metro ) {
		api = new Songkick();
		deferred = api.getMetroEvents( req.query.metro );
	} else {
		return res.json( {} );
	}

	return deferred.then( function ( data ) {
		res.json( data );
	} );
};

module.exports = ShowsController;
var BandsInTown = require( '../providers/bands-in-town' ),
	Songkick = require( '../providers/songkick' ),
	ShowsController;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */
ShowsController = function ( req, res ) {
	var deferred, api, locationCookie;

	if ( req.query.artist ) {
		api = new BandsInTown();
		deferred = api.getArtistEvents( req.query.artist );
	} else if ( req.query.location ) {
		
		if ( ! req.cookies.hft_location ) {
			res.cookie( 'hft_location', req.query.location );
		}

		api = new Songkick();
		deferred = api.getLocationEvents( req.query.location );
	} else {
		return res.json( {} );
	}

	return deferred.then( function ( data ) {
		res.json( data );
	} );
};

module.exports = ShowsController;
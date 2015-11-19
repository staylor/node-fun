
var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	request = require( 'request' ),
	redis = require( './redis' ),
	ApiMixin;

ApiMixin = function () {
	this.client = request.defaults({
		baseUrl: this.baseUri
	});
};

ApiMixin.prototype = {
	cacheGroup: 'v1',

	promise: function () {
		return Q.fcall( function () {
			return {};
		} );
	},

	format: function ( s ) {
		var args = Array.prototype.slice.call( arguments, 1 );

		args = args.map( function ( arg ) {
			return encodeURIComponent( arg );
		} );

		args.unshift( s );

		return util.format.apply( null, args );
	},

	getClient: function () {
		return this.client;
	},

	getCacheKey: function () {
		var key = 'string' === typeof this.requestUri ? this.requestUri : JSON.stringify( this.requestUri );
		return [ key, this.cacheGroup ].join( ':' );
	},

	setUriData: function ( data ) {
		var key = this.getCacheKey();
		redis.set( key, JSON.stringify( data ) );
		redis.expire( key, 5 );
	},

	getUriData: function () {
		var self = this, deferred = Q.defer();

		redis.get( this.getCacheKey(), function ( err, value ) {
			if ( err ) {
				deferred.reject( err );
				return;
			}

			if ( value && 'false' !== String( value ) ) {

				if ( _.isString( value ) ) {
					deferred.resolve( JSON.parse( value ) );
				} else {
					deferred.resolve( value );
				}

				return;
			}

			this.getAsync( this.requestUri ).then( function ( response ) {
				return self.parse( response ).then( function ( data ) {
					self.setUriData( data );

					return deferred.resolve( data );
				} );
			}, function ( reason ) {
				deferred.reject( reason );
			} );
		}.bind( this ) );

		return deferred.promise;
	},

	getAsync: function ( requestUri ) {
		var client = this.getClient();

		return Q.Promise( function ( resolve, reject ) {
			client( requestUri, function ( err, response, body ) {
				var data = body;

				console.log( response.request.uri.href );

				if ( err || response.statusCode >= 400 ) {
					console.log( 'Rejected...', response.body );
					reject( err );
					return;
				}

				if ( 0 === response.headers['content-type'].indexOf( 'application/json' ) ) {
					data = JSON.parse( body );
				}

				resolve( data );
			} );
		} );
	},

	parseRelated: function () {
		_.each( this.waiting, function ( items, key ) {
			_.each( items, function ( item ) {
				if ( ! this.data[ item ] ) {
					return;
				}

				if ( ! this.stack[ key ].related ) {
					this.stack[ key ].related = [];
				}

				this.stack[ key ].related.push( this.data[ item ] );
			}, this );
		}, this );

		return _.values( this.stack );
	}
};

module.exports = ApiMixin;

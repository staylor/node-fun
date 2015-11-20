var redis = require( 'redis' ),
	client = redis.createClient();

client.on( 'error', function (err) {
	console.log( 'Redis Error: ' + err );
} );

client.on( 'connect', function () {
	console.log( 'Redis server listening...' );
} );

module.exports = client;
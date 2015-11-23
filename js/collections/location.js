var SongkickCollection = require( './songkick' ),
	LocationCollection;

LocationCollection = SongkickCollection.extend({
	getCoords: function () {
		var coords = window.highforthis.coords;

		return {
			lat: coords.latitude,
			lng: coords.longitude
		};
	},

	url: function () {
		var coords = this.getCoords();
		return '/data/shows?location=' + encodeURIComponent( coords.lat + ',' + coords.lng );
	}
});

module.exports = LocationCollection;
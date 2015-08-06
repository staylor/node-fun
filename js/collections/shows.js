var Backbone = require('backbone'),
	Shows;

Shows = Backbone.Collection.extend({
	url: function () {
		return '/data/shows?' + encodeURIComponent( this.artist );
	}
});

module.exports = Shows;
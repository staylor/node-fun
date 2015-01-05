var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	App,
	BandsInTownView = require('./bands-in-town.js'),
	FandangoView = require('./fandango.js');

Backbone.$ = $;

App = Backbone.View.extend({
	el: '#app',
	initialize: function () {
		this.bandsInTown = new BandsInTownView();
		this.fandango = new FandangoView();
	},

	render: function () {
		this.$el.append([
			this.bandsInTown.render().el,
			this.fandango.render().el
		]);
		return this;
	}
});

module.exports = App;
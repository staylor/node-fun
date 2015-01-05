var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	BandsInTownView,
	ShowsCollection = require( '../collections/shows.js' ),
	ShowView = require( './show.js' );

Backbone.$ = $;

BandsInTownView = Backbone.View.extend({
	id: 'bands-in-town',

	initialize: function () {
		this.dfd = false;
		this.shows = new ShowsCollection();
		this.listenTo( this.shows, 'request', this.setLoadingTitle );
		this.listenTo( this.shows, 'reset', this.loadShows );
	},

	events: {
		'keyup input' : 'getShows'
	},

	setLoadingTitle: function () {
		this.title.html( 'Loading...' );
	},

	renderShow: function (model) {
		var show = new ShowView({
			model: model
		});
		return show.render().el;
	},

	reset: function () {
		this.title.html('Search');
		this.list.html('');
	},

	loadShows: function () {
		var shows = this.shows.map( this.renderShow, this );
		this.title.html( this.shows.artist );
		this.list.html( shows );
	},

	getShows: _.debounce(function () {
		if ( this.dfd && 'pending' === this.dfd.state() ) {
			return;
		}

		this.shows.artist = this.input.val();
		if ( ! this.shows.artist ) {
			this.reset();
			return;
		}

		this.dfd = this.shows.fetch({ reset: true });
	}, 600),

	render: function () {
		this.$el.html( '<h1>Search</h1><p><input /></p><ul></ul>' );
		this.title = this.$( 'h1' );
		this.input = this.$( 'input' );
		this.list = this.$( 'ul' );

		return this;
	}
});

module.exports = BandsInTownView;
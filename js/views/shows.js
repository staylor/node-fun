var ShowView = require( './show' ),
	ShowsView;

ShowsView = Backbone.View.extend({
	initialize: function () {
		this.views = [];

		this.listenTo( this.collection, 'reset', this.render );
	},

	renderShow: function ( model ) {
		return new ShowView({
			model: model
		}).render();
	},

	render: function () {
		_.invoke( this.views, 'remove' );

		this.views = this.collection.map( this.renderShow );

		this.$el.append( _.pluck( this.views, 'el' ) );

		return this;
	}
});

module.exports = ShowsView;

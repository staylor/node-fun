var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Show;

Backbone.$ = $;

Show = Backbone.View.extend({
	tagName: 'li',
	template: _.template( $( '#tmpl-show-view' ).html() ),

	render: function () {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});

module.exports = Show;
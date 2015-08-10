module.exports = (function() {
    var Hogan = require('hogan.js');
    var templates = {};
    templates['index'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>Hi!</h1>");t.b("\n");t.b("\n" + i);t.b("<p>");t.b("\n" + i);t.b("	<input type=\"text\" id=\"search-field\"/>");t.b("\n" + i);t.b("</p>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\"></ul>");t.b("\n");t.b("\n" + i);if(t.s(t.f("yield-scripts",c,p,1),c,p,0,104,155,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<script src=\"/build/js/compiled.min.js\"></script>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }});
    templates['show'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("image",c,p,1),c,p,0,12,38,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\"/>");t.b("\n" + i);});c.pop();}t.b("<time>");t.b(t.v(t.f("datetime",c,p,0)));t.b("</time>");t.b("\n" + i);t.b("<h4>");t.b(t.v(t.f("artistNames",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("<p><strong>");t.b(t.v(t.d("venue.name",c,p,0)));t.b("</strong>");t.b(t.v(t.d("venue.city",c,p,0)));t.b(", ");t.b(t.v(t.d("venue.region",c,p,0)));t.b("</p>");return t.fl(); },partials: {}, subs: {  }});
    return templates;
})();
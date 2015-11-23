module.exports = (function() {
    var Hogan = require('hogan.js');
    var templates = {};
    templates['everywhere'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<nav>");t.b("\n" + i);t.b("	<a href=\"/\">Search Cities Tonight</a>");t.b("\n" + i);t.b("	<span class=\"sep\">|</span>");t.b("\n" + i);t.b("	<a href=\"/you\">Your Location</a>");t.b("\n" + i);t.b("</nav>");t.b("\n");t.b("\n" + i);t.b("<h2>Search Everywhere by Artist</h2>");t.b("\n");t.b("\n" + i);t.b("<p class=\"everywhere-field\">");t.b("\n" + i);t.b("	<input type=\"text\" id=\"search-field\"/>");t.b("\n" + i);t.b("</p>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\"></ul>");t.b("\n");t.b("\n" + i);if(t.s(t.f("yield-scripts",c,p,1),c,p,0,268,321,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<script src=\"/build/js/everywhere.min.js\"></script>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }});
    templates['index'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<nav>");t.b("\n" + i);t.b("	<a href=\"/everywhere\">Search Everywhere</a>");t.b("\n" + i);t.b("	<span class=\"sep\">|</span>");t.b("\n" + i);t.b("	<a href=\"/you\">Your Location</a>");t.b("\n" + i);t.b("</nav>");t.b("\n");t.b("\n" + i);t.b("<h2>Shows Today in ");t.b(t.v(t.f("metroName",c,p,0)));t.b("</h2>");t.b("\n");t.b("\n" + i);t.b("<nav class=\"cities\">");if(t.s(t.f("locations",c,p,1),c,p,0,198,328,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("\n" + i);if(t.s(t.f("selected",c,p,1),c,p,0,214,239,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span>");t.b(t.v(t.f("name",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("selected",c,p,1),c,p,1,0,0,"")){t.b("<a href=\"/metro/");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");t.b("\n" + i);};});c.pop();}t.b("</nav>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\">");t.b("\n" + i);if(t.s(t.f("shows",c,p,1),c,p,0,382,406,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("	<li>");t.b(t.rp("<show0",c,p,""));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n");return t.fl(); },partials: {"<show0":{name:"show", partials: {}, subs: {  }}}, subs: {  }});
    templates['location'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<nav>");t.b("\n" + i);t.b("	<a href=\"/\">Search Cities Tonight</a>");t.b("\n" + i);t.b("	<span class=\"sep\">|</span>");t.b("\n" + i);t.b("	<a href=\"/everywhere\">Search Everywhere</a>");t.b("\n" + i);t.b("</nav>");t.b("\n");t.b("\n" + i);t.b("<h2>Shows Near You</h2>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\"></ul>");t.b("\n");t.b("\n" + i);if(t.s(t.f("yield-scripts",c,p,1),c,p,0,191,242,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<script src=\"/build/js/location.min.js\"></script>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }});
    templates['show'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h3>");t.b(t.v(t.d("venue.name",c,p,0)));t.b("</h3>");t.b("\n");t.b("\n" + i);if(t.s(t.f("images",c,p,1),c,p,0,40,107,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"image-link\"><img src=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\"/></a>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("images",c,p,1),c,p,1,0,0,"")){t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"empty-link\"></a>");t.b("\n" + i);};t.b("<time>");t.b(t.v(t.f("dateString",c,p,0)));t.b("</time>");t.b("\n" + i);t.b("<h4>");t.b(t.v(t.f("artistNames",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("<p>");t.b(t.v(t.d("venue.city",c,p,0)));t.b(", ");t.b(t.v(t.d("venue.region",c,p,0)));t.b("</p>");t.b("\n" + i);if(t.s(t.f("spotifyUri",c,p,1),c,p,0,311,376,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<p class=\"spotify\"><a href=\"");t.b(t.t(t.f("spotifyUri",c,p,0)));t.b("\">Spotify</a></p>");t.b("\n" + i);});c.pop();}if(t.s(t.f("popularity",c,p,1),c,p,0,411,461,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"debug\">Pop: ");t.b(t.v(t.f("popularity",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }});
    return templates;
})();
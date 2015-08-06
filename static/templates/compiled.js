/* global Hogan */
var HoganTemplates = (function() {
  
var t = {
  /* jshint ignore:start */
  'index' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>Hi!</h1>");t.b("\n");t.b("\n" + i);t.b("<p>");t.b("\n" + i);t.b("	<input type=\"text\" id=\"search-field\"/>");t.b("\n" + i);t.b("</p>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\"></ul>");t.b("\n");t.b("\n" + i);if(t.s(t.f("yield-scripts",c,p,1),c,p,0,104,266,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<script src=\"/static/lib/hogan-3.0.1.min.js\"></script>");t.b("\n" + i);t.b("<script src=\"/static/templates/compiled.min.js\"></script>");t.b("\n" + i);t.b("<script src=\"/static/js/build.min.js\"></script>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
return {
  'index' : r('index')
};
})();
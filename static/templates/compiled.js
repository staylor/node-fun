/* global Hogan */
var HoganTemplates = (function() {
  
var t = {
  /* jshint ignore:start */
  'index' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>Hi!</h1>");t.b("\n");t.b("\n" + i);t.b("<p>");t.b("\n" + i);t.b("	<input type=\"text\" id=\"search-field\"/>");t.b("\n" + i);t.b("</p>");t.b("\n");t.b("\n" + i);t.b("<ul id=\"shows\"></ul>");return t.fl(); },partials: {}, subs: {  }})
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
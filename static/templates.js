/* global Hogan */
var HoganTemplates = (function() {
  
var t = {
  /* jshint ignore:start */
  'hogan' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"hogan\">");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<script src=\"http://twitter.github.com/hogan.js/builds/3.0.1/hogan-3.0.1.js\"></script>");t.b("\n" + i);t.b("<script src=\"/static/templates.min.js\"></script>");t.b("\n" + i);t.b("<script src=\"/static/build.min.js\"></script>");return t.fl(); },partials: {}, subs: {  }}),
  'index' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<p>Hello ");t.b(t.v(t.f("name",c,p,0)));t.b("!!</p>");return t.fl(); },partials: {}, subs: {  }}),
  'layout' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("\n" + i);t.b("<!DOCTYPE html>");t.b("\n" + i);t.b("<html lang=\"en\">");t.b("\n" + i);t.b("<head>");t.b("\n" + i);t.b("<meta charset=\"utf-8\"/>");t.b("\n" + i);t.b("<title>Fuckin' with Node</title>");t.b("\n" + i);t.b("<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/main.css\"/>");t.b("\n" + i);t.b("</head>");t.b("\n" + i);t.b("<body>");t.b("\n" + i);t.b(t.rp("<content0",c,p,""));t.b("</body>");t.b("\n" + i);t.b("</html>");return t.fl(); },partials: {"<content0":{name:"content", partials: {}, subs: {  }}}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
return {
  'hogan' : r('hogan'),
  'index' : r('index'),
  'layout' : r('layout')
};
})();
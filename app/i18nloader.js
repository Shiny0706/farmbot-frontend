
// This file loads the propper bundle file according to the user's language settings 
// in their browser. 

var lang = (navigator.language || "en_us").slice(0,2);
var url = "/app/" + lang + "-bundle.js";

var fileref = document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", url);
document.getElementsByTagName("head")[0].appendChild(fileref);

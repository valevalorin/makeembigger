(function() {
	var scr = document.createElement("script");
  scr.type="text/javascript";
  scr.src=chrome.extension.getURL("@4x_injected_script.js");
  (document.head || document.body || document.documentElement).appendChild(scr);
})();
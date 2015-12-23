(function() {
	var style = document.createElement("style");
	chrome.storage.sync.get({
	  emoticonSize: '60'
	}, function(items) {
		style.innerHTML = ".remoticon { height:"+items.emoticonSize+"px !important;width:auto; }";
		(document.head || document.body || document.documentElement).appendChild(style);
	});
	var scr = document.createElement("script");
  scr.type="text/javascript";
  scr.src=chrome.extension.getURL("@4x_injected_script.js");
  (document.head || document.body || document.documentElement).appendChild(scr);
})();
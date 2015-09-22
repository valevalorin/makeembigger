// (function() {
	// alert('yo2');
	// window = $(window).height(2880);
	// window.width = 5120;
	// window.devicePixelRatio = 2;
	// chrome.windows.update(-2, {
	// 	width: 2880,
	// 	height: 1800
	// }, function () {console.log("yo");});
// })();
	
(function() {
	console.log('yo');
	var app = angular.module('makeembigger', []).run(function ($interval) {
		console.log("running");
		$interval(function () {
			console.log("checking");
			var emoticons = $('.remoticon');
			for(var i = 0; i < emoticons.length; i++)
			{
				var emoticon = $(emoticons[i]);
				var src = emoticon.attr('src');
				if(src.indexOf('@4x') == -1)
				{
					index = src.lastIndexOf('.');
					var newSrc = src.substr(0, index) + '@4x' + src.substr(index);
					emoticon.attr('src', newSrc);
				}
			}
		}, 1000);
	});
	angular.element(document).ready(function() { angular.bootstrap(document, ["makeembigger"]); });
}());
(function() {
	var ogWindow = window;
	var spoofWindow = angular.extend({}, window);
	spoofWindow.height = 2880;
	spoofWindow.width = 5120;
	spoofWindow.devicePixelRatio = 2;
	window = spoofWindow;
})();
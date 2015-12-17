(function() {
	//Spoof pixel ratio to fetch @4x emoticons from server by default
	window.devicePixelRatio = 4;

	function loadJquery() {
	    var xmlhttp;

	    if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
	           if(xmlhttp.status == 200){
	           		eval(xmlhttp.responseText);
	              initializeResizingTriggers();
	              $(document).ready(function () {
	              	$('body').append($("<div class='makeembigger-shield' style='top:0px;left:0px;width:100%;height:100%;position:fixed;display:none;background-color:transparent;'></div>"));
								});
	           }
	        }
	    }

	    xmlhttp.open("GET", "https://code.jquery.com/jquery-2.1.4.min.js", true);
	    xmlhttp.send();
	}

	function initializeResizingTriggers() {
		var makeembigger_preview_flag = false;
		var makeembigger_position = 0;
		var previewElement = null;

		$(document).mouseup(function (event) {
			if(makeembigger_preview_flag) {
				$('.makeembigger-shield').css('display', 'none');
				event.preventDefault();
				event.stopPropagation();
				event.toElement = $();
				makeembigger_preview_flag = false;
				makeembigger_position = 0;
				document.onselectstart = function (e) {return true;};
				return false;
			}
		});

		$(document).mousemove(function (event) {
			if(makeembigger_preview_flag) {
				var position = event.pageX;
				var newWidth = (previewElement.resizingTarget.width()) + (position - makeembigger_position);
				//console.log(newWidth+" = width: "+(previewElement.resizingTarget.width())+" + (position: "+position+" - makeembigger_position: "+makeembigger_position+")");
				previewElement.resizingTarget.css("max-width", newWidth+"px");
				previewElement.resizingTarget.css("max-height", (300+newWidth)+"px");
				previewElement.resizingTarget.css("width", newWidth+"px");
				makeembigger_position += (position - makeembigger_position);
			}
		});

		$(document).mousedown(function (event) {
			var element = $(event.toElement).parents('.image-preview-wrapper');
			if(element.length > 0) {
				//Initialize resizing
				event.preventDefault();
				makeembigger_preview_flag = true;
				makeembigger_position = event.pageX;

				//Find resizing target
				if(element.find("img").length > 0)
					element.resizingTarget = element.find("img");
				else if (element.find("video").length > 0)
					element.resizingTarget = element.find("video");
				previewElement = element;

				//Stop selecting and default click events
				document.onselectstart = function (e) {return false;}
				$('.makeembigger-shield').css('display', 'block');
			} else /*try to look for a file preview*/ {
				element = $(event.toElement).parents('.file-preview-wrapper');
				if(element.length > 0) {
					//Initialize resizing
					event.preventDefault();
					makeembigger_preview_flag = true;
					makeembigger_position = event.pageX;

					//Find resizing target
					element.resizingTarget = element.find("img");
					previewElement = element;

					//Stop selecting and default click events
					document.onselectstart = function (e) {return false;}
					$('.makeembigger-shield').css('display', 'block');
				}
			}
		});
	}

	loadJquery();
})();
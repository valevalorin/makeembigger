(function() {
	window.devicePixelRatio = 4;

	function loadXMLDoc() {
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
	              setupImageResizing();
	              $(document).mousedown(function (event) {
									setupImageResizing();
								});
	           }
	           else if(xmlhttp.status == 400) {
	              alert('There was an error 400')
	           }
	           else {
	               alert('something else other than 200 was returned: '+xmlhttp.status);
	           }
	        }
	    }

	    xmlhttp.open("GET", "https://code.jquery.com/jquery-2.1.4.min.js", true);
	    xmlhttp.send();
	}

	function setupImageResizing() {
		var makeembigger_preview_flag = false;
		var makeembigger_position = 0;
		var previewElement = null;
		var activeResizer = null;
		var cachedSelect = document.onselectstart;

		$(document).mouseup(function (event) {
			makeembigger_preview_flag = false;
			makeembigger_position = 0;
			document.onselectstart = function (e) {return true;};
		});

		$(document).mousemove(function (event) {
			if(makeembigger_preview_flag) {
				var position = event.pageX;
				var newWidth = activeResizer.position().left + (position - makeembigger_position);
				activeResizer.css("left", newWidth+"px");
				activeResizer.killertree.css("max-width", newWidth+"px");
				activeResizer.killertree.css("max-height", newWidth+"px");
				activeResizer.killertree.css("width", newWidth+"px");
				activeResizer.killertree2.css("max-width", newWidth+"px");
				activeResizer.killertree2.css("max-height", newWidth+"px");
				activeResizer.killertree2.css("width", newWidth+"px");
				makeembigger_position += (position - makeembigger_position);
			}
		});

		$('.image-preview-wrapper').each(function (index, element) {
			element = $(element);
			if(element.find('.makeembigger-resizer').length == 0)
			{
					var resizer = $("<div style='position:absolute;left:"+(element.width()+5)+"px;background-color:red;height:20px;width:20px;border-radius:2px;margin-right:10px;'></div>");
					resizer.killertree = element.find("img");
					resizer.killertree2 = element.find("video");

					resizer.mousedown(function (event) {
						makeembigger_preview_flag = true;
						makeembigger_position = event.pageX;
						activeResizer = resizer;
						previewElement = element;
						document.onselectstart = function (e) {return false;}
					});
					
					var spacer = $("<div class='makeembigger-resizer' style='height:20px;position:relative;'></div>");
					spacer.append(resizer);
					element.prepend(spacer);
			}
		});
		$('.file-preview-wrapper').each(function (index, element) {
			element = $(element);
			if(element.find('.makeembigger-resizer').length == 0)
			{
					var resizer = $("<div style='position:absolute;left:"+(element.width()+5)+"px;background-color:red;height:20px;width:20px;border-radius:2px;margin-right:10px;'></div>");
					resizer.killertree = element.find("img");
					resizer.killertree2 = $();

					resizer.mousedown(function (event) {
						makeembigger_preview_flag = true;
						makeembigger_position = event.pageX;
						activeResizer = resizer;
						previewElement = element;
						document.onselectstart = function (e) {return false;}
					});
					
					var spacer = $("<div class='makeembigger-resizer' style='height:20px;position:relative;'></div>");
					spacer.append(resizer);
					element.prepend(spacer);
			}
		});
	}

	loadXMLDoc();
})();
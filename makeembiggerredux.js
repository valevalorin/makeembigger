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
	           		console.log("got it");
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
		$(document).ready(function () {
			var makeembigger_preview_flag = false;
			var makeembigger_position = 0;

			$('.image-preview-wrapper').each(function (index, element) {
				element = $(element);
				if(element.find('.makeembigger-resizer').length == 0)
				{
						var resizer = $("<div class='makeembigger-resizer' style='width:100%;background-color:red;height:20px;'></div>");
						resizer.killertree = element.find("img");
						resizer.mousedown(function (event) {
							makeembigger_preview_flag = true;
							makeembigger_position = event.pageX;
							console.log("on: x = "+makeembigger_position);
						});
						element.mousemove(function (event) {
							if(makeembigger_preview_flag) {
								var position = event.pageX;
								var newWidth = resizer.killertree.width() + ((position - makeembigger_position) * 4);
								resizer.killertree.css("max-width", newWidth+"px");
								resizer.killertree.css("max-height", newWidth+"px");
								resizer.killertree.css("width", newWidth+"px");
								makeembigger_position = event.pageX;
								console.log("x = "+makeembigger_position);
							}
						});
						$(document).mouseup(function (event) {
							makeembigger_preview_flag = false;
							makeembigger_position = 0;
						});
						element.prepend(resizer);
				}
			}) 
		});
	}

	loadXMLDoc();
})();
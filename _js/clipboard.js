function calcDimensions(e) {
	var naturalHeight = e.target.naturalHeight; //496W * 360H,
	var naturalWidth = e.target.naturalWidth;
	var bigAspect = Math.round((naturalWidth/naturalHeight)*100)/100;
	var smallAspect = (1/bigAspect).toFixed(2);
	var winWidth = $('#baseline').width();
	var winHeight = ($(window).height()) - 60;
	var imageSrc = e.target.src;
	var height, width;

	// console.log("natural height: " + naturalHeight + " natural width: " + naturalWidth);
	// console.log("big aspect: " + bigAspect + " smallAspect: " + smallAspect);
	// console.log("winWidth: " + winWidth + " winHeight: " + winHeight);
	// console.log("bigAspect: " + bigAspect + "smallAspect: " + smallAspect);

	if (naturalWidth > winWidth){
		width = winWidth;
		height = Math.round(width * smallAspect);
		// console.log("too wide");

	} else if (naturalHeight > winHeight){
		height = naturalHeight;
		width = Math.round(height * bigAspect); //or naturalWidth
		// console.log("too tall");

	} else {
		width = naturalWidth;
		height = naturalHeight
		// console.log("just right");
	}

	// var newDiv = $('<div/>', { id:'popup'});
	// var newDiv = $('<div id="popup" style="width: ' + width + 'px; height: ' + height + 'px"></div>');
	var newDiv = $('<div id="popup" style="width: ' + $('body').width() + 'px; height: ' + $('body').height() + 'px"></div>');

	$('body').prepend(newDiv);
	// $('#baseline').append(newDiv);

	var popImage = $('<img src= "' + imageSrc + '" style="width: ' + width + 'px; height: ' + height + 'px">');
	$('#popup').append(popImage);

	(function centerPopup() {
		var screenCenter = $('body').width()/2;
		// console.log("screen Center: " + screenCenter);
		var imageCenter = width/2;
		var formula = screenCenter - imageCenter;
		if(isPopup){
			$('#popup img').css({marginLeft: formula })
			// $('div:not(#popup)').css( "background-color", "yellow" );
			// $('body').css( "background-color", "rgba(0, 0, 0, .75)" );

			//place image (-) image center from windowCenter #popup margin-left
			//dk gray backround css with alpha
			// maybe remove popup from div after image centered
			// rezize popup on window resize
		}
	}());
}

========================================================================
calcDimensions: function (e) {
	naturalHeight = e.target.naturalHeight; //496W * 360H,
	naturalWidth = e.target.naturalWidth;
	bigAspect = Math.round((naturalWidth/naturalHeight)*100)/100;
	smallAspect = (1/bigAspect).toFixed(2);
	winWidth = $('#baseline').width();
	winHeight = ($(window).height()) - 60;
	imageSrc = e.target.src;

	// console.log("natural height: " + naturalHeight + " natural width: " + naturalWidth);
	// console.log("big aspect: " + bigAspect + " smallAspect: " + smallAspect);
	// console.log("winWidth: " + winWidth + " winHeight: " + winHeight);
	// console.log("bigAspect: " + bigAspect + "smallAspect: " + smallAspect);

	if (naturalWidth > winWidth){
		width = winWidth;
		height = Math.round(width * smallAspect);
		// console.log("too wide");

	} else if (naturalHeight > winHeight){
		height = naturalHeight;
		width = Math.round(height * bigAspect); //or naturalWidth
		// console.log("too tall");

	} else {
		width = naturalWidth;
		height = naturalHeight
		// console.log("just right");
	}

	// var newDiv = $('<div/>', { id:'popup'});
	// var newDiv = $('<div id="popup" style="width: ' + width + 'px; height: ' + height + 'px"></div>');
	var newDiv = $('<div id="popup" style="width: ' + $('body').width() + 'px; height: ' + $('body').height() + 'px"></div>');

	$('body').prepend(newDiv);
	// $('#baseline').append(newDiv);

	var popImage = $('<img src= "' + imageSrc + '" style="width: ' + width + 'px; height: ' + height + 'px">');
	$('#popup').append(popImage);

	(function centerPopup() {
		var screenCenter = $('body').width()/2;
		// console.log("screen Center: " + screenCenter);
		var imageCenter = width/2;
		var formula = screenCenter - imageCenter;
		if(isPopup){
			$('#popup img').css({marginLeft: formula })
			// $('div:not(#popup)').css( "background-color", "yellow" );
			// $('body').css( "background-color", "rgba(0, 0, 0, .75)" );

			//place image (-) image center from windowCenter #popup margin-left
			//dk gray backround css with alpha
			// maybe remove popup from div after image centered
			// rezize popup on window resize
		}
	}());
}
}

==============================================
(function centerPopup() {
	var screenCenter = $('body').width()/2;
	// console.log("screen Center: " + screenCenter);
	var imageCenter = width/2;
	var formula = screenCenter - imageCenter;
	if(isPopup){
		$('#popup img').css({marginLeft: formula })

		//place image (-) image center from windowCenter #popup margin-left
		//dk gray backround css with alpha
		// maybe remove popup from div after image centered
		// rezize popup on window resize
	}
}());

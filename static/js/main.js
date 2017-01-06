/* global $$ */
/* global $ */
'use strict';

var GenReportLoadingBehaviour = function() {
	var genReportForm = $('#genreport');
	if(genReportForm){
		var genReportButton = $('button', genReportForm);
		genReportForm.addEventListener('submit', function() {
			genReportButton.setAttribute('disabled', 'true');
			$('span', genReportButton).textContent = 'Generating report...';
			$('body').classList.add('wait');
		});
	}
}

var OpenProfileWidgetBehaviour = function() {
	var profileWidget = $('[am-ProfileWidget]');
	if(profileWidget){
		$(".container", profileWidget).addEventListener('click', function(){
			profileWidget.classList.toggle('open');
		});
	}
}

var LoginWithTwitterLoadingBehaviour = function() {
	var loginButtonContainer = $('#loginwithtwitter');
	if(loginButtonContainer){
		var loginButton = $('button', loginButton);
		loginButtonContainer.addEventListener('click', function(){
			loginButton.setAttribute('disabled', true);
			loginButton.innerHTML = '<i class="fa fa-spinner fa-spin fa-lg">';
		});
	}
}

function preloadImage(image) {
    var imageUrl = image.getAttribute('preload-src');
    var imageObject = document.createElement('img');
    imageObject.onerror = function(){
        image.setAttribute('src', '/static/img/image_load_error.png');
    }
    imageObject.onload = function(){
        image.setAttribute('src', imageUrl);
    }
    imageObject.src = imageUrl;
}

var PreloadImagesBehaviour = function() {
    var images = $$('img[preload-src]');
    setTimeout(function(){
        images.forEach(preloadImage);
    }, 1);
}

GenReportLoadingBehaviour();
OpenProfileWidgetBehaviour();
LoginWithTwitterLoadingBehaviour();
PreloadImagesBehaviour();
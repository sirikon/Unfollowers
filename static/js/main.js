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

GenReportLoadingBehaviour();
OpenProfileWidgetBehaviour();
LoginWithTwitterLoadingBehaviour();

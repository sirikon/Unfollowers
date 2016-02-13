/* global $ */
'use strict';

var GenReportLoadingBehaviour = function(){
	var genReportForm = $('#genreport');
	if(genReportForm){
		var genReportButton = $('button', genReportForm);
		genReportForm.addEventListener('submit', function() {
            // track event to Piwik
            _paq.push(['trackEvent', 'Interactions', 'Generate Report']);
			genReportButton.setAttribute('disabled', 'true');
			$('span', genReportButton).textContent = 'Generating report...';
			$('body').classList.add('wait');
		});
	}
}

var OpenProfileWidgetBehaviour = function(){
	var profileWidget = $('[am-ProfileWidget]');
	if(profileWidget){
		$(".container", profileWidget).addEventListener('click', function(){
			profileWidget.classList.toggle('open');
		});
	}
}

var LoginWithTwitterLoadingBehaviour = function(){
	var loginButtonContainer = $('#loginwithtwitter');
	if(loginButtonContainer){
		var loginButton = $('button', loginButton);
		loginButtonContainer.addEventListener('click', function(){
            // track event to Piwik
            _paq.push(['trackEvent', 'Interactions', 'Login with Twitter']);
			loginButton.setAttribute('disabled', true);
			loginButton.innerHTML = '<i class="fa fa-spinner fa-spin fa-lg">';
		});
	}
}

GenReportLoadingBehaviour();
OpenProfileWidgetBehaviour();
LoginWithTwitterLoadingBehaviour();

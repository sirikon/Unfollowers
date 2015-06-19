'use strict';

var GenReportLoadingBehaviour = function(){
	var element = document.getElementById("genreport");
	if(element){
		var button = element.querySelector('button');
		element.addEventListener('submit', function(){
			button.setAttribute('disabled', 'true');
			button.querySelector("span").textContent = "Generating report...";
			document.body.className = "wait";
		});
	}
}

var OpenProfileWidgetBehaviour = function(){
	var element = document.querySelector("[am-ProfileWidget]");
	if(element){
		var container = document.querySelector("[am-ProfileWidget] .container");
		container.addEventListener('click', function(){
			if(element.className.indexOf("open") >= 0){
				element.className = element.className.replace(" open","");
			}else{
				element.className += " open";
			}
		});
	}
}

var LoginWithTwitterLoadingBehaviour = function(){
	var element = document.querySelector("#loginwithtwitter");
	if(element){
		var button = element.querySelector('button');
		element.addEventListener('click', function(){
			button.setAttribute("disabled",true);
			button.innerHTML = '<i class="fa fa-spinner fa-spin fa-lg">';
		});
	}
}

GenReportLoadingBehaviour();
OpenProfileWidgetBehaviour();
LoginWithTwitterLoadingBehaviour();
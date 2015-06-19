'use strict';

var diff = function(previous_list, new_list){
	var res = {
		'added': [],
		'removed': []
	}
	for(var item in new_list){
		if(previous_list.indexOf(new_list[item]) == -1){
			res.added.push(new_list[item]);
		}
	}
	for(var item in previous_list){
		if(new_list.indexOf(previous_list[item]) == -1){
			res.removed.push(previous_list[item]);
		}
	}
	return res;
}

module.exports = diff;
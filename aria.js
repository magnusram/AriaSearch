document.getElementById("person").addEventListener("keyup", function(e){
    if(e.keyCode == 13)
	{
			var searchText = e.target.value.trim();		
			if (isFarmSearch(searchText)){
				var type = getFarmSearchType(searchText);
				var farmSearchText = splitString(searchText)[1];
				if ('farm_id' === type){
					openUrlNewTab(FARM_ID_URL,farmSearchText);
				}
				else if ('uid' === type){
					openUrlNewTab(FARM_UID_URL,farmSearchText);
				}
			}
			else if (isBugSearch(searchText)){
				openUrlNewTab(BUG_URL,searchText);
			}
			else if (isPersonSearch(searchText)){
				openUrlNewTab(ARIA_URL,searchText);
			}
	}
});

document.addEventListener("DOMContentLoaded", function(event) { 
			window.setTimeout(function () { 
					document.getElementById("person").focus();
			}, 0); 
		});
		
function isNumber(value){
	return new RegExp('^\\d+$').test(value);
}

function isStringArray(value){
	return value.split(" ").length > 1;	
}

function isFarmSearch(value){
	var sArray = value.split(" ");
	return sArray[0] === 'f';	
}

function getFarmSearchType(value){
	var sArray = value.split(" ");
	if (isNumber(sArray[1]))
		return 'farm_id';
	else
		return 'uid';
}

function isBugSearch(value){
	if (!isStringArray(value) && isNumber(value))
	{
		return true;
	}
	else{
		return false;
	}
}

function isPersonSearch(value){	
	if (!isStringArray(value) && !isNumber(value))
	{
		return true;
	}
	else if (isStringArray(value) && !isFarmSearch(value)){
		return true;
	}
	else{
		return false;
	}
}

function splitString(value){
	var sArray = value.split(" ");
	return sArray;
}

function openUrlNewTab(site, queryParam){
	browser.tabs.query({active: true, currentWindow: true}, function(tabs) 
							{
								var index = tabs[0].index;		
								browser.tabs.create({url: site+encodeURIComponent(queryParam), active: true,index: index+1});								
							}
				);		
}
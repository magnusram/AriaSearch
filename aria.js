document.getElementById("person").addEventListener("keyup", function(e){
    if(e.keyCode == 13)
	{
			var searchText = e.target.value.trim();		
			if (isStringArray(searchText)){	
				if (isFarmSearch(searchText)){
					var id = splitString(searchText)[1];
					if (isNumber(id))
					{
						openUrlNewTab('http://emtriage.us.oracle.com/cgi/high_level_dif_report4.pl?farm_id=',id);				
					}
					else{
						openUrlNewTab('http://emtriage.us.oracle.com/cgi/list_user_farm_jobs.pl?uid=',id);			
					}
				}
				else{
					openUrlNewTab('https://people.us.oracle.com/pls/oracle/f?p='+8000+':1:'+4098291047319+':::RP,RIR:P1_SEARCH,P1_SEARCH_TYPE:',searchText);				
				}				
			}
			else{
				if (isNumber(searchText))
				{
					openUrlNewTab('https://bug.oraclecorp.com/pls/bug/webbug_edit.edit_info_top?rptno=',searchText);				
				}
				else
				{
					openUrlNewTab('https://people.us.oracle.com/pls/oracle/f?p='+8000+':1:'+4098291047319+':::RP,RIR:P1_SEARCH,P1_SEARCH_TYPE:',searchText);				
				}	
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
	if (isNumber(sArray[0]))
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
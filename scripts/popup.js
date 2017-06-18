function doc(id) {
    var res = document.getElementById(id);
    return res;
}

function icon(status) {
    if (status == 'enabled')
    {
        chrome.browserAction.setIcon({
    	    path : {
		        "16": "images/icon16.png",
		        "48": "images/icon48.png",
		        "128": "images/icon128.png"
	        }
        });
    } else if (status == 'disabled') {
	    chrome.browserAction.setIcon({
    	    path : {
        	    "16": "images/icon16_disabled.png",
        	    "48": "images/icon48_disabled.png",
        	    "128": "images/icon128_disabled.png"
    	    }
        });
    }
}

function click() {
    if (getCookie('enabled') == '1') {
        setCookie('enabled', '0', exp);
        icon('disabled');
        chrome.tabs.reload(parseInt(getCookie('tabId')), {bypassCache: false});
    } else if (getCookie('enabled') == '0') {
        setCookie('enabled', '1', exp);
        icon('enabled');
        chrome.tabs.reload(parseInt(getCookie('tabId')), {bypassCache: false});
    }
    location.reload();
}

document.getElementById('b1').onclick = function() {click();};

var exp = 365;

if (getCookie('enabled') == undefined) {
    setCookie('enabled', '1', exp);
    doc('b1').innerHTML = 'Enabled';
    doc('b1').classList = 'b1';
    icon('enabled');
} else if (getCookie('enabled') == '1') {
    doc('b1').innerHTML = 'Enabled';
    doc('b1').classList = 'b1';
    icon('enabled');
} else if (getCookie('enabled') == '0') {
    doc('b1').innerHTML = 'Disabled';
    doc('b1').classList = 'b1 d';
    icon('disabled');
}
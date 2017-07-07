//native function of getting block
function doc(id) {
    var res = document.getElementById(id);
    return res;
}

//function for changing icon
function icon(status) {
    if (status == 'enabled')
    {
        chrome.browserAction.setIcon({
    	    path : {
		        "128": "images/icon128.png"
	        }
        });
    } else if (status == 'disabled') {
	    chrome.browserAction.setIcon({
    	    path : {
        	    "128": "images/icon128_disabled.png"
    	    }
        });
    }
}

//function for button
function click() {
    storageGet('enabled', function(storage) {
        if (storage.enabled != '0') {
            storageSet('enabled', '0');
            icon('disabled');
        } else {
            storageSet('enabled', '1');
            icon('enabled');  
        }
    });

    chrome.tabs.reload();
    location.reload();
}

doc('b1').onclick = function() {
    click();
};
doc('version').innerHTML = 'v'+chrome.app.getDetails().version;

//changing storage data while page is loading
storageGet('enabled', function(storage) {
    if (storage.enabled != '0') {
        doc('b1').innerHTML = chrome.i18n.getMessage('button_a');
        doc('b1').classList = 'b1';
        icon('enabled');
    } else {
        doc('b1').innerHTML = chrome.i18n.getMessage('button_d');
        doc('b1').classList = 'b1 d';
        icon('disabled');
    }
});
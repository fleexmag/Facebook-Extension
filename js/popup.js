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

//function for select color
function click_sel(num) {
    num = num.split('color')[1];

    storageGet('color', function (storage) {
        if (num == undefined) {
            storageSet('color', 'standart');
        } else {
            storageSet('color', num);
        }
    });

    chrome.tabs.reload();
    location.reload();
}

var count = 3; //colors count

//function for autoresize color buttons
function buttons_autoresize() {
    var size = (doc('b1').clientWidth - 10 * count)/count;

    for (i = 1; i <= count; i++) {
        doc('color' + i).style.width = size;
        doc('color' + i).style.height = size;
        doc('selected' + i).style.height = size;
        doc('selected' + i).style.width = size;
    }

    doc('colors').style.width = size * count + 10 * count;
    doc('colors').style.height = size + 10;
}

doc('b1').onclick = function() {
    click();
};

for (i = 1; i <= count; i++)
{
    doc('color' + i).onclick = function(event) {
        click_sel(event.target.id);
    }
}

doc('version').innerHTML = 'v'+chrome.app.getDetails().version;

storageGet(['enabled', 'color'], function(storage) {
    if (storage.enabled != '0') {
        doc('b1').innerHTML = chrome.i18n.getMessage('button_a');
        doc('b1').classList = 'b1';
        icon('enabled');
    } else {
        doc('b1').innerHTML = chrome.i18n.getMessage('button_d');
        doc('b1').classList = 'b1 d';
        icon('disabled');
    }
    buttons_autoresize();

    //display selected color
    for (i = 1; i <= count; i++) {
        doc('selected' + i).style.display = 'none';
    }

    if (storage.color == 1) {
        doc('selected1').style.display = 'block';
    } else if (storage.color == 2) {
        doc('selected2').style.display = 'block';
    } else if (storage.color == 3) {
        doc('selected3').style.display = 'block';
    }
});
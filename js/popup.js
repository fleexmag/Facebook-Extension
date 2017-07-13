//function for get block by id
function doc(id) {
    return document.getElementById(id);
}

//function for reload 
function reload() {
    chrome.tabs.reload();
    location.reload();
}

//function for change extension icon
function changeIcon(status) {
    chrome.browserAction.setIcon({
        path: {
            '128': 'images/icon128_' + status + '.png'
        }
    });
}

//function for enable button
function enableButtonClicked() {
    storageGet('enabled', function(storage) {
        if (storage.enabled != '0') {
            storageSet({'enabled': '0'});
            changeIcon('disabled');
        } else {
            storageSet({'enabled': '1'}); 
            changeIcon('enabled');
        }
    });

    reload();
}

//function for change selected color
function changeColor(color) {
    color = color.split('color')[1];

    storageGet('color', function(storage) {
        if (color == undefined) {
            storageSet({'color': 'standart'});
        } else {
            storageSet({'color': color});
        }
    });

    reload();
}

//function for configurate color buttons
function buttonsConf() {
    var count = {'hor': 3, 'ver': 1}; 
    var size = (doc('b1').clientWidth - 10 * count['hor'])/count['hor'];

    for(n = 1; n <= count['hor']; n++) {
        doc('color' + n).style.width = size;
        doc('color' + n).style.height = size;
        doc('selected' + n).style.display = 'none';

        doc('color' + n).onclick = function(e) {
            changeColor(e.target.id);
        };

        doc('selected' + n).style.width = size;
        doc('selected' + n).style.height = size;
    }

    doc('colors').style.width = size * count['hor'] + 10 * count['hor'];
    doc('colors').style.height = size * count['ver'] + 10 * count['ver'];

    storageGet('color', function(storage) {
        if (doc('selected' + storage.color) != undefined) {
            doc('selected' + storage.color).style.display = 'block';
        }
    });
}

//main 
storageGet('enabled', function(storage) {
    //first stage
    if (storage.enabled != '0') {
        doc('b1').innerHTML = getMessage('button_a');
        doc('b1').classList = 'b1';
        changeIcon('enabled');
    } else {
        doc('b1').innerHTML = getMessage('button_d');
        doc('b1').classList = 'b1 d';
        changeIcon('disabled');
    }

    doc('b1').onclick = function() {
        enableButtonClicked();
    };

    //second stage 
    buttonsConf();

    //third stage 
    doc('version').innerHTML = 'v' + chrome.app.getDetails().version;
});
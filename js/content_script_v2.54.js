//vars 
var image = chrome.extension.getURL('images/image.png');
    up_button_src = chrome.extension.getURL('images/up.png');

//native function for getting storage data
function storageGet(cname, callback) {
    chrome.storage.local.get(cname, callback);
}

//native function for setting storage data
function storageSet(cname, cvalue) {
    obj = {};
    obj[cname] = cvalue; 
    chrome.storage.local.set(obj);
}

//native function of getting block
function doc(value, num) {
    if (num != undefined) {
        var res = document.getElementsByClassName(value)[num];
    } else {
        var res = document.getElementById(value);
    }
    return res;
}

//gen block with content for right col
function gen_block(content, styles) {
    var res = '<div class="pagelet-group pagelet" id="pagelet_i_want_to_believe_rhc" data-referrer="pagelet_i_want_to_believe_rhc" data-display-group="rhc"><div class="_1-ia"><div class="_4-u2 _1-ib _2tyk _20os _4-u8" style="'+styles+'">'+content+'</div></div></div>';
    return res;
}

//function for adding block with photo "I want to believe"
function addPhoto(value) {
    storageSet('addPhoto', value);
    location.reload();
}

//function for adding photo block
function addPhotoTest(value, num) {
    var res = null;

    storageGet('addPhoto', function(storage) {
        if (storage.addPhoto == 1)
        {
            //add block with photo "I want to believe"
            try {
                doc(value, num).innerHTML = gen_block('<img src="'+image+'" width="284px" height="355px" title="'+chrome.i18n.getMessage('hide')+'"/>', 'cursor: pointer;');
                doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                    addPhoto('0');
                };
                res = 'success';
            } catch (e) {
                console.log('error: ' + e.name);
            }
        } else {
            //hide block with photo "I want to believe"
            try {
                doc(value, num).innerHTML = gen_block(chrome.i18n.getMessage('show'), 'height: 20px; width: 284px; background-color: #32cd7e; font: 22px sans-serif; color: white; text-align: center; line-height: 20px; cursor: pointer;');
                doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                    addPhoto('1');
                };
                res = 'success';
            } catch (e) {
                console.log('error: ' + e.name);
            }
        }

        if (res == 'success') {
            console.log('extension: Photo successfully added');
        }
    });
}

//function for animate
function animate(func, duration) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;

        if (timePassed >= duration) {
            timePassed = duration;
        }

        func(timePassed);

        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }
    });
}

//onscroll page function
function onscroll() {
    var scroll_value = window.pageYOffset;
    
    if (scroll_value >= 1000 && doc('up_button_block') != undefined) {
        doc('up_button_block').style.display = 'block';
        if (doc('up_button_block').style.opacity == 0)
        {
            var time = 1000;
                plus = 1/time;
            animate(function(timePassed) {
                doc('up_button_block').style.opacity = plus*timePassed;
            }, time);
        }
    } else if (doc('up_button_block') != undefined) {
        doc('up_button_block').style.display = 'none';
        doc('up_button_block').style.opacity = '0';
    }
}

storageGet('page_url', function(storage) {
    if (storage.page_url != location.href && location.href.split('?')[0].split('www.facebook.com')[1] != '/photo.php') {
        storageSet('page_url', location.href);
        location.reload();
    } else {
        //remove right col and chat etc.
        try {
            doc('facebook').classList.remove('sidebarMode');
            doc('globalContainer').style.paddingRight = '0px';
            doc('fbDockChatBuddylistNub').style.display = 'none';
        } catch (e) {
            console.log('error: ' + e.name);
        }

        //params of changes for pages: "profile" or another pages
        if (doc('fbProfileCover') != undefined && doc('globalContainer') != undefined) {
            //new window size for profile
            doc('globalContainer').style.width = '851px';
        } else if (doc('globalContainer') != undefined) {
            doc('globalContainer').style.width = '';
            if (doc('pagelet_ego_pane') != undefined) {
                doc('pagelet_ego_pane').id = 'pagelet_ego_pane_with_photo';
            }
            addPhotoTest('pagelet_ego_pane_with_photo');
        }

        //-------------------------- up button beta --------------------------
        if (doc('up_button_block') == undefined)
        {
            doc('pagelet_sidebar').innerHTML += '<div id="up_button_block" style="position: fixed; width: 31px; height: 31px; bottom: 25px; left: 25px; background-color: #2aad6b; border-radius: 100%; display: none; opacity: 0; cursor: pointer;"><img src="'+up_button_src+'" width="31px" height="31px"/></div>';
            doc('up_button_block').onclick = function() {
                var time = 500;
                    minus = window.pageYOffset/time;
                    y = window.pageYOffset;

                animate(function(timePassed) {
                    console.log(timePassed);
                    window.scroll(window.pageXOffset, y - minus*timePassed);
                }, time);
            }
        }

        window.onscroll = function() {
            onscroll();
        };
        //------------------------------- end --------------------------------
    }
});
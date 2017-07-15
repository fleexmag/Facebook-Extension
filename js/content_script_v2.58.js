'use strict';

//function for get storage data
function storageGet(name, callback)  {
    chrome.storage.local.get(name, callback);
}

//function for set storage data 
function storageSet(data) {
    chrome.storage.local.set(data);
}   

//function for get url to extension source
function getURL(source) {
    return chrome.extension.getURL(source);
}

//function for get message 
function getMessage(name) {
    return chrome.i18n.getMessage(name);
}

//function for get blocks 
function doc(name, num) {
    var res;

    if (num != undefined) {
        res = document.getElementsByClassName(name)[num];
    } else {
        res = document.getElementById(name);
    }

    return res;
}

//global vars
var scrollUpButtonSrc = getURL('images/up.png');

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

//function for page scroll
function onScroll(id) {
    var scrollValue = window.pageYOffset;

    if (scrollValue >= 800 && doc(id) != undefined) {
        doc(id).style.display = 'block';
        
        if (doc(id).style.opacity == 0) {
            var time = 1000;
            var plus = 1/time;

            animate(function(timePassed) {
                doc(id).style.opacity = plus * timePassed;
            }, time);
        }
    }  else if (doc(id) != undefined) {
        doc(id).style.display = 'none';
        doc(id).style.opacity = '0';
    }
}

//function for remove footer block padding
function removeFooterBlockPadding() {
    var filledPagelets = 0;
    [].forEach.call(document.getElementsByClassName('pagelet'), function(value, num) {
        if (doc('pagelet', num) != undefined) {
            if (String(doc('pagelet', num).innerText).length > 0 && doc('pagelet', num).id != 'pagelet_ego_pane' && doc('pagelet', num).getAttribute('id') != undefined) {
                filledPagelets++;
            }
        }
    });

    if (doc('pagelet_rhc_footer') != undefined && doc('pagelet_ego_pane') != undefined) { 
        if (String(doc('pagelet_ego_pane').innerText).length == 0) {
            filledPagelets++;
        }

        doc('pagelet_ego_pane').remove();

        if (doc('pagelet_rhc_footer').getElementsByClassName('_45mq')[0] != undefined && filledPagelets == 0)
        {
            doc('pagelet_rhc_footer').getElementsByClassName('_45mq')[0].classList.remove('_45mq');
        }
    }

    var mainPage;
    var fbURL = ['www.facebook.com/', 'www.facebook.com/?sk=nf', 'www.facebook.com/?ref=tn_tnmn'];
    fbURL.forEach(function(value) {
        if (location.href.split('://')[1] == value) {
            mainPage = true;
        }
    });
    
    if (mainPage == true && doc('_5rzs _5v6d', 0) != undefined && doc('_64a', 0) != undefined && doc('_64b', 0) != undefined) {
        doc('_5rzs _5v6d', 0).innerHTML = doc('_64a', 0).innerHTML;
        doc('_5rzs _5v6d', 0).classList.add('_64a');
        doc('_64b', 0).classList.add('fixed_elem');
        doc('_64b', 0).style.top = '43px';
        doc('_64b', 0).style.width = '308px';
    }
}

//function for remove right col and chat etc.
function removeTrash() {
    if (doc('facebook') != undefined && doc('globalContainer') != undefined) {
        if (doc('facebook').classList.contains('sidebarMode') != 0)
        {
            doc('facebook').classList.remove('sidebarMode');
        }
        
        doc('globalContainer').style.paddingRight = '0px';
    }

    if (doc('fbDockChatBuddylistNub') != undefined) {
        doc('fbDockChatBuddylistNub').remove();
    }
}

//function for add scroll_up_button
function addScrollUpButton() {
    var id = 'srcoll_up_button_block';

    if (doc(id) == undefined && doc('pagelet_sidebar') != undefined && doc('_2t-a _26aw _5rmj _50ti _2s1y', 0) != undefined) {
        doc('pagelet_sidebar').id = 'scroll_up_button';
        doc('scroll_up_button').removeAttribute('data-referrer');

        var styles = 'position: fixed; width: 31px; height: 31px; bottom: 25px; left: 25px; border-radius: 100%; display: none; opacity: 0; cursor: pointer; background-color: '+doc('_2t-a _26aw _5rmj _50ti _2s1y', 0).style.backgroundColor+';';
        var width = '31px';
        var height = '31px';

        doc('scroll_up_button').innerHTML = '<div id="'+id+'" style="'+styles+'"><img src="'+scrollUpButtonSrc+'" width="'+width+'" height="'+height+'"/></div>';
        doc(id).onclick = function() {
            var time = 500;
            var scrollValue = window.pageYOffset;

            animate(function(timePassed) {
                window.scroll(window.pageXOffset, scrollValue - (scrollValue/time) * timePassed);
            }, time);
        };
    } 

    //onscroll event
    window.onscroll = function() {
        onScroll(id);
    };
}

//change theme color
storageGet('color', function(storage) {
    var classesNames = [
        '_2t-a _26aw _5rmj _50ti _2s1y',
        '_2n_9',
        '_59fb _tmz',
        '_5lxt'
    ];

    var colors = {
        '1': 'rgb(19, 207, 19)',
        '2': 'rgb(255, 195, 0)',
        '3': 'rgb(250, 60, 76)',
        'standart': '#3b5998'
    }

    if (storage.color != 'standart' && storage.color != undefined && doc(classesNames[0], 0) != undefined) {
        doc(classesNames[0], 0).style.backgroundColor = colors[storage.color];
        doc(classesNames[0], 0).style.borderBottom = colors[storage.color];
        doc(classesNames[1], 0).style.backgroundImage = 'url('+getURL('images/colors/color' + storage.color +'.1.png')+')';
        doc(classesNames[1], 1).style.backgroundImage = 'url('+getURL('images/colors/color' + storage.color +'.1.png')+')';
        doc(classesNames[1], 2).style.backgroundImage = 'url('+getURL('images/colors/color' + storage.color +'.1.png')+')';
        doc(classesNames[2], 0).style.backgroundImage = 'url('+getURL('images/colors/color' + storage.color +'.1.png')+')';
        doc(classesNames[3], 0).style.backgroundImage = 'url('+getURL('images/colors/color' + storage.color +'.1.png')+')';
    } else if (doc(classesNames[0], 0) != undefined) {
        doc(classesNames[0], 0).style.backgroundColor = colors['standart'];
        doc(classesNames[0], 0).style.borderBottom = colors['standart'];
    }
});



storageGet('page_url', function(storage) {
    if (storage.page_url != location.href && location.href.split('?')[0].split('www.facebook.com')[1] != '/photo.php' && location.href.search('/photos/') <= 0 && location.href.search('/videos/') <= 0) {
        storageSet({'page_url': location.href});
        location.reload();
    } else {
        removeTrash();
        removeFooterBlockPadding();
        addScrollUpButton();

        //params of changes for pages: "profile" or another pages 
        if (doc('fbProfileCover') != undefined && doc('globalContainer') != undefined) {
            //new window size for profile page
            doc('globalContainer').style.width = '851px';
        }
    }
});
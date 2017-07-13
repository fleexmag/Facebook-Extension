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

//function for generate block with content for right col
function genBlock(content, styles) {
    var classesNames = ['pagelet-group pagelet', '_1-ia', '_4-u2 _1-ib _2tyk _20os _4-u8'];
    var displayGroup = 'rhc';
    var id = 'pagelet_i_want_to_believe_' + displayGroup;
    
    var res = '<div class="'+classesNames[0]+'" id="'+id+'" data-referrer="'+id+'" data-display-group="'+displayGroup+'"><div class="'+classesNames[1]+'"><div class="'+classesNames[2]+'" style="'+styles+'">'+content+'</div></div></div>';

    return res;
}

//global vars
var imageSrc = getURL('images/image.png');
var scrollUpButtonSrc = getURL('images/up.png');

//function for add block to rhc
function addBlockToRHC(name, num) {
    var res;

    storageGet('addPhoto', function(storage) {
        if (doc(name, num) != undefined && doc('_2t-a _26aw _5rmj _50ti _2s1y', 0)) {
            if (storage.addPhoto == 1) {
                //add block with photo 'I want to believe
                var width = '284px';
                var height = '355px';
                var styles = 'cursor: pointer;';

                doc(name, num).innerHTML = genBlock('<img src="'+imageSrc+'" title="'+getMessage('hide')+'" width="'+width+'" height="'+height+'"/>', styles) + doc(name, num).innerHTML;
                doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                    storageSet({'addPhoto': '0'});
                    location.reload();
                };  
            } else {
                //add block with button 'Show'
                var styles = 'height: 20px; width: 284px; background-color: '+doc('_2t-a _26aw _5rmj _50ti _2s1y', 0).style.backgroundColor+'; font: 22px sans-serif; color: white; text-align: center; line-height: 20px; cursor: pointer;';

                doc(name, num).innerHTML = genBlock(getMessage('show'), styles) + doc(name, num).innerHTML;
                doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                    storageSet({'addPhoto': '1'});
                    location.reload();
                };  
            }

            res = 'success';
        }
    });

    return res;
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

//function for page scroll
function onScroll() {
    var scrollValue = window.pageYOffset;

    if (scrollValue >= 800 && doc('up_button_block') != undefined) {
        doc('up_button_block').style.display = 'block';
        
        if (doc('up_button_block').style.opacity == 0) {
            var time = 1000;
            var plus = 1/time;

            animate(function(timePassed) {
                doc('up_button_block').style.opacity = plus * timePassed;
            }, time);
        }
    }  else if (doc('up_button_block') != undefined) {
        doc('up_button_block').style.display = 'none';
        doc('up_button_block').style.opacity = '0';
    }
}

//change facebook theme color ------------ beta ------------
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

//------------ end of beta ------------

storageGet('page_url', function(storage) {
    if (storage.page_url != location.href && location.href.split('?')[0].split('www.facebook.com')[1] != '/photo.php' && location.href.search('/photos/') == 0) {
        storageSet({'page_url': location.href});
        location.reload();
    } else {
        //remove right col and chat etc.
        if (doc('facebook') != undefined && doc('globalContainer') != undefined) {
            if (doc('facebook').classList.contains('sidebarMode') != 0)
            {
                doc('facebook').classList.remove('sidebarMode');
            }

            doc('globalContainer').style.paddingRight = '0px';
        }

        if (doc('fbDockChatBuddylistNub') != undefined) {
            doc('fbDockChatBuddylistNub').style.visability = 'hidden';
        }

        //remove pagelet_ego_pane
        if (doc('pagelet_ego_pane') != undefined) {
            [].forEach.call(doc('pagelet_ego_pane').getElementsByTagName('*'), function(value, num) {
                doc('pagelet_ego_pane').getElementsByTagName('*')[num].style.visability = 'hidden';
            });
            
            doc('pagelet_ego_pane').id = 'pagelet_ego_pane_with_photo';
            doc('pagelet_ego_pane_with_photo').setAttribute('data-referrer', 'pagelet_ego_pane_with_photo');

            addBlockToRHC('pagelet_ego_pane_with_photo');
        }

        //params of changes for pages: "profile" or another pages 
        if (doc('fbProfileCover') != undefined && doc('globalContainer') != undefined) {
            //new window size for profile page
            doc('globalContainer').style.width = '851px';
        } else if (doc('globalContainer') != undefined) {
            doc('globalContainer').style.width = '';
        }

        //add scroll up button 
        if (doc('up_button_block') == undefined && doc('pagelet_sidebar') != undefined && doc('_2t-a _26aw _5rmj _50ti _2s1y', 0) != undefined) {
            doc('pagelet_sidebar').id = 'scroll_up_button';
            doc('scroll_up_button').setAttribute('data-referrer', 'scroll_up_button');

            var styles = 'position: fixed; width: 31px; height: 31px; bottom: 25px; left: 25px; border-radius: 100%; display: none; opacity: 0; cursor: pointer; background-color: '+doc('_2t-a _26aw _5rmj _50ti _2s1y', 0).style.backgroundColor+';';
            var id = 'up_button_block';
            var width = '31px';
            var height = '31px';

            doc('scroll_up_button').innerHTML = '<div id="'+id+'" style="'+styles+'"><img src="'+scrollUpButtonSrc+'" width="'+width+'" height="'+height+'"/></div>';
            doc('up_button_block').onclick = function() {
                var time = 500;
                var scrollValue = window.pageYOffset;

                animate(function(timePassed) {
                    window.scroll(window.pageXOffset, scrollValue - (scrollValue/time) * timePassed);
                }, time);
            };
        }

        //onscroll event
        window.onscroll = function() {
            onScroll();
        };
    }
});
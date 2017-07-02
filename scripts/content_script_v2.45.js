//vars 
var image = chrome.extension.getURL('images/image.png');

//native function for getting cookie
function getCookie(cname) {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + cname.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//native function for setting cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;secure=true;";
}

//native function of getting block
function doc(class_name, num) {
    var res = document.getElementsByClassName(class_name)[num];
    return res;
}
//gen block with content for right col
function gen_block(content, styles) {
    var res = ''+
    '<div class="pagelet-group pagelet" id="pagelet_games_rhc"'+
            'data-referrer="pagelet_games_rhc" data-display-group="rhc">'+
        '<div class="_1-ia">'+
            '<div class="_4-u2 _1-ib _2tyk _20os _4-u8" style="'+styles+'">'+content+'</div>'+
        '</div>'+
    '</div>';
    return res;
}

//remove right col and chat etc.
if (doc('fbChatSidebar fixed_always _5pr2', 0) != undefined) {
    doc('fbChatSidebar fixed_always _5pr2', 0).style.display = 'none';
}
if (doc('uiContextualLayerParent', 0) != undefined) {
    doc('uiContextualLayerParent', 0).style.paddingRight = '0px';
}
if (doc('_1-ia', 0) != undefined) {
    doc('_1-ia', 0).style.display = 'none';
}
if (doc('_1-ia', 1) != undefined) {
    doc('_1-ia', 1).style.display = 'none';
}
if (doc('_1-ia', 2) != undefined) {
    doc('_1-ia', 2).style.display = 'none';
}

if (getCookie('addPhoto') == 1)
{
    //add block with photo "I want to believe"
    if (doc('home_right_column', 0) != undefined)
    {
        doc('home_right_column', 0).innerHTML = gen_block('<img src="'+image+'" width="284px" height="355px"'+
        'title="'+chrome.i18n.getMessage('hide')+'"/>', 'cursor: pointer;')+
        doc('home_right_column', 0).innerHTML;
        doc('_4-u2 _1-ib _2tyk _20os _4-u8', 0).onclick = function() {
            addPhoto('0');
        };
    }
} else {
    //hide block with photo "I want to believe"
    if (doc('home_right_column', 0) != undefined)
    {
        doc('home_right_column', 0).innerHTML = gen_block(chrome.i18n.getMessage('show'), 
        'height: 20px; width: 284px; background-color: #32cd7e; font: 22px sans-serif; color: white; text-align: center;'+
        'line-height: 20px; cursor: pointer;')+
        doc('home_right_column', 0).innerHTML;
        doc('_4-u2 _1-ib _2tyk _20os _4-u8', 0).onclick = function() {
            addPhoto('1');
        };
    }
}
    
//params of changes for pages: "profile" or another pages
if (doc('profilePic img', 0) != undefined) {
    //new window size for profile
    doc('uiContextualLayerParent', 0).style.width = '851px';
} else if (doc('profilePic img', 0) == undefined) {
    doc('uiContextualLayerParent', 0).style.width = '';
}

//function for adding block with photo "I want to believe"
function addPhoto(value) {
    setCookie('addPhoto', value, 365);
    location.reload();
}
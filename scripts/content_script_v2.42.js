//vars 
var main_page = document.getElementsByClassName('_2s25')[1].href; //news href
    main_page = main_page.replace('?ref=tn_tnmn','');
    text = '323a342a60c5451010154c4b4ab545aca4a4d0732ce254be32d21b3acbe4c1';
    image = 'https://raw.githubusercontent.com/Smurfik997/Facebook-Extension/master/images/image.png';

//native function for getting cookie
function getCookie(cname) {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + cname.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : 1;
}

//native function for setting cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
doc('fbChatSidebar fixed_always _5pr2', 0).style.display = 'none';
doc('fbChatSidebar fixed_always _5pr2', 0).style.display = 'none';
doc('uiContextualLayerParent', 0).style.paddingRight = '0px';

//params of changes for pages: "main" or "profile", another pages
if (window.location == main_page) {
    if (doc('_1-ia', 0) != undefined) {
        doc('_1-ia', 0).style.display = 'none';
    }
    if (doc('_1-ia', 1) != undefined) {
        doc('_1-ia', 1).style.display = 'none';
    }
    if (doc('_1-ia', 2) != undefined) {
        doc('_1-ia', 2).style.display = 'none';
    }

    console.log(getCookie('addPhoto'));
    if (getCookie('addPhoto') == '1')
    {
        //add block with photo "I want to believe"
        doc('home_right_column', 0).innerHTML = gen_block('<img src="'+image+'" width="284px" height="355px"'+
        'title="'+chrome.i18n.getMessage('hide')+'"/>', '')+
        doc('home_right_column', 0).innerHTML;
        doc('_4-u2 _1-ib _2tyk _20os _4-u8', 0).onclick = function() {
            addPhoto('0');
        };
    } else {
        doc('home_right_column', 0).innerHTML = gen_block(chrome.i18n.getMessage('show'), 
        'height: 20px; width: 284px; background-color: #32cd7e; font: 22px sans-serif; color: white; text-align: center;'+
        'line-height: 20px;')+
        doc('home_right_column', 0).innerHTML;
        doc('_4-u2 _1-ib _2tyk _20os _4-u8', 0).onclick = function() {
            addPhoto('1');
        };
    }
} else if (window.location != main_page && doc('profilePic img', 0) == undefined) {
    doc('uiContextualLayerParent', 0).style.width = '';
} else if (doc('profilePic img', 0) != undefined) {
    //new window size for profile
    doc('uiContextualLayerParent', 0).style.width = '852px';
}

//function for adding block with photo "I want to believe"
function addPhoto(value) {
    setCookie('addPhoto', value, 365);
    location.reload();
}
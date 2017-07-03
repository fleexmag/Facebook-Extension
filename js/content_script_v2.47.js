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

//native function of getting block by id
function doc(id) {
    var res = document.getElementById(id);
    return res;
}

//native function of getting block by class name
function doc_class(class_name, num) {
    var res = document.getElementsByClassName(class_name)[num];
    return res;
}

//gen block with content for right col
function gen_block(content, styles) {
    var res = ''+
    '<div class="pagelet-group pagelet" id="pagelet_i_want_to_believe_rhc"'+
            'data-referrer="pagelet_i_want_to_believe_rhc" data-display-group="rhc">'+
        '<div class="_1-ia">'+
            '<div class="_4-u2 _1-ib _2tyk _20os _4-u8" style="'+styles+'">'+content+'</div>'+
        '</div>'+
    '</div>';
    return res;
}

//function for adding block with photo "I want to believe"
function addPhoto(value) {
    setCookie('addPhoto', value, 365);
    location.reload();
}

//function
function addPhotoTest(class_name) {
    var res = null;

    if (getCookie('addPhoto') == 1)
    {
        //add block with photo "I want to believe"
        if (doc('rightCol') != undefined && doc_class(class_name, 0) != undefined && doc('pagelet_rhc_footer') != undefined)
        {
            doc_class(class_name, 0).innerHTML = gen_block('<img src="'+image+'" width="284px" height="355px"'+
            'title="'+chrome.i18n.getMessage('hide')+'"/>', 'cursor: pointer;');
            doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                addPhoto('0');
            };
            res = 'success';
        }
    } else {
        //hide block with photo "I want to believe"
        if (doc('rightCol') != undefined && doc_class(class_name, 0) != undefined && doc('pagelet_rhc_footer') != undefined)
        {
            doc_class(class_name, 0).innerHTML = gen_block(chrome.i18n.getMessage('show'), 
            'height: 20px; width: 284px; background-color: #32cd7e; font: 22px sans-serif; color: white;' +
            'text-align: center; line-height: 20px; cursor: pointer;');
            doc('pagelet_i_want_to_believe_rhc').onclick = function() {
                addPhoto('1');
            };
            res = 'success';
        }
    }
    
    return res;
}

//remove right col and chat etc.
if (doc('pagelet_sidebar') != undefined) {
    doc('pagelet_sidebar').style.display = 'none';
}
if (doc('globalContainer') != undefined) {
    doc('globalContainer').style.paddingRight = '0px';
}

//params of changes for pages: "profile" or another pages
if (doc('fbProfileCover') != undefined && doc('globalContainer') != undefined) {
    //new window size for profile
    doc('globalContainer').style.width = '851px';
} else if (doc('fbProfileCover') == undefined && doc('globalContainer') != undefined) {
    doc('globalContainer').style.width = '';
    if (addPhotoTest('home_right_column') != null) 
    {
        addPhotoTest('home_right_column');
    }
    else if (addPhotoTest('ego_column pagelet u_d2zh27j- egoOrganicColumn') != null) {
        addPhotoTest('home_right_column');
    }
}
//vars 
var main_page = document.getElementsByClassName('_2s25')[1].href; //news href
    main_page = main_page.replace('?ref=tn_tnmn','');
    text = '323a342a60c5451010154c4b4ab545aca4a4d0732ce254be32d21b3acbe4c1';
    image = 'https://raw.githubusercontent.com/Smurfik997/Facebook-Extension/master/images/image.png';
    img_like = 'https://raw.githubusercontent.com/Smurfik997/Facebook-Extension/master/images/img_like.png';

//native function of getting block
function doc(class_name, num) {
    var res = document.getElementsByClassName(class_name)[num];
    return res;
}
//gen block with content for right col
function gen_block(content) {
    var res = ''+
    '<div class="pagelet-group pagelet" id="pagelet_games_rhc" '+
            'data-referrer="pagelet_games_rhc" data-display-group="rhc">'+
        '<div class="_1-ia">'+
            '<div class="_4-u2 _1-ib _2tyk _20os _4-u8">'+content+'</div>'+
        '</div>'+
    '</div>';
    return res;
}

//remove right col and chat
doc('fbChatSidebar fixed_always _5pr2', 0).style.display = 'none';
doc('uiContextualLayerParent', 0).style.paddingRight = '0px';

//params of changes for pages: "main" or "profile", another pages
if (window.location == main_page) {
    doc('_1-ia', 0).style.display = 'none';
    doc('_1-ia', 1).style.display = 'none';

    //add block width photo "I want to believe"
    doc('home_right_column', 0).innerHTML = gen_block('<img src="'+image+'" width="284px" height="355px"/>')+
    doc('home_right_column', 0).innerHTML;

    //add block with magic text
    doc('home_right_column', 0).innerHTML = gen_block('<span style="font: normal 14px sans-serif;'+
    'line-height: 16px;">'+text+'</span>'+
    '<img src="'+img_like+'" width="16px" height="16px" style="position: absolute; padding-left: 5px;"/>')+
    doc('home_right_column', 0).innerHTML;
} else {
    doc('uiContextualLayerParent', 0).style.width = '';
}

if (doc('profilePic img', 0) != 'undefined') {
    //new window size for profile
    doc('uiContextualLayerParent', 0).style.width = '852px';
}
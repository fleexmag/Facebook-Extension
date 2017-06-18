//window.location.reload();

//username
var username = document.getElementsByClassName('_2s25')[0].href;
var main_page = document.getElementsByClassName('_2s25')[1].href;
    main_page = main_page.replace('?ref=tn_tnmn','');
//alert(username + '   ' + main_page);

//правая панель и чат
document.body.getElementsByClassName('fbChatSidebar fixed_always _5pr2')[0].style.display = 'none';
//document.body.getElementsByClassName('_48gf fbDockWrapper fbDockWrapperRight')[0].style.display = 'none';

//определение страницы: "главная" или "профиль"
if (window.location == main_page) {
    //размер блока новостей + выровнять по центру
    /*document.body.getElementsByClassName('_2pie')[0].style.paddingTop = '0px';
    document.body.getElementsByClassName('uiContextualLayerParent')[0].style.width = '1012px';
    document.body.getElementsByClassName('_14iw _1qkq _1qku')[0].style.display = 'none';*/
    document.body.getElementsByClassName('uiContextualLayerParent')[0].style.paddingRight = '0px';
    /*document.body.getElementsByClassName('_14i5 _1qkq _1qkx')[0].style.right = '0px';

    var b1 = '_5r-_ homeWiderContent homeFixedLayout newsFeedComposer';
    document.body.getElementsByClassName('_5r-_ homeWiderContent homeFixedLayout newsFeedComposer _1qkq _1ql0')[0].classList = b1;
    document.body.getElementsByClassName(b1)[0].style.width = '540px';*/

    document.body.classList = 'hasLeftCol home composerExpanded _5vb_ fbx _-kb n_d2zh2opu  webkit win x1 Locale_ru_RU';

    //информация о фейсбуке
    /*var b2 = document.body.getElementsByClassName('uiFutureSideNav')[0];
    if (document.body.getElementsByClassName('_45mq')[0] != null) {
        var b3 = document.body.getElementsByClassName('_45mq')[0].innerHTML;
    }
    b2.innerHTML = b2.innerHTML+'<div style="margin: 8px 0px 0px -10px; width: 200px;">'+b3+'</div>';
    document.body.getElementsByClassName('_26z1')[0].style.padding = '0px 6px 0px 6px';*/
} else if (window.location == username) {
    //размер блока профиля + выровнять по центру
    document.body.getElementsByClassName('uiContextualLayerParent')[0].style.width = '852px';
} else {
    document.body.getElementsByClassName('uiContextualLayerParent')[0].style.width = '';
}
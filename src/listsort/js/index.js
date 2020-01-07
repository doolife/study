import '../sass/index.scss';

let $winWidth;
let $wrap = $(".color");
let $list = $wrap.find(".color__list");
var timeId;

function resizeList(){
    $winWidth = $(window).width();
    let $listWidth = $list.width();
    let $listHeight = $list.height();
    let $listLength = Math.floor(($winWidth-100)/$listWidth);
    let $wrapWidth = $listLength*$listWidth;
    let $heightLength;

    for ( let i=0, len=$list.length ; i<len ; i++ ){
        let numTop =  Math.floor(i / $listLength) * $listWidth;
        let numLeft =  (i % $listLength) * $listWidth;
        $heightLength = Math.floor(i / $listLength);
        $list.eq(i).stop().delay(i*50).animate({top:numTop, left:numLeft}, 300);
    };

    $wrap.css({width:$wrapWidth, height:($heightLength+1)*$listHeight});
};

$(window).resize(function(){
    clearTimeout(timeId);
    timeId = setTimeout(resizeList, 300);
}).resize();


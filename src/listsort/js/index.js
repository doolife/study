import '../sass/index.scss';

let $winWidth;
let $wrap = $(".color");
let $list = $wrap.find(".color__list");
let $timeId;
let $opction = {
    padding:100,
    delay:50,
    speed:300
};

function resizeList(){
    $winWidth = $(window).width();
    let $listWidth = $list.width();
    let $listHeight = $list.height();
    let $listLength = Math.floor(($winWidth-$opction.padding)/$listWidth);
    let $wrapWidth = $listLength*$listWidth;
    let $heightLength;

    for ( let i=0, len=$list.length ; i<len ; i++ ){
        let numTop =  Math.floor(i / $listLength) * $listWidth;
        let numLeft =  (i % $listLength) * $listWidth;
        $heightLength = Math.floor(i / $listLength);
        $list.eq(i).stop().delay(i*$opction.delay).animate({top:numTop, left:numLeft}, $opction.speed);
    };

    $wrap.css({width:$wrapWidth, height:($heightLength+1)*$listHeight});
};

$(window).on("resize", function(){
    clearTimeout($timeId);
    $timeId = setTimeout(function(){
        resizeList()
    }, 300);
});

$(window).trigger("resize");


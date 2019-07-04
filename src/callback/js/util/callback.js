class CallbackTest {
    constructor(opts) {
        this.opts = $.extend({
            el:"#element"
        }, opts);

        this.$el = $(this.opts.el);
    };

    squareAnimate(event, callback){
        if(event=="start") this.endCallback(callback);
        this.$el.stop().animate({opacity:0}, 2000, ()=>{
            this.$el.css({opacity:1});
            if(event=="end")this.endCallback(callback);
        });
    };

    endCallback(callback){
        if (callback && typeof ( callback ) == "function" ) callback();
    };

}

export default CallbackTest;
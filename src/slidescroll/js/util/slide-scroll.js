class SlideScroll{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#contents"
        }, opts);

        this.$el = $(this.opts.el);
        this.$header = this.$el.find("[data-header]");
        this.$cover = this.$el.find("[data-cover]");
        this.$wrap = this.$cover.find("[data-sec='wrap']");
        this.$btn = this.$el.find("[data-btn]");
        this.currStr = "";

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
        this.resize();
    }

    _settings(){
        TweenMax.set(this.$header, {x:"0%"});
        TweenMax.set(this.$cover, {x:"100%"});
        this.currStr = "slide";
    }

    _controls(){
        this.$btn.on("click", (evt)=>{
            this.action(evt);
        });
    }

    resize(){
        $(window).on("resize", ()=>{
            if(this.currStr==="slide") return;
            TweenMax.set(this.$el, {height:this.heightSet(this.$wrap)});
        });
    }

    heightSet(ele){
        let eleHeight = "";
        if(ele===this.$wrap){
            if($(window).height()>ele.height()){
                eleHeight = "";
            }else{
                eleHeight = ele.height();
            }
        }
        return eleHeight;
    }

    action(evt){
        switch(evt.target.dataset.btn){
            case "slide":
                this.slideAnimation("back");
                break;
            case "back":
                this.slideAnimation("slide");
                break;
        }
    }

    slideAnimation(str){
        let headerX = (str==="back") ? "-100%" : "0%" ;
        let secX = (str==="back") ? "0%" : "100%" ;

        TweenMax.set(this.$el, {height:""});
        TweenMax.to([this.$header, this.$cover], 0.3, {scaleX:0.95, scaleY:0.9, onComplete:()=>{
                TweenMax.to(this.$header, 0.8, {x:headerX, onComplete:()=>{
                        this.contentsSet(str);
                    }
                });
                TweenMax.to(this.$cover, 0.8, {x:secX});
            }
        });
        this.currStr = str;
    }

    contentsSet(str){
        let conHeight;
        switch (str) {
            case "back":
                conHeight = this.heightSet(this.$wrap);
                break;
            case "slide":
                conHeight = "";
                break;
        }

        TweenMax.set(this.$el, {height:conHeight});
        TweenMax.to([this.$header, this.$cover], 0.3, {scale:1.0});
    }
}

export default SlideScroll;
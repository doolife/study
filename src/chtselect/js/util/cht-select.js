class ChtSelect{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#contents"
        }, opts);

        this.$el = $(this.opts.el);
        this.$wrap = this.$el.find("[data-cht-wrap]");
        this.$cover = this.$el.find("[data-cht-cover]");
        this.$list = this.$cover.find("[data-select]");
        this.$role = this.$wrap.find("[data-role]");
        this.$roleWrap = this.$wrap.find("[data-list-wrap]");
        this.listArr = [];

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
    }

    _settings(){
        $.each(this.$list,(idx, el)=>{
            this.listArr[idx] = $(el).data("select");
        });
    }

    _controls(){
        let context = this;
        this.$list.on("mouseenter",function(){
            let index = $(this).index();
            context.select(index);
        });
        this.$cover.on("mouseleave",function(){
            context.reset();
        });
    }

    select(num){
        let selectCht = [], roleCht = [], findCht = [];
        for (let i=0, len=this.$list.length ; i<len ; i++ ){
            if(num==i){
                selectCht[i] = {zIndex:2};
                roleCht[i] = {zIndex:2};
                findCht[i] = {x:0, scale:1.1};
            }else if(num>i){
                selectCht[i] = {zIndex:1};
                roleCht[i] = {zIndex:1};
                findCht[i] = {x:-50, scale:1};
            }else{
                selectCht[i] = {zIndex:1};
                roleCht[i] = {zIndex:1};
                findCht[i] = {x:50, scale:1};
            }
            TweenMax.to(this.$wrap.find(`[data-role=${this.listArr[i]}]`), 0.3, roleCht[i]);
            TweenMax.to(this.$wrap.find(`[data-role=${this.listArr[i]}]`).find("[data-list-wrap]"), 0.3, findCht[i]);
        };
    }

    reset(){
        TweenMax.to(this.$list, 0.3, {zIndex:1});
        TweenMax.to(this.$role, 0.3, {zIndex:1});
        TweenMax.to(this.$roleWrap, 0.3, {x:0, scale:1});
    }
}

export default ChtSelect;
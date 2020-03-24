class Movingslider{
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#slider1",
            idx:0
        }, opts);

        this.$el = $(this.opts.el);
        this.$btn = $(this.opts.el).find("[data-btn]");
        this.$cover = $(this.opts.el).find("[data-cover]");
        this.$wrap = $(this.opts.el).find("[data-wrap]");
        this.$list = this.$wrap.find("[data-list]");
        this.$listCon;
        this.$slideList;

        this.currNum = this.opts.idx+this.opts.total;
        this.prevNum;
        this.isAni = true;
        this.len;

        this.init();
    };

    init(){
        this.clones();
        this.settings();
        this.constrols();
        this.moving();
    };

    settings(){
        this.$slideList = this.$wrap.find(".moving-slider__list");
        this.$listCon = this.$slideList.find(".moving-slider__con");
        this.len = this.$slideList.length;
    };

    clones(){
        let firstClone = [];
        let lastClone = [];
        for(let i=0, len=this.opts.total ; i<len ; i++ ){
            firstClone = this.$list.eq(i).clone();
            this.$wrap.append(firstClone);
        };
        for(let i=1, len=this.opts.total+1 ; i<len ; i++ ){
            lastClone = this.$list.eq(this.$list.length-i).clone();
            this.$wrap.prepend(lastClone);
        };
    };

    constrols(){
        let context = this;
        this.$btn.on("click", function(evt){
            context.separately(evt);
        });
    };

    separately(evt){
        if(!this.isAni) return;
        if($(evt.target).data("btn")==="prev") this.currNum = this.currNum-1;
        if($(evt.target).data("btn")==="next") this.currNum = this.currNum+1;
        this.moving();
    };

    moving(){
        this.isAni = false;
        this.slideSet(true);
        this.$wrap.stop().animate({left:-(this.currNum-2)*100}, 500, ()=>{
            this.endCall();
            this.slideSet(false);
            this.isAni = true;
        });
    };

    endCall(){
        let cycle = (this.currNum===(this.opts.total-1) || this.currNum===this.len-this.opts.total);
        if(cycle) this.currNum = (this.currNum===(this.opts.total-1)) ? this.len-(this.opts.total+1) : this.opts.total;
        this.$wrap.css({left:-(this.currNum-2)*100});
    }

    slideSet(str){
        let aniObjsmall = {marginTop:-100/2+"px", marginLeft:-100/2+"px", width:"100px", height:"100px"};
        let aniObjLarge = {marginTop:-300/2+"px", marginLeft:-300/2+"px", width:"300px", height:"300px"};
        if(str){
            this.$slideList.stop().animate({width:"100px"}, 500);
            this.$slideList.eq(this.currNum).stop().animate({width:"300px"}, 500);
            this.$slideList.find(this.$listCon).stop().animate(aniObjsmall, 500);
            this.$slideList.eq(this.currNum).find(this.$listCon).stop().animate(aniObjLarge, 500);
        }else{
            this.$slideList.css({width:"100px"});
            this.$slideList.eq(this.currNum).css({width:"300px"});
            this.$slideList.find(this.$listCon).css(aniObjsmall);
            this.$slideList.eq(this.currNum).find(this.$listCon).css(aniObjLarge);
        }
    }

    set reset(num){
        this.currNum = num+this.opts.total;
        this.moving();
    }
};

export default Movingslider;
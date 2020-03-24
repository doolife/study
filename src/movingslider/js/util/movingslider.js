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
        let firstClone1 = this.$list.eq(0).clone();
        let firstClone2 = this.$list.eq(1).clone();
        let firstClone3 = this.$list.eq(2).clone();
        let firstClone4 = this.$list.eq(3).clone();
        let lastClone1 = this.$list.eq(this.$list.length-1).clone();
        let lastClone2 = this.$list.eq(this.$list.length-2).clone();
        let lastClone3 = this.$list.eq(this.$list.length-3).clone();
        let lastClone4 = this.$list.eq(this.$list.length-4).clone();
        this.$wrap.append(firstClone1);
        this.$wrap.append(firstClone2);
        this.$wrap.append(firstClone3);
        this.$wrap.append(firstClone4);
        this.$wrap.prepend(lastClone1);
        this.$wrap.prepend(lastClone2);
        this.$wrap.prepend(lastClone3);
        this.$wrap.prepend(lastClone4);
    }

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
        let cycle = (this.currNum===3 || this.currNum===this.len-4);
        if(cycle) this.currNum = (this.currNum===3) ? this.len-5 : 4;
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
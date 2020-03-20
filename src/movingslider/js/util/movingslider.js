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

        this.currNum;
        this.prevNum;

        this.init();
    };

    init(){
        this.settings();
        this.constrols();
    };

    settings(){
        this.$list.each((index, element)=>{
            if(index===this.opts.active){
                $(element).addClass("moving-slider__list--on");
            }
        });
    };

    constrols(){
        let context = this;
        this.$btn.on("click", function(evt){
            context.separately(evt);
        });
    };

    separately(evt){
        this.currNum = this.currNum+1;
        console.log(this.currNum)
        // if($(evt.target).data("btn")==="prev") this.currNum = this.currNum-1;
        // if($(evt.target).data("btn")==="next") this.currNum = this.currNum+1;
        // this.display();
    };

    display(){
        console.log(this.currNum)
    }

    moving(num){
        console.log(num)
    }

    set reset(currId){
        console.log(currId)
    }
};

export default Movingslider;
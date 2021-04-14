import * as PIXI from "pixi.js";

class Pixiloader{
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#element",
            add:{},
            complete:()=>{

            }
        }, opts);

        this.$el = document.querySelector(this.opts.el);
        this.loader = new PIXI.Loader();
        this.sprites = {};

        this.init();
    }

    init(){
        $.each(this.opts.add, (key, value)=>{
            this.loader.add(key, value);
        });

        this.loader.load((loader, resources) => {
            $.each(resources, (key, value)=>{
                this.sprites[key] = new PIXI.Sprite.from(resources[key].texture);
            });
        });

        this.loader.onComplete.add(() => {
            this.opts.complete();
        });
    }
}

export default Pixiloader;
import '../sass/index.scss';
import {resizeCanvas, resizeContents} from "./module/resizeCanvas";
import Pixiloader from "./module/pixi-loader";
import {PixiPlugin} from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";
import {ZoomBlurFilter} from '@pixi/filter-zoom-blur';
import {MotionBlurFilter} from '@pixi/filter-motion-blur';
import {ShockwaveFilter} from '@pixi/filter-shockwave';
import {gsap} from "gsap";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const pixiLoader = new Pixiloader({
    el:"#image-filter",
    add:{
        bg:'https://wstatic-cdn.plaync.com/promo/aion/history/2020/200408_secret/img/pvp/pvp-bg1.jpg',
        chtTit:'https://wstatic-cdn.plaync.com/promo/aion/history/2021/210113_classic/img/shadow/tit.png',
        chtImg:'https://wstatic-cdn.plaync.com/promo/aion/history/2021/210113_classic/img/gift/con-img1.png'
    },
    filterEffect:{},
    size:{
        objWidth:window.innerWidth,
        objHeight:window.innerHeight,
        conWidth:2560,
        conHeight:1440
    },
    complete:()=>{
        setup();
    }
});

const basicAnimation = gsap.timeline({paused:true});

function setup(){
    // pixiLoader.opts.filterEffect.zoomBlurFilter =  new ZoomBlurFilter();
    // pixiLoader.opts.filterEffect.zoomBlurFilter.strength = 0.5;
    // pixiLoader.opts.filterEffect.zoomBlurFilter.center = [pixiLoader.opts.size.objWidth/2, pixiLoader.opts.size.objHeight/2];
    // pixiLoader.opts.filterEffect.zoomBlurFilter.innerRadius = 0;
    // pixiLoader.sprites.bg.filters = [pixiLoader.opts.filterEffect.zoomBlurFilter];

    pixiLoader.opts.filterEffect.shockwaveFilter =  new ShockwaveFilter();
    pixiLoader.opts.filterEffect.shockwaveFilter.wavelength = 231;
    pixiLoader.opts.filterEffect.shockwaveFilter.amplitude = 41;
    pixiLoader.opts.filterEffect.shockwaveFilter.brightness = 1.02;
    pixiLoader.opts.filterEffect.shockwaveFilter.radius = 2000;
    pixiLoader.opts.filterEffect.shockwaveFilter.time = 1;
    pixiLoader.opts.filterEffect.shockwaveFilter.speed = 900;
    pixiLoader.opts.filterEffect.shockwaveFilter.center = [pixiLoader.opts.size.objWidth/2, pixiLoader.opts.size.objHeight/2];
    pixiLoader.sprites.bg.filters = [pixiLoader.opts.filterEffect.shockwaveFilter];
    pixiLoader.app.stage.addChild(pixiLoader.sprites.bg);

    pixiLoader.scene = new PIXI.Container();
    pixiLoader.scene.x = (pixiLoader.opts.size.objWidth - pixiLoader.opts.size.conWidth)/2;
    pixiLoader.scene.y = (pixiLoader.opts.size.objHeight - pixiLoader.opts.size.conHeight)/2;
    pixiLoader.app.stage.addChild(pixiLoader.scene);

    // pixiLoader.sprites.chtTit.x = 864;
    // pixiLoader.sprites.chtTit.y = 266;
    pixiLoader.sprites.chtTit.x = (pixiLoader.opts.size.conWidth - pixiLoader.sprites.chtTit.width)/2;
    pixiLoader.sprites.chtTit.y = (pixiLoader.opts.size.conHeight - pixiLoader.sprites.chtTit.height)/2 - 150;

    // pixiLoader.sprites.chtImg.x = 1101;
    // pixiLoader.sprites.chtImg.y = 290;
    pixiLoader.sprites.chtImg.x = (pixiLoader.opts.size.conWidth - pixiLoader.sprites.chtImg.width)/2;
    pixiLoader.sprites.chtImg.y = (pixiLoader.opts.size.conHeight - pixiLoader.sprites.chtImg.height)/2 + 150;

    pixiLoader.scene.addChild(pixiLoader.sprites.chtTit, pixiLoader.sprites.chtImg);

    // animation
    basicAnimation
        // .fromTo(pixiLoader.sprites.bg.filters, 2, {pixi: {strength:0.5}}, {pixi: {strength:0}}, "+=0.55")
        .set(pixiLoader.sprites.bg.filters, {wavelength:0}, "+=0.55")
        .fromTo(pixiLoader.sprites.bg.filters, 5, {pixi: {wavelength:230, time:0}}, {pixi: {time:1.5}}, "-=0.0")
        .from(pixiLoader.sprites.chtTit, 1, {alpha:0, pixi: {brightness:10}}, "-=3.0")
        .from(pixiLoader.sprites.chtImg, 1, {alpha:0, pixi: {brightness:10}},"-=2.2");
    basicAnimation.play();

    resize();
}

function resize(){
    $(window).on("resize", ()=>{
        pixiLoader.opts.size.objWidth =  window.innerWidth;
        pixiLoader.opts.size.objHeight = window.innerHeight;
        resizeCanvas(pixiLoader.sprites.bg, pixiLoader.opts.size.objWidth, pixiLoader.opts.size.objHeight, pixiLoader.opts.size.conWidth, pixiLoader.opts.size.conHeight);
        resizeContents(pixiLoader.scene, pixiLoader.opts.size.objWidth, pixiLoader.opts.size.objHeight, pixiLoader.opts.size.conWidth, pixiLoader.opts.size.conHeight, false);
        pixiLoader.app.renderer.resize(pixiLoader.opts.size.objWidth, pixiLoader.opts.size.objHeight);
        pixiLoader.opts.filterEffect.shockwaveFilter.center = [pixiLoader.opts.size.objWidth/2, pixiLoader.opts.size.objHeight/2];
    }).resize();
}
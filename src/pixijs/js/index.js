import '../sass/index.scss';
import {resizeCanvas, resizeContents} from "./module/resizeCanvas";
import {PixiPlugin} from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";
import {ZoomBlurFilter} from '@pixi/filter-zoom-blur';
import {MotionBlurFilter} from '@pixi/filter-motion-blur';
import {ShockwaveFilter} from '@pixi/filter-shockwave';
import {gsap} from "gsap";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const loader = PIXI.Loader.shared;
const sprites = {};

loader.add('bg', 'https://wstatic-cdn.plaync.com/promo/aion/history/2020/200408_secret/img/pvp/pvp-bg1.jpg')
    .add('chtTit', 'https://wstatic-cdn.plaync.com/promo/aion/history/2021/210113_classic/img/shadow/tit.png')
    .add('chtImg', 'https://wstatic-cdn.plaync.com/promo/aion/history/2021/210113_classic/img/gift/con-img1.png');

loader.load((loader, resources) => {
    sprites.bg = new PIXI.Sprite.from(resources.bg.texture);
    sprites.chtTit = new PIXI.Sprite.from(resources.chtTit.texture)
    sprites.chtImg = new PIXI.Sprite.from(resources.chtImg.texture);
});

loader.onComplete.add(() => {
    setup();
});

function setup(){
    let objId = document.querySelector('#image-filter');
    let objCanvas = {
        view:objId,
        filterEffect:{},
        bg:sprites.bg,
        chtTit:sprites.chtTit,
        chtImg:sprites.chtImg,
        opts:{
            objWidth:window.innerWidth,
            objHeight:window.innerHeight,
            conWidth:1920,
            conHeight:1080
        }
    };

    objCanvas.app = new PIXI.Application({transparent:true});
    objCanvas.view.appendChild(objCanvas.app.view);

    // objCanvas.filterEffect.zoomBlurFilter =  new ZoomBlurFilter();
    // objCanvas.filterEffect.zoomBlurFilter.strength = 0.5;
    // objCanvas.filterEffect.zoomBlurFilter.center = [objCanvas.opts.objWidth/2, objCanvas.opts.objHeight/2];
    // objCanvas.filterEffect.zoomBlurFilter.innerRadius = 0;
    // objCanvas.bg.filters = [objCanvas.filterEffect.zoomBlurFilter];

    objCanvas.filterEffect.shockwaveFilter =  new ShockwaveFilter();
    objCanvas.filterEffect.shockwaveFilter.wavelength = 231;
    objCanvas.filterEffect.shockwaveFilter.amplitude = 41;
    objCanvas.filterEffect.shockwaveFilter.brightness = 1.02;
    objCanvas.filterEffect.shockwaveFilter.radius = 2000;
    objCanvas.filterEffect.shockwaveFilter.time = 1;
    objCanvas.filterEffect.shockwaveFilter.speed = 900;
    objCanvas.filterEffect.shockwaveFilter.center = [objCanvas.opts.objWidth/2, objCanvas.opts.objHeight/2];
    objCanvas.bg.filters = [objCanvas.filterEffect.shockwaveFilter];
    objCanvas.app.stage.addChild(objCanvas.bg);

    objCanvas.scene = new PIXI.Container();
    objCanvas.scene.x = (objCanvas.opts.objWidth - objCanvas.opts.objWidth)/2;
    objCanvas.scene.y = (objCanvas.opts.objHeight - objCanvas.opts.objHeight)/2;
    objCanvas.app.stage.addChild(objCanvas.scene);

    objCanvas.chtTit.x = objCanvas.opts.conWidth/2 - 432;
    objCanvas.chtTit.y = objCanvas.opts.conHeight/2 - 133 - 150;

    objCanvas.chtImg.x = objCanvas.opts.conWidth/2 - 550;
    objCanvas.chtImg.y = objCanvas.opts.conHeight/2 - 145 + 150;

    objCanvas.scene.addChild(objCanvas.chtTit, objCanvas.chtImg);

    // animation
    const basicAnimation = gsap.timeline({paused:true})
        // .fromTo(objCanvas.bg.filters, 2, {pixi: {strength:0.5}}, {pixi: {strength:0}})
        .set(objCanvas.bg.filters, {wavelength:0})
        .fromTo(objCanvas.bg.filters, 5, {pixi: {wavelength:230, time:0}}, {pixi: {time:1.5}}, "+=1.0")
        .from(objCanvas.chtTit, 1, {alpha:0, pixi: {brightness:10}}, "-=3.0")
        .from(objCanvas.chtImg, 1, {alpha:0, pixi: {brightness:10}},"-=0.6");
    basicAnimation.play();

    $(window).on("resize", function(){
        objCanvas.opts.objWidth =  window.innerWidth;
        objCanvas.opts.objHeight = window.innerHeight;
        resizeCanvas(objCanvas.bg, objCanvas.opts.objWidth, objCanvas.opts.objHeight, objCanvas.opts.conWidth, objCanvas.opts.conHeight);
        resizeContents(objCanvas.scene, objCanvas.opts.objWidth, objCanvas.opts.objHeight, objCanvas.opts.conWidth, objCanvas.opts.conHeight, false);
        objCanvas.app.renderer.resize(objCanvas.opts.objWidth, objCanvas.opts.objHeight);
    }).resize();
}
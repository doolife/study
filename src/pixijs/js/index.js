import '../sass/index.scss';
import resizeCanvas from "./module/resizeCanvas";
import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {PixiPlugin} from "gsap/PixiPlugin";

let canvas = document.querySelector("[data-filter='image1']");
const filter = new PIXI.filters.ColorMatrixFilter();
const app = new PIXI.Application({
    // width:window.innerWidth,
    // height:window.innerHeight,
    // resolution:window.devicePixelRatio,
    // autoResize:true,
    transparent:true,
    // backgroundColor:0x1099bb,
});

canvas.appendChild(app.view);

const imgCht = PIXI.Sprite.from('https://wstatic-cdn.plaync.com/promo/aion/history/2020/200408_secret/img/pvp/pvp-bg1.jpg');
app.stage.addChild(imgCht);
imgCht.filters = [filter];

gsap.to(filter, 5, {brightness:3});

$(window).on("resize", function(){
    let pw =  document.querySelector('#image-filter').clientWidth;
    let ph = document.querySelector('#image-filter').clientHeight;
    resizeCanvas(imgCht, pw, ph);
    app.renderer.resize(pw, ph);
    app.render();
}).resize();
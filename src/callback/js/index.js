import '../sass/index.scss';
import callbackTest from "./util/callback";

const square1 = new callbackTest({
    el:".square1"
});

const square2 = new callbackTest({
    el:".square2"
});

square1.endCallback = ()=>{
    console.log("callback!")
};

const customCallback1 = ()=>{
    console.log("애니메이션이 시작~")
};
const customCallback2 = ()=>{
    console.log("애니메이션이 끝남~")
};

document.querySelector(`${square1.opts.el}`).addEventListener("click", ()=>{
    square1.squareAnimate("end");
});

document.querySelector(`${square2.opts.el}`).addEventListener("click", ()=>{
    square2.squareAnimate("start", customCallback1);
    square2.squareAnimate("end", customCallback2);
});
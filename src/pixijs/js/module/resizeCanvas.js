const resizeCanvas = (sprite, appWidth, appHeight, objWidth, objHeight)=> {
    let widthRatio = appWidth / objWidth;
    let heightRatio = appHeight / objHeight;

    let widthDiff = heightRatio * objWidth;
    let heightDiff = widthRatio * objHeight;

    if(heightDiff>appHeight) {
        sprite.width = appWidth;
        sprite.height = heightDiff;
    } else {
        sprite.width = widthDiff;
        sprite.height = appHeight;
    }

    sprite.x = (appWidth-sprite.width)/2;
    sprite.y = (appHeight-sprite.height)/2;
}

const resizeContents = (sprite, appWidth, appHeight, conWidth, conheight, fixedY = false)=>{
    sprite.x = appWidth/2 - conWidth/2;
    if(!fixedY) sprite.y = appHeight/2 - conheight/2;
    return;
}

export {resizeCanvas, resizeContents};
const resizeCanvas = (sprite, objWidth, objHeight, conWidth, conHeight)=> {
    let widthRatio = objWidth / conWidth;
    let heightRatio = objHeight / conHeight;

    let widthDiff = heightRatio * conWidth;
    let heightDiff = widthRatio * conHeight;

    if(heightDiff>objHeight) {
        sprite.width = objWidth;
        sprite.height = heightDiff;
    } else {
        sprite.width = widthDiff;
        sprite.height = objHeight;
    }

    sprite.x = (objWidth-sprite.width)/2;
    sprite.y = (objHeight-sprite.height)/2;
    return;
};

const resizeContents = (sprite, objWidth, objHeight, conWidth, conHeight, fixedY)=>{
    sprite.position.x = (objWidth - conWidth)/2;
    if(!fixedY) sprite.position.y = (objHeight - conHeight)/2;
    return;
};

export {resizeCanvas, resizeContents};
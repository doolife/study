const resizeCanvas = (sprite, appWidth, appHeight)=> {
    let imgWidth = 1920;
    let imgHeight = 1080;

    let widthRatio = appWidth / imgWidth;
    let heightRatio = appHeight / imgHeight;

    let widthDiff = heightRatio * imgWidth;
    let heightDiff = widthRatio * imgHeight;

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

export default resizeCanvas;
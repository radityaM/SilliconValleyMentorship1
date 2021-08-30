class Menu{
    constructor(){
        imageTitle=createSprite(displayWidth/2,(displayHeight/2)-220);
        imageTitle.addImage(titleImg);
        imageTitle.scale=1.2;
    }
    display(){
        background(bg);

    }
}
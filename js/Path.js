class Path {
    constructor(x,y,w,h){
        this.body = createSprite(x,y,w,h);
        // this.body.shapeColor = "#75f542";
        // this.body.visible = false;
        this.width = w;
        this.height = h;
        this.image = loadImage("images/path.jpg");
    }

    display(){
        imageMode(CENTER);
        push();
        translate(this.body.x,this.body.y);
        image(this.image,0,0,this.width,this.height);
        pop();
    }
}
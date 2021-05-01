class PaperBall{
    constructor(x,y,r){
        var options = {
            restitution : 1
        }
        this.body = Bodies.circle(x,y,r,options);
        this.radius = r;
        World.add(world,this.body);
        this.Visibility = 255;
        this.image = loadImage("images/paperBall.png");
    }

    destroy(){
        push();
        World.remove(world,this.body);
        this.Visiblity = this.Visiblity - 5;
        tint(255, this.Visiblity);
        console.log(w);
        
        pop();
    }

    display(){
        
        var pos = this.body.position;
        ellipseMode(CENTER);
        imageMode (CENTER);
        push();
        translate(pos.x,pos.y);
        rotate(this.body.angle);
        // ellipse(0,0,this.radius*2,this.radius*2);
        image (this.image,0,0,this.radius*2.5,this.radius*2.5);
        pop();
    }
}
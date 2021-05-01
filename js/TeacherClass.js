class TeacherClass{
    constructor(x,y,w,h){
        var options = {
            isStatic : true,
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        this.width = w;
        this.height = h;
        this.image = loadImage("images/teacher.png");
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        rectMode(CENTER);
        imageMode(CENTER);
        push();
        translate(pos.x,pos.y);
        rect(0,0,this.width,this.height);
        image(this.image,20,0,this.width,this.height);
        pop();
    }
}
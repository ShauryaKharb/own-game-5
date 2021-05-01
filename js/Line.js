class Line{
    constructor(bodyA,pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.03,
            length: 10
        }
        this.line = Constraint.create(options);
        World.add(world , this.line);
        this.pointB = pointB;
    }

    fly(){
        this.line.bodyA = null;
    }

    attach(body){
        this.line.bodyA = body;
    }

    display(){

        if(this.line.bodyA){

        var bodyA = this.line.bodyA.position;
        var pointB = this.pointB;

        push();
        stroke("black");
        strokeWeight(1);
        line(bodyA.x,bodyA.y,pointB.x,pointB.y);
        pop();

        }
        
    }
}
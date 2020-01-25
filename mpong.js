let sketch = function(p) {
    p.MAX_SPEED = 10;
    p.setup = function() {
        p.createCanvas(800, 400);
        //frameRate(6);

        p.paddleA = p.createSprite(30, p.height/2, 10, 100);
        p.paddleA.immovable = true;

        p.paddleB = p.createSprite(p.width-28, p.height/2, 10, 100);
        p.paddleB.immovable = true;

        p.wallTop = p.createSprite(p.width/2, -30/2, p.width, 30);
        p.wallTop.immovable = true;

        p.wallBottom = p.createSprite(p.width/2, p.height+30/2, p.width, 30);
        p.wallBottom.immovable = true;

        p.ball = p.createSprite(p.width/2, p.height/2, 10, 10);
        p.ball.maxSpeed = p.MAX_SPEED;

        p.paddleA.shapeColor = p.paddleB.shapeColor = p.ball.shapeColor = p.color(255, 255, 255);

        p.ball.setSpeed(p.MAX_SPEED, -180);
    }
    
    p.draw = function(){
        p.background(0);

        p.paddleA.position.y = p.constrain(p.mouseY, p.paddleA.height/2, p.height-p.paddleA.height/2);
        p.paddleB.position.y = p.constrain(p.mouseY, p.paddleA.height/2, p.height-p.paddleA.height/2);

        p.ball.bounce(p.wallTop);
        p.ball.bounce(p.wallBottom);

        if(p.ball.bounce(p.paddleA)) {
            p.swing = (p.ball.position.y-p.paddleA.position.y)/3;
            p.ball.setSpeed(p.MAX_SPEED, p.ball.getDirection()+p.swing);
        }

        if(p.ball.bounce(p.paddleB)) {
            p.swing = (p.ball.position.y-p.paddleB.position.y)/3;
            p.ball.setSpeed(p.MAX_SPEED, p.ball.getDirection()-p.swing);
        }

        if(p.ball.position.x<0) {
            p.ball.position.x = p.width/2;
            p.ball.position.y = p.height/2;
            p.ball.setSpeed(p.MAX_SPEED, 0);
        }

        if(p.ball.position.x>p.width) {
            p.ball.position.x = p.width/2;
            p.ball.position.y = p.height/2;
            p.ball.setSpeed(p.MAX_SPEED, 180);
        }

        p.drawSprites();


    }
};
new p5(sketch, 'container');
new p5(sketch, 'container2');

class BlueBigSquare{
    constructor(ctx, screenwidth, screenheight){
    this._name = "BlueBigSquare"
    this._ctx = ctx
    this._width = 200
    this._height = 200
    this._posX = 0
    this._posY = 0
    this._velX = 0
    this._velY = 0
    this._screenWidth = screenwidth
    this._screenHeight = screenheight
    this._color = "lightgreen"

    this.generatePosition()
    this.generateSpeeds()

    }


    draw(){
        
        this._ctx.lineWidth = 1
        // this._ctx.shadowBlur = 10;
        // this._ctx.shadowColor = "blue"
        this._ctx.strokeStyle = this._color
        this._ctx.strokeRect(this._posX, this._posY, this._width, this._height)
    }

    move(){
        this._posX += this._velX
        this._posY += this._velY

    }

    generatePosition(){

        // setting X and Y coordinates such as they never appear inside the screen


        // first we set a random X coordinate
        this._posX = Math.random()*(this._screenWidth + 2*this._width) - this._width

        // if the x position is within the screen size, then the Y coordinate should be outside of the screen
        if(this._posX > 0 && this._posX < this._screenWidth){

            //random greater than .5 is a 50% chance. if true then the y coordinate should be on top of the screen, if false should br in the bottom
            Math.random() > .5 ? this._posY = 0 - this._height : this._posY = this._screenHeight
    
            // when x is lower than 0, x position is 0 - with so it is fully out of the scree, and Y takes any number
        } else if (this._posX < 0){

            this._posX = 0 - this._width
            this._posY = Math.random()*(this._screenHeight+2*this._height) -this._height

        }else{

            this._posY = Math.random()*(this._screenHeight+2*this._height) -this._height

        }
    }

    generateSpeeds(){


       //generate speeds 
        this._velX = Math.random()*2
        this._velY = Math.random()*2


        //adjust speeds depending on the location of the enemy

        if(this._posX < this._screenWidth/2 && this._posY < this._screenHeight/2){
            this._velX = this._velX
            this._velY = this._velY

        }else if(this._posX > this._screenWidth/2 && this._posY < this._screenHeight/2){
            this._velX *= -1
        }else if(this._posX < this._screenWidth/2 && this._posY > this._screenHeight/2){
            this._velY *= -1
        }else if(this._posX > this._screenWidth/2 && this._posY > this._screenHeight/2){
            this._velX *= -1
            this._velY *= -1
        }

        // console.log(`posicion x is ${this._posX} and position y is ${this._posY}`)
    }

}


//============================================================


class RedSmallSquare extends BlueBigSquare{
    constructor(ctx, screenwidth, screenheight, parentSquare){
        super(ctx, screenwidth, screenheight)
    
    this._name = "RedSmallSquare"
    this._width = 50
    this._height = 50
    this._posX = parentSquare._posX + parentSquare._width / 2
    this._posY = parentSquare._posY + parentSquare._height / 2
    this._velX = 0
    this._velY = 0
    this._color = "white"
    this._velocitycoeficient = 3

    this.generateSpeeds()
    this.updateSpeed()
    }


    draw(){
        
        this._ctx.lineWidth = 1
        this._ctx.strokeStyle = this._color
        this._ctx.strokeRect(this._posX, this._posY, this._width, this._height)
    }

    updateSpeed(){

        this._velX *=  this._velocitycoeficient
        this._velY *=  this._velocitycoeficient

    }

}


//=============================================================

class BossKids{
    constructor(ctx, screenwidth, screenheight, parentCircle){
        this._ctx = ctx
        this._screenWidth = screenwidth
        this._screenHeight = screenheight
        this._posX = parentCircle._posX
        this._posY = parentCircle._posY
        
        // this._posX = 800
        // this._posY = 800
        
        this._radius = 10

        this._velX = 0
        this._velY = 0

        this._colorA = Math.floor(Math.random()*255)
        this._colorB = Math.floor(Math.random()*255)
        this._colorC = Math.floor(Math.random()*255)

        this._color = `rgb(${this._colorA.toString()}, ${this._colorB.toString()}, ${this._colorC.toString()})`

        this.generateSpeeds()

    }


    draw(){  
            this._ctx.beginPath()
            this._ctx.lineWidth = 3
            this._ctx.strokeStyle = this._color
            this._ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            this._ctx.arc(this._posX, this._posY, this._radius, 0, Math.PI * 2);
            this._ctx.fill();
            this._ctx.stroke()

    }


    move(){
        this._posX += this._velX
        this._posY += this._velY
    }

    generateSpeeds(){


        //generate speeds 
         this._velX = - Math.random()*5
         this._velY =  Math.random() > 0.5 ? -Math.random()*5 : Math.random()*5
 
 
         //adjust speeds depending on the location of the enemy
 
         if(this._posX < this._screenWidth/2 && this._posY < this._screenHeight/2){
             this._velX = this._velX
             this._velY = this._velY
 
         }else if(this._posX > this._screenWidth/2 && this._posY < this._screenHeight/2){
             this._velX *= -1
         }else if(this._posX < this._screenWidth/2 && this._posY > this._screenHeight/2){
             this._velY *= -1
         }else if(this._posX > this._screenWidth/2 && this._posY > this._screenHeight/2){
             this._velX *= -1
             this._velY *= -1
         }
 
     }
}
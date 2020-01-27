class BlueBigSquare{
    constructor(ctx, screenwidth, screenheight){
    this._ctx = ctx
    this._width = 200
    this._height = 200
    this._posX = 0
    this._posY = 0
    this._velX = 0
    this._velY = 0
    this._screenWidth = screenwidth
    this._screenHeight = screenheight

    this.generateSpecs()
    }


    draw(){
        
        this._ctx.lineWidth = 1
        this._ctx.strokeStyle = 'blue'
        this._ctx.strokeRect(this._posX, this._posY, this._width, this._height)
    }

    move(){
        this._posX += this._velX
        this._posY += this._velY

    }

    generateSpecs(){

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

        console.log(`posicion x is ${this._posX} and position y is ${this._posY}`)


    }

}
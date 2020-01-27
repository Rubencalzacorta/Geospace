class BlueBigSquare{
    constructor(ctx, screenwidth, screenheight){
    this._ctx = ctx
    this._width = 200;
    this._height = 200
    this._posX = 50
    this._posY = 50
    this._velX = 10
    this._velY = 10
    this._screenWidth = screenwidth
    this._screenHeight = screenheight

    this.generateSpecs()
    }


    draw(){
        
        this.move()
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

        this._posX = Math.random()*(this._screenWidth + 2*this._width) - this._width

        if(this._posX > 0 && this._posX < this._screenWidth){

            Math.random() > .5 ? this._posY = 0 - this._width : this._posY = this._screenWidth
    

        } else if (this._posX < 0){

            this._posX = 0 - this._width
            this._posY = Math.random()*(this._screenHeight+2*this._height) -this._height

        }else{

            this._posY = Math.random()*(this._screenHeight+2*this._height) -this._height

        }


        this._velX = Math.random()*2
        this._velY = Math.random()*2

        console.log(`posicion x is ${this._posX} and position y is ${this._posY}`)


    }

}
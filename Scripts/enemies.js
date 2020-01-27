class BlueBigSquare{
    constructor(ctx, screenwidth, screenheight){
    this._ctx = ctx
    this._width = 200;
    this._height = 200
    this._posX = 50
    this._posY = 50
    this._velX = 10
    this._velY = 10

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




        this._velX = Math.random()*2
        this._velY = Math.random()*2



    }

}
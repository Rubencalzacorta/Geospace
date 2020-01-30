class Boss1{
    constructor(ctx, screenwidth, screenheight){
    this._ctx = ctx
    this._screenWidth = screenwidth
    this._screenHeight = screenheight
    this._radius = screenheight/3
    this._posX = this._screenWidth + this._radius
    this._posY = this._screenHeight / 2

    this._velX = -.5
    this._velY = 0
    this._color = "orange"
    this._life = 20
    this._isHit = true
    

    }

    draw(){

        if(this._isHit){
        this._ctx.beginPath()
        this._ctx.lineWidth = 10
        this._ctx.strokeStyle = "white"
        this._ctx.fillStyle = "rgba(0, 0, 0, 0.50)";
        this._ctx.arc(this._posX, this._posY, this._radius, 0, Math.PI * 2);
        this._ctx.fill();
        this._ctx.stroke()

        this._isHit = false


        }else{
       
        this._ctx.beginPath()
        this._ctx.lineWidth = 2
        this._ctx.strokeStyle = this._color
        this._ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        this._ctx.arc(this._posX, this._posY, this._radius, 0, Math.PI * 2);
        this._ctx.fill();
        this._ctx.stroke()
   

         }

    }

    move(){

        this._posX += this._velX
        this._posY += this._velY


    }

    hit(){
        this._life --
        this._isHit = true
    }

    lifeBar(){


        
    }


}





class Bullet {
    constructor(ctx, heroShipX, heroShipY, heroShipWidth, heroShipHeight, targetPosX, targetPosY){
        this._ctx = ctx
        this._heroShipX = heroShipX
        this._heroShipY = heroShipY
        this._targetPosX = targetPosX
        this._targetPosY = targetPosY 

        
        this._bulletPosX = this._heroShipX + heroShipWidth/2
        this._bulletPosY = this._heroShipY + heroShipHeight/2
     

        this._bulletRadius = 4
        
        // this._slope = (this._heroShipY - this._targetPosY)/( this._heroShipX - this._targetPosX )
        
        this._bulletDir = Math.atan2( this._targetPosY - this._heroShipY ,  this._targetPosX - this._heroShipX )


        this._velX = 7*Math.cos(this._bulletDir)
        this._velY = 7*Math.sin(this._bulletDir)

    }

    updateVelocity(){

        // let slope = (this._heroShip._posY - this.targetPosY)/(this._heroShip._posX - this.targetPosX)

    }

    move(){

        this._bulletPosX += this._velX

        this._bulletPosY += this._velY
    }


    draw(){
        
        this._ctx.beginPath()
        this._ctx.fillStyle = "red";
        this._ctx.arc(this._bulletPosX, this._bulletPosY, this._bulletRadius, 0, Math.PI * 2);
        this._ctx.fill();
        this._ctx.closePath()
    }


}
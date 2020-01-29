class Bullet {
    constructor(ctx, heroShipX, heroShipY, heroShipWidth, heroShipHeight, targetPosX, targetPosY, counter){
        this._ctx = ctx
        this._heroShipX = heroShipX
        this._heroShipY = heroShipY
        this._targetPosX = targetPosX
        this._targetPosY = targetPosY 

        
        this._bulletPosX = this._heroShipX + heroShipWidth/2
        this._bulletPosY = this._heroShipY + heroShipHeight/2
     

        this._bulletWidth = 20
        this._bulletHeight = 20

        this._bulletRadius = 4
        
        // this._slope = (this._heroShipY - this._targetPosY)/( this._heroShipX - this._targetPosX )
        
        this._bulletDir = Math.atan2( this._targetPosY - this._heroShipY ,  this._targetPosX - this._heroShipX )


        this._velX = 4*Math.cos(this._bulletDir)
        this._velY = 5*Math.sin(this._bulletDir)

        this._counter = counter

        this._image = new Image()
        this._image.src = "../images/bullet/bulletSprite.png"

        this._image.frames = 14
        this._image.framesIndex = 0

        

    }

    updateVelocity(){

        // let slope = (this._heroShip._posY - this.targetPosY)/(this._heroShip._posX - this.targetPosX)

    }

    move(){

        this._bulletPosX += this._velX

        this._bulletPosY += this._velY

        this._velX *= 1.02
        this._velY *= 1.02

    }


    draw(){
        
        console.log(this._image)
        console.log( this._image.framesIndex * Math.floor(this._image.width / this._image.frames))
        console.log(Math.floor(this._image.width / this._image.frames))
        console.log(this._image.height)
        console.log(this._bulletPosX)
        console.log(this._bulletPosY)
        console.log(this._bulletWidth)
        console.log(this._bulletHeight)
        
        
        
        
        
        
        this._ctx.drawImage(
            this._image,
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames),
            0,
            Math.floor(this._image.width / this._image.frames),
            this._image.height,
            this._bulletPosX,
            this._bulletPosY,
            this._bulletWidth,
            this._bulletHeight          
            )
            
            
            this.animate()
        }
        
        animate() {

        this._counter % 3 == 0 ? this._image.framesIndex++ : null

        this._image.framesIndex > this._image.frames ? this._image.framesIndex = 0 : null

        this._counter ++
    }
    


}
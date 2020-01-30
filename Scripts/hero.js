class Hero {
        constructor(ctx,keys, mouse, screenWidth, screenHeight, counter){
        this._ctx = ctx
        this._screenWidth = screenWidth
        this._screenHeight = screenHeight
        this._shipX= 200
        this._shipY= 200,
        this._height= 50,
        this._width= 50,
        this._velX = 0,
        this._velY= 0,
        this._acceleration= 0.1
        this._image = new Image()
        this._image.src = "/images/heroship/ovni.png"
        this._keys = keys
        this._counter = counter
        this._bulletReady = true

        this._bullets = []
        this._mouse = mouse
        this._isCollision = false
        
        this._lifes = 3

        }


    drawHero() {

        //drawing the image including the movement. 
        this._ctx.drawImage(this._image, this._shipX, this._shipY, this._width, this._height)
        this._bullets.forEach(bullet => bullet.draw())        
    }

    moveHero(){

        //changing acceleration depending on the keys being held down
        this._keys.aIsDown? this._velX -= this._acceleration : null ;
        this._keys.dIsDown? this._velX += this._acceleration : null ;
        this._keys.wIsDown? this._velY -= this._acceleration : null ;
        this._keys.sIsDown? this._velY += this._acceleration : null ;

        //move the ships position
        
        // this.heroShip.shipX >= 0 && this.heroShip.shipX <= this.canvas.width ? this.heroShip.shipX += this.heroShip.velX : this.heroShip.velX = 0

        // this.heroShip.shipY >= 0 && this.heroShip.shipY <= this.canvas.height ? this.heroShip.shipY += this.heroShip.velY : this.heroShip.velY = 0

        //left side of the screen limit
        if(this._shipX >= 0){
            this._shipX += this._velX 
        }else {
            this._velX = 0
            this._shipX = 1
        }

        //right side of screen limit
        if(this._shipX + this._width <= this._screenWidth){
            this._shipX += this._velX 
        }else {
            this._velX = 0
            this._shipX = this._screenWidth - this._width - 1
        }

        //top limit of the screen
        if(this._shipY >= 0){
            this._shipY += this._velY
        } else {
            this._velY = 0
            this._shipY = 1
        }

        //bottom limit of the screen
        if(this._shipY + this._height < this._screenHeight){
            this._shipY += this._velY
        }else {
            this._velY = 0
            this._shipY = this._screenHeight - this._height -1
        }


        //move bullet
        this._bullets.forEach(bullet => bullet.move())

    }

        shoot(){
            
            this._bullets.push(new Bullet(this._ctx,this._shipX, this._shipY, this._width, this._height, this._mouse.posX, this._mouse.posY, this._counter))
        
        
        }

        reset(){
            this._lifes -= 1
            this._shipX = this._screenWidth / 2
            this._shipY = this._screenWidth / 2
            this._velX = 0
            this._velY = 0
        }

}
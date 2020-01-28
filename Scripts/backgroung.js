class Background {
    constructor(ctx, posX, posY, width, height){
        this._ctx = ctx
        this._posY = posY
        this._posX = posX
        this._height = height
        this._width = width
        this._image = new Image()
        this._image.src = "../images/BackGorund/bg_milkyway.jpg"


        //stars details
        this._numberOfStars =300
        this._starsPosX = []
        this._starsPosY = []
        this._starsRadius =[]

        this._starsSpeedX = []
        this._starsSpeedY = []


        this.generateStars()
    }

    draw(){
        
        //drawing image
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
        
        //drawing rectangle with opacity to darken the image 
        this._ctx.fillStyle = "rgba(0, 0, 0, 0.85)"
        this._ctx.fillRect(0,0,this._width, this._height)

        //drawing the stars
        this.drawStars()

        
    }

    generateStars(){

        //generating X, Y and radius values for the star set. 
        for(let i = 0; i < this._numberOfStars; i++){

            this._starsPosX.push(Math.floor(Math.random()*this._width))

            this._starsPosY.push(Math.floor(Math.random()*this._height))

            this._starsRadius.push(Math.random()*1.2)

            this._starsSpeedX.push(Math.random()*.25)

            this._starsSpeedY.push(Math.random()*.12)
        }
    }

    moveStars() {
        for(let i = 0; i < this._numberOfStars; i++ ){



            this._starsPosX[i] < this._width ?  this._starsPosX[i] += this._starsSpeedX[i] : this._starsPosX[i] = -20
            // this._starsPosX[i] += this._starsSpeedX[i]

            this._starsPosY[i] < this._height ?  this._starsPosY[i] += this._starsSpeedY[i] : this._starsPosY[i] = -20
            // this._starsPosY[i] += this._starsSpeedY[i]

        }
    }

    drawStars(){
        this.moveStars()

        for(let i = 0; i < this._numberOfStars; i ++){
            this._ctx.beginPath()
            this._ctx.fillStyle = "white";
            this._ctx.arc(this._starsPosX[i], this._starsPosY[i], this._starsRadius[i], 0, Math.PI * 2);
            this._ctx.fill();
            this._ctx.closePath()


    }
}


}
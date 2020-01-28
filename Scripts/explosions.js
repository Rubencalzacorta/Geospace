class Explosion{
    constructor(ctx, posX, posY, counter){
        this._ctx = ctx
        this._height = 100
        this._width = 100
        this._posX = posX - this._width/2
        this._posY = posY - this._height/2
        this._counter = counter
        this._image = new Image()
        this._image.src = "../images/explosions/mainexplosion.png"

        this._image.frames = 12
        this._image.framesIndex = 0

    }

    draw(){
        // console.log(this._ctx)

        // console.log(this._image)

        // console.log(this._image.framesIndex * Math.floor(this._image.width / this._image.frames))
        // console.log(Math.floor(this._image.width / this._image.frames))
        // console.log(this._image.height)

        // console.log(this._posX)

        // console.log(this._posY)
        // console.log(this._width)
        // console.log(this._height)







        this._ctx.drawImage(
            this._image,
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames),
            0,
            Math.floor(this._image.width / this._image.frames),
            this._image.height,
            this._posX,
            this._posY,
            this._width,
            this._height          
            )

            console.log(this._image.framesIndex)
            console.log(this._counter)

            this.animate()
        }

    animate() {
        if (this._counter % 3 == 0) {
          this._image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
          }
        this._counter ++
      }

}
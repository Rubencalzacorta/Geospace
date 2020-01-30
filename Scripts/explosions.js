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

            this.animate()
        }

    animate() {
        if (this._counter % 3 == 0) {
          this._image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
          }
        this._counter ++
      }

}
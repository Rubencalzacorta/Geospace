const Game = {
    canvas: undefined, 
    ctx: undefined,
    screenWidth: undefined,
    screenHeight: undefined, 
    fps : 60,
    counter: 0,
    enemySquares: [],
    keys: {
        W : 87,
        A: 65,
        S: 83,
        D: 68,
        Space: 32,
        arrowRight: 39,
        arrowLeft: 37, 
        arrowUp: 38,
        arrowDown: 40, 

        wIsDown: false,
        aIsDown : false, 
        sIsDown: false, 
        dIsDown: false, 
    },

    mouse:{
        posX: 0,
        posY: 0
    },

    isClick: false,

    heroShip:{
        shipX: 200,
        shipY: 200,
        height: 30,
        width: 20,
        velX : 0,
        velY: 0,
        acceleration: 0.1,
    },


    init() {
        this.canvas = document.getElementById('myCanvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
        this.enventListeners()
    },

    start(){

        //start the hero
       this.heroShip = new Hero(this.ctx, this.keys, this.mouse ,this.canvas.width, this.canvas.height)
        
        // start the background
        this.background = new Background(this.ctx, 0 ,0 ,this.canvas.width, this.canvas.height)


        
        
        //game interval
        this.interval = setInterval(() => {
            
            //add to counter
            this.counter > 5000 ? this.counter = 0 : this.counter ++

            
            this.generateBigSquares()
            this.deleteBigSquares()

            console.log(`mouse x ${this.mouse.posX} and mouse y is ${this.mouse.posY}`)
            // console.log(this.enemySquares)
            

            this.clearScreen()

            this.moveAll()
            this.drawAll()            
            

            // console.log(`a is does? ${this.keys.aIsDown}, w is does? ${this.keys.wIsDown},d is does? ${this.keys.dIsDown},s is does? ${this.keys.sIsDown}`)

        }, 1000/this.fps);
    },


    moveAll(){

        this.enemySquares.forEach(elm => elm.move())
        this.heroShip.moveHero()

        

    },

    drawAll(){
        
        this.background.draw()
        this.heroShip.drawHero()
        this.enemySquares.forEach(elm => elm.draw())
        
    },



    clearScreen(){
        this.ctx.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
    },


    enventListeners(){

        // to be able to move in different directions we have to identify when the a key is being held down. 
        // as keypress event cant accept multiple keys simultaniously, we have to identify when each key was down, and when it was release
        //this way we can keep track of simultanious key

        //updating IsDown values to true when the key is pressed down
        document.onkeydown = e =>{
            switch(e.keyCode){
                case this.keys.W:
                    this.keys.wIsDown = true
                    break;
                case this.keys.A:
                    this.keys.aIsDown = true
                    break;
                case this.keys.S: 
                    this.keys.sIsDown = true
                    break;
                case this.keys.D: 
                    this.keys.dIsDown = true
                    break;
        }}

        //updating the IsDown values to false when keays are release. 
        document.onkeyup = e => {
            switch(e.keyCode){
                case this.keys.W:
                    this.keys.wIsDown = false
                    break;
                case this.keys.A:
                    this.keys.aIsDown = false
                    break;
                case this.keys.S: 
                    this.keys.sIsDown = false
                    break;
                case this.keys.D: 
                    this.keys.dIsDown = false
                    break;
        }
        }

        document.onclick = () => { this.mouse.posX = event.clientX;
             this.mouse.posY = event.clientY
            
             this.heroShip.shoot()
            }
        
       

    },

    generateBigSquares(){
        if(this.counter % 120 == 0 ){
        
        this.enemySquares.push(new BlueBigSquare(this.ctx,this.canvas.width, this.canvas.height))
    }},


    deleteBigSquares(){

        this.enemySquares.forEach((square, idx) => {
            if (square._posX <= -square._width -10 ||
                square._posX > this.canvas.width + square._width + 10 ||
                square._posY > this.canvas.height + square._height + 10 ||
                square._posY < 0 - square._height - 10 ) {
              this.enemySquares.splice(idx, 1);
            }
          })

    }
    


}
const Game = {
    canvas: undefined, 
    ctx: undefined,
    screenWidth: undefined,
    screenHeight: undefined, 
    fps : 60,
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

        

        this.interval = setInterval(() => {
            

            this.clearScreen()
            this.drawHero()

           

            console.log(`a is pressed ${this.keys.aIsDown} --- w is pressed ${this.keys.wIsDown} ---- d is down ${this.keys.dIsDown}---- s is down ${this.keys.sIsDown}`)



        }, 1000/this.fps);
    },




    drawHero() {

        //drawing the image including the movement. 
        this.image = new Image()
        this.image.src = "/images/heroship/ship stop.png"
        this.ctx.drawImage(this.image, this.heroShip.shipX, this.heroShip.shipY, this.heroShip.width, this.heroShip.height)
        this.moveHero()

    },

    moveHero(){

        //changing acceleration depending on the keys being held down
        this.keys.aIsDown? this.heroShip.velX -= this.heroShip.acceleration : null ;
        this.keys.dIsDown? this.heroShip.velX += this.heroShip.acceleration : null ;
        this.keys.wIsDown? this.heroShip.velY -= this.heroShip.acceleration : null ;
        this.keys.sIsDown? this.heroShip.velY += this.heroShip.acceleration : null ;

        //move the ships position
        
        // this.heroShip.shipX >= 0 && this.heroShip.shipX <= this.canvas.width ? this.heroShip.shipX += this.heroShip.velX : this.heroShip.velX = 0

        // this.heroShip.shipY >= 0 && this.heroShip.shipY <= this.canvas.height ? this.heroShip.shipY += this.heroShip.velY : this.heroShip.velY = 0

        //left side of the screen limit
        if(this.heroShip.shipX >= 0){
            this.heroShip.shipX += this.heroShip.velX 
        }else {
            this.heroShip.velX = 0
            this.heroShip.shipX = 1
        }

        //right side of screen limit
        if(this.heroShip.shipX + this.heroShip.width <= this.canvas.width){
            this.heroShip.shipX += this.heroShip.velX 
        }else {
            this.heroShip.velX = 0
            this.heroShip.shipX = this.canvas.width - this.heroShip.width - 1
        }


        if(this.heroShip.shipY >= 0){
            this.heroShip.shipY += this.heroShip.velY
        } else {
            this.heroShip.velY = 0
            this.heroShip.shipY = 1
        }

        if(this.heroShip.shipY + this.heroShip.height < this.canvas.height){
            this.heroShip.shipY += this.heroShip.velY
        }else {
            this.heroShip.velY = 0
            this.heroShip.shipY = this.canvas.height - this.heroShip.height -1
        }



        // this.heroShip.shipX += this.heroShip.velX
        // this.heroShip.shipY += this.heroShip.velY


    },

    clearScreen(){
        this.ctx.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
    },


    enventListeners(){



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
        }


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




        // document.onkeypress = e => {
        //     console.log(e);

        //     switch(e.keyCode){
        //         case this.keys.W:
        //             this.heroShip.velY -= this.heroShip.acceleration
        //             break;
        //         case this.keys.A:
        //             this.heroShip.velX -= this.heroShip.acceleration
        //             break;
        //         case this.keys.S: 
        //             this.heroShip.velY += this.heroShip.acceleration
        //             break;
        //         case this.keys.D: 
        //             this.heroShip.velX += this.heroShip.acceleration
        //             break;
            

            // }


        }

    }
    


}
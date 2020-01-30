const Game = {
    canvas: undefined, 
    ctx: undefined,
    screenWidth: undefined,
    screenHeight: undefined, 
    fps : 60,
    counter: 0,
    score: 0,
    enemySquares: [],
    bossKids:[],
    explosions: [],
    isPlay: true,
    pause: 0,
    currentWave: 1, 
    waveDuration: 300,
    timeToNextWave: this.waveDuration - this.counter,
    messageTime: 300,
    messageCounter: 0,
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

    images:{
        lifesImage: new Image(),
    },


    init() {
        this.canvas = document.getElementById('myCanvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.images.lifesImage.src = "../images/lives/life.png"
        this.scoreboard = ScoreBoard
        this.scoreboard.init(this.ctx)


        this.start()
        this.enventListeners()
    },

    start(){

        //start the hero
        this.heroShip = new Hero(this.ctx, this.keys, this.mouse ,this.canvas.width, this.canvas.height, this.counter)
        
        // start the background
        this.background = new Background(this.ctx, 0 ,0 ,this.canvas.width, this.canvas.height)
        
        
        
        
        
        //game interval
        this.wave > 4? this.boss = new Boss1(this.ctx,this.canvas.width, this.canvas.height) : null

        this.interval = setInterval(() => {
            
            this.clearScreen()
            
            // console.log(this.counter)
            // console.log(`this is the current wave ${this.currentwave} -- and this is the counter ${this.counter}-- and this is the wavetime ${this.waveDuration}---and this is the messagecounter ${this.messageCounter}`)
            console.log(this.boss)


            //score for time alive
            this.counter % 60 == 0 ? this.score += 10 : null
            
            this.isPlay ? this.isBulletImpact() : null
            
            this.isPlay ? this.generateBigSquares(): null
            
            if(this.isCollision()){
                this.heroShip.reset()
                this.isPlay = false
            } 
            
            if(this.isCollisionCircles()){
                this.heroShip.reset()
                this.isPlay = false
            } 
            
            this.deleteBigSquares()
            this.deleteBullets()
            this.deleteExplosions()
            this.deleteBossKids()
            
            this.drawAll() 
            this.moveAll()

       
            //add to counter and wave counter
            if(this.counter > this.waveDuration){

                    this.messageCounter ++ 

                    if(this.messageCounter > 0 && this.messageCounter < this.messageTime){
                        console.log("hola")
                        this.enemySquares = [];
                        this.captainMessage(this.currentWave)

                    }else{
                        this.messageCounter = 0
                        this.counter = 0
                        this.currentWave ++

                        console.log(this.currentWave)
                        this.currentWave == 4? console.log("creating boss") : null
                        this.currentWave == 4? this.boss = new Boss1(this.ctx,this.canvas.width, this.canvas.height) : null
                    }
            }else{
                this.counter ++
            }
                
            //         this.counter = 0
                
            //        this.currentwave ++

            //     // }, 5000);

            // }else{
            //     this.counter ++
            // }
            
            
        }, 1000/this.fps);
    },


    moveAll(){

        if(this.isPlay){

        this.enemySquares.forEach(elm => elm.move())
        this.boss? this.bossKids.forEach(elm => elm.move()): null
        this.boss? this.boss.move() : null
        }

        this.heroShip.moveHero()

        
    },

    drawAll(){


        this.background.draw()
        this.heroShip.drawHero()

        if(this.boss){
        this.bossKids.forEach(kid => kid.draw())
        this.boss.draw()
        }

        this.enemySquares.forEach(elm => elm.draw())
        this.explosions.forEach(explosion => explosion.draw())

        this.drawLives()
        this.drawScore()


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

        switch(this.currentWave){
            case 1:
                this.counter % 120 == 0 ? this.enemySquares.push(new BlueBigSquare(this.ctx,this.canvas.width, this.canvas.height)) : null
                break;
            case 2: 
                this.counter % 100 == 0 ? this.enemySquares.push(new BlueBigSquare(this.ctx,this.canvas.width, this.canvas.height)) : null
                break;
            case 3:
                this.counter % 80 == 0 ? this.enemySquares.push(new BlueBigSquare(this.ctx,this.canvas.width, this.canvas.height)) : null
                break;
        }
    },

    generateSmallSquares(parentSquare){
        this.enemySquares.push(new RedSmallSquare(this.ctx,this.canvas.width, this.canvas.height,parentSquare))
    },


    deleteBigSquares(){

        this.enemySquares.forEach((square, idx) => {
            if (square._posX <= -square._width -10 ||
                square._posX > this.canvas.width + square._width + 10 ||
                square._posY > this.canvas.height + square._height + 10 ||
                square._posY < 0 - square._height - 10 ) {
              this.enemySquares.splice(idx, 1);
            }
          })

    },

    deleteBossKids(){

        this.bossKids.forEach((kid, idx) => {
            if (kid._posX <= kid._radius -10 ||
                kid._posX > this.canvas.width + 300 ||
                kid._posY > this.canvas.height + kid._radius ||
                kid._posY < 0 - kid._radius) {
              this.bossKids.splice(idx, 1);
            }
          })

    },

    
    deleteExplosions(){
        this.explosions.forEach((explosion, idx) => explosion._image.frameIndex > 12 ?  this.explosions.splice(idx,1) : null
        )
    },

    deleteBullets(){

        this.heroShip._bullets.forEach((bullet, idx) =>{
            if(bullet._bulletPosX < 0 ||
                bullet._bulletPosX > this.canvas.width ||
                bullet._bulletPosY < 0 ||
                bullet._bulletPosY > this.canvas.height){
                    this.heroShip._bullets.splice(idx , 1)
                }    
        } )        
    },    

    isCollision(){
       if(this.isPlay){
           
       return  this.enemySquares.some(
           square => 
               this.heroShip._shipX + this.heroShip._width >= square._posX &&
               this.heroShip._shipX <= square._posX + square._width &&
               this.heroShip._shipY <= square._posY + square._height &&
               this.heroShip._shipY + this.heroShip._height >= square._posY
        )
       }else{
           this.pause ++

           if(this.pause > 180){
               this.isPlay = true
               this.pause = 0
           }
       } 

    },


    isCollisionCircles(){


        if(this.isPlay){
            
            return  this.bossKids.some(
                kid => (this.heroShip._shipX - kid._posX)**2 + (this.heroShip._shipY - kid._posY)**2 < (kid._radius+10)**2                   
             )
            
        }else{ 
            this.pause ++
            if(this.pause > 180){
                this.isPlay = true
                this.pause = 0
            }
        } 
    },


    isBulletImpact(){

        this.enemySquares.forEach((square, squareId) => {this.heroShip._bullets.forEach((bullet,bulletId) => {


            if(
                bullet._bulletPosX >= square._posX &&
                bullet._bulletPosX <= square._posX + square._width &&
                bullet._bulletPosY <= square._posY + square._height &&
                bullet._bulletPosY >= square._posY
                ){
                    
                    //create explosion
                    this.explosions.push(new Explosion(this.ctx, bullet._bulletPosX , bullet._bulletPosY, this.counter))
                    
                    //delete bullet
                    this.heroShip._bullets.splice(bulletId , 1)


                    //delete Big squares and create small squares, delete small squares
                    if(this.enemySquares[squareId]._name === "BlueBigSquare"){
                        
                        this.generateSmallSquares(this.enemySquares[squareId])
                        this.generateSmallSquares(this.enemySquares[squareId])
                        this.generateSmallSquares(this.enemySquares[squareId])
                        this.generateSmallSquares(this.enemySquares[squareId])
                        
                        this.enemySquares.splice(squareId,1)
                        this.score += 5

                        
                    }else{
                        this.enemySquares.splice(squareId,1)
                        this.score += 8
                    }
                 

                
                }
            }
        )})
    
        //colission with boss
        if(this.boss){
            this.heroShip._bullets.forEach((bullet, bulletId) =>{
                
                this.distanceX =  bullet._bulletPosX -this.boss._posX
                this.distanceY =  bullet._bulletPosY -this.boss._posY

                if(this.distanceX**2 + this.distanceY**2 < this.boss._radius**2){
                    this.boss.hit()
                    this.heroShip._bullets.splice(bulletId , 1)
                    this.score += 2
                   
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))
                    this.bossKids.push(new BossKids(this.ctx, this.canvas.width, this.canvas.height, this.boss))

                }

            })


            //colission with boss kids circles
            this.bossKids.forEach((circle, circleId) => {
                this.heroShip._bullets.forEach((bullet, bulletId) => {

                    this.distanceX =  bullet._bulletPosX - circle._posX
                    this.distanceY =  bullet._bulletPosY - circle._posY

                    if(this.distanceX**2 + this.distanceY**2 < circle._radius**2){

                        this.score += 5

                        this.explosions.push(new Explosion(this.ctx, bullet._bulletPosX , bullet._bulletPosY, this.counter))
                        
                        this.heroShip._bullets.splice(bulletId , 1)
                        this.bossKids.splice(circleId, 1)

                    }

                })
            })

        }
    },

    drawLives(){

        if(this.heroShip._lifes === 3){

            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -200, this.canvas.height -60, 40, 40)
            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -140, this.canvas.height -60, 40, 40)
            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -80, this.canvas.height -60, 40, 40)

        }else if (this.heroShip._lifes ===2){

            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -140, this.canvas.height -60, 40, 40)
            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -80, this.canvas.height -60, 40, 40)

        }else if(this.heroShip._lifes ===1){

            this.ctx.drawImage(this.images.lifesImage, this.canvas.width -80, this.canvas.height -60, 40, 40)

        }
    },


    drawScore() {
        //con esta funcion pintamos el marcador
        this.scoreboard.update(this.score);
      },
    


      captainMessage(wave){
          
          this.commanderImage = new Image()
          this.commanderImage.src = "../images/captain/captain.png"
        //   console.log(wave)

        switch(wave){

            case 1:       
            console.log("enter case")


                //text of message
                this.message1Image = new Image()
                this.message1Image.src = "../images/captain/Mensaje1.png"
                this.ctx.drawImage(this.message1Image, this.canvas.width-500, this.canvas.height-238, 310, 214)
                    
                //box of text
                this.ctx.lineWidth = 5
                this.ctx.strokeStyle = "lightgrey"
                this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
                this.ctx.strokeRect(this.canvas.width-500, this.canvas.height-238, 310, 214)
                
                //commander picture
                this.ctx.drawImage(this.commanderImage, this.canvas.width-200, this.canvas.height-240, 180, 220)

            break;

            case 2: 
                this.ctx.lineWidth = 5
                this.ctx.strokeStyle = "lightgrey"
                this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
                this.ctx.strokeRect(this.canvas.width-500, this.canvas.height-238, 310, 214)
                
                this.ctx.drawImage(this.commanderImage, this.canvas.width-200, this.canvas.height-240, 180, 220)

            break;

            case 3: 
                this.ctx.lineWidth = 5
                this.ctx.strokeStyle = "lightgrey"
                this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
                this.ctx.strokeRect(this.canvas.width-500, this.canvas.height-238, 310, 214)
                
                this.ctx.drawImage(this.commanderImage, this.canvas.width-200, this.canvas.height-240, 180, 220)
            break;

        }

    isMissionAccomplished(){
        if(this.boss){
            if(this.boss._life == 0){

                this.isPlay = false

                if(this.counter % 30 == 0){
                    a
                }


            }



        }
    }



   


      },
    

}
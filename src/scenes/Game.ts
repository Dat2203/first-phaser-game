import Phaser, { Game, GameObjects, Math } from "phaser";

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let ground: Phaser.GameObjects.Image;
let background: Phaser.GameObjects.TileSprite;
let bg1: Phaser.GameObjects.TileSprite;
let bg2 : Phaser.GameObjects.TileSprite;;
let bg3 : Phaser.GameObjects.TileSprite;;
let land: Phaser.GameObjects.TileSprite;;
let cursors:Phaser.Types.Input.Keyboard.CursorKeys;
let catuses1 : Phaser.GameObjects.Image;
let catuses2 : Phaser.GameObjects.Image;
let catuses3 : Phaser.GameObjects.Image;
let gameOVer:  Phaser.GameObjects.Container;
let socerTextDisplay: Phaser.GameObjects.Text;
let preta : Phaser.GameObjects.Sprite



export default class Demo extends Phaser.Scene {

  private distansce :number =400
  private flag: boolean
  private score: number;
  private coinClaimed: number;

  constructor() {
    super("GameScene");

    this.flag = false;
    this.score =  0;
    this.coinClaimed = 0;
    
  }

  preload() {

    this.load.image("ground", "assets/ground.png");

    //noon background
    this.load.image("sunset-land", "assets/sunset/sunset_land.png");
    this.load.image("sunset-bg1", "assets/sunset/sunset_1.png");
    this.load.image("sunset-bg2", "assets/sunset/sunset_2.png");
    this.load.image("sunset-bg3", "assets/sunset/sunset_3.png");
    this.load.image("sunset-bg4", "assets/sunset/sunset_4.png");
    this.load.image("gameover", "assets/gameover.png");
    
    this.load.image("sunset-bg", "assets/sunset/sunset_bg.png");

    //catuses preload
    this.load.image("cactus_big", "assets/cactus_big.png");
    this.load.image("cactus_small", "assets/cactus_small.png");
    this.load.image("cactus_group", "assets/cactus_group.png")
    
    // preta preload
    this.load.spritesheet("preta","assets/ptera.png",{frameWidth:70,frameHeight:110});


    //Game Over preload
    this.load.image("gameover", "assets/gameover.png");
    

    //dino preload spritesheet
    this.load.spritesheet("dino", "assets/dino.png", {
      frameWidth: 150,
      frameHeight: 180,
    });
    this.load.spritesheet("dino-down", "assets/dino_ducking.png", {
      frameWidth: 20,
      frameHeight: 180,
    });
    this.load.spritesheet("replay_gameover", "assets/replay_over.png",{frameWidth:70,frameHeight:110})
  }

  create() {

    
     land = this.add.tileSprite(0,280, 2800, 400,"sunset-land")
    bg2 = this.add.tileSprite(0,this.scale.height-400, 2800,400,"sunset-bg")
    bg1 = this.add.tileSprite(0,this.scale.height-400, 2800,400,"sunset-bg2")
    background= this.add.tileSprite(0,this.scale.height-400, 2800,400,"sunset-bg1")

    //catuses
    catuses1 = this.add.image(this.scale.width,450,"cactus_big").setScale(0.8)
    catuses2 = this.add.image(this.scale.width + this.distansce,450,"cactus_group").setScale(0.8)
    catuses3 = this.add.image(this.scale.width + this.distansce*2,450,"cactus_small").setScale(0.8)

    //S
    const text1 = this.add.text(50,50,"sunset",{fontFamily:"CustomFont"})
  
    


    ground = this.physics.add.staticImage(200, 500, "ground");


    
    //player
    player = this.physics.add.sprite(100, 450, "dino");

    preta = this.add.sprite(this.scale.width , this.scale.height/2 -50,"preta").setScale(0.5); 
    
    
    player.setCollideWorldBounds(true);

    // Create container game over childs objects
    // const gameOverDisplay = new GameObjects.Image(this,0,0 ,"gameover")
    // const gameOverReplayBtn = new Phaser.GameObjects.Sprite(this,50,50,"replay_gameover").setPosition(0,140).on("pointerdown", () => console.log("1"));
    // const scoreText = new Phaser.GameObjects.Text(this,0,0, this.score.toString(),{fontFamily: 'CustomFont'}).setPosition(10,30).setFill("#0000");
    // gameOVer = this.add.container(this.scale.width/2, this.scale.height/2,[ gameOverDisplay,gameOverReplayBtn,scoreText])




    const loop=  this.time.addEvent({
      callback: this.updateScore,
      callbackScope: this,
      delay: 1000, // 1000 = 1 second
      loop: true
  });
   
    //create animation objects
    this.anims.create({
      key: "dino-anims",
      frames: this.anims.generateFrameNumbers("dino", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "dino-ducking-anims",
      frames: this.anims.generateFrameNumbers("dino-down", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });


    this.anims.create({
      key:"replay_gameover_aims",
      frames: this.anims.generateFrameNumbers("replay_gameover", { start: 0, end: 1 }),
      frameRate: 10,
      repeat:-1,
    })
    this.anims.create({
      key:"preta_aims",
      frames: this.anims.generateFrameNumbers("preta", { start: 0, end: 1 }),
      frameRate: 5,
      repeat:-1,
    })
    //set animation for gameObject
    player.play("dino-anims").setScale(0.5);
    
    preta.play("preta_aims")
    // gameOverReplayBtn.play("replay_gameover_aims")
    
    player.body.setGravityY(300);



    this.physics.add.collider(player, ground);



    var add = this.add;
    var input = this.input;

    
    // this.score = this.add.text.()
   socerTextDisplay = this.add.text( this.scale.width -50,50,this.score.toString(),{fontFamily:"CustomFont"})
   const myTimeout = setInterval(this.updateScore, 1000);

  }
 

 

  update() {

    land.tilePositionX += 5
    background.tilePositionX += 2;
    bg1.tilePositionX += 1;
   


    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-350);
    }
    if (cursors.down.isDown) {
      player.setVelocityX(0);
      player.play("dino-ducking-anims", true);
    } else {
      player.play("dino-anims", true);
    }
    
    
    
    //move cactus

 
    this.moveCatus(catuses1, 5)
    this.moveCatus(catuses2, 5)
    this.moveCatus(catuses3, 5)

    this.movePreta(preta)
    this.updateScore()





    // this.physics.add.overlap(player, catuses1, this.collidCactus, null, this);
    

  }
  updateScore(): void{
    this.score += 1 ;
   socerTextDisplay.setText(this.score.toString())
 
  }

  moveCatus(catuses:Phaser.GameObjects.Image  , speed:number):void{
    catuses.x -=speed;
    if(catuses.x == 0){
      this.resetCatus(catuses);
    }
  }
  movePreta(preta:Phaser.GameObjects.Sprite){
    const speed = Math.Between(5,7)
    preta.x -= speed;
    
    if(preta.x < 0){
      this.resetPtera(preta)
    }
  }

  resetPtera(preta:Phaser.GameObjects.Sprite){
    preta.x= this.scale.width;
    preta.y = this.scale.height/2 - Math.Between(0,70);


  }

  resetCatus(catuses:Phaser.GameObjects.Image):void{
    catuses.x= this.scale.width;
  }
  collidCactus(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, cactus: Phaser.GameObjects.Image){

      this.physics.pause();
      

  }

  
}

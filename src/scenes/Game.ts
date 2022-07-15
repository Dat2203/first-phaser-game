import Phaser, { Game, GameObjects, Math } from "phaser";
import { claimTextList } from "../contansts";

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let ground: Phaser.GameObjects.Image;
let background: Phaser.GameObjects.TileSprite;
let bg1: Phaser.GameObjects.TileSprite;
let bg2: Phaser.GameObjects.TileSprite;
let bg3: Phaser.GameObjects.TileSprite;
let land: Phaser.GameObjects.TileSprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let catuses1: Phaser.GameObjects.Image;
let catuses2: Phaser.GameObjects.Image;
let catuses3: Phaser.GameObjects.Image;
let gameOVer: Phaser.GameObjects.Container;
let socerTextDisplay: Phaser.GameObjects.Text;
let preta: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let cactusGroup: Phaser.GameObjects.Group;
let scoreText: Phaser.GameObjects.Text;
let pauseButton: Phaser.GameObjects.Sprite;
let diamond: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let claimText: Phaser.GameObjects.Text;

export default class Demo extends Phaser.Scene {
  private DISTANCE: number = 400;
  private flag: boolean;
  private score: number;
  private coinClaimed: number;
  private GAME_SPEED: number = 5;

  constructor() {
    super("GameScene");

    this.createDiamond = this.createDiamond.bind(this);
    this.flag = false;
    this.score = 0;
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
    this.load.image("cactus_group", "assets/cactus_group.png");

    // preta preload
    this.load.spritesheet("preta", "assets/ptera.png", {
      frameWidth: 70,
      frameHeight: 110,
    });

    //Game Over preload
    this.load.image("gameover", "assets/gameover.png");

    //dino preload spritesheet
    this.load.spritesheet("dino", "assets/dino.png", {
      frameWidth: 150,
      frameHeight: 180,
    });
    this.load.spritesheet("dino-down", "assets/dino_ducking.png", {
      frameWidth: 150,
      frameHeight: 92,
    });
    this.load.spritesheet("replay_gameover", "assets/replay_over.png", {
      frameWidth: 92,
      frameHeight: 38,
    });
    this.load.spritesheet("diamond", "assets/diamond.png", {
      frameWidth: 76,
      frameHeight: 70,
    });
  }

  create() {
    const timer = this.time;

    land = this.add.tileSprite(0, 280, 2800, 400, "sunset-land");
    bg2 = this.add.tileSprite(
      0,
      this.scale.height - 400,
      2800,
      400,
      "sunset-bg"
    );
    bg1 = this.add.tileSprite(
      0,
      this.scale.height - 400,
      2800,
      400,
      "sunset-bg2"
    );
    background = this.add.tileSprite(
      0,
      this.scale.height - 400,
      2800,
      400,
      "sunset-bg1"
    );

    //catuses
    catuses1 = this.physics.add
      .image(this.scale.width, 450, "cactus_big")
      .setScale(0.8);
    catuses2 = this.physics.add
      .image(this.scale.width + this.DISTANCE, 450, "cactus_group")
      .setScale(0.8);
    catuses3 = this.physics.add
      .image(this.scale.width + this.DISTANCE * 2, 450, "cactus_small")
      .setScale(0.8);

    cactusGroup = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    //dino
    player = this.physics.add.sprite(100, 450, "dino");

    ground = this.physics.add.staticImage(200, 500, "ground");

    preta = this.physics.add
      .sprite(this.scale.width, this.scale.height / 2 - 50, "preta")
      .setScale(0.5);

    cactusGroup.addMultiple([catuses1, catuses2, catuses3]);
    player.setCollideWorldBounds(true);
    player.setBounce(0.1);

    // Create container game over childs objects
    const gameOverDisplay = new GameObjects.Image(this, 0, 0, "gameover");
    const gameOverReplayBtn = new Phaser.GameObjects.Sprite(
      this,
      50,
      50,
      "replay_gameover"
    )
      .setPosition(0, 140)
      .setInteractive()
      .on("pointerdown", this.pauseGame);

    //Text
    scoreText = new Phaser.GameObjects.Text(this, 0, 0, this.score.toString(), {
      fontFamily: "CustomFont",
      fontSize: "25px",
    }).setPosition(0, 20);

    claimText = this.add
      .text(player.x + 100, player.y + 100, "15", {
        fontFamily: "CustomFont",
        fontSize: "25px",
      })
      .setVisible(false);

    gameOVer = this.add
      .container(this.scale.width / 2, this.scale.height / 2, [
        gameOverDisplay,
        gameOverReplayBtn,
        scoreText,
      ])
      .setVisible(false);

    diamond = this.physics.add
      .sprite(
        this.scale.width / 2 + 500,
        this.scale.height / 2 + 120,
        "diamond"
      )
      .setScale(0.5);

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
      key: "replay_anims",
      frames: this.anims.generateFrameNumbers("replay_over", {
        frames: [0, 1],
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "diamond_anims",
      frames: this.anims.generateFrameNumbers("diamond", {
        frames: [0, 3],
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "replay_gameover_aims",
      frames: this.anims.generateFrameNumbers("replay_gameover", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "preta_aims",
      frames: this.anims.generateFrameNumbers("preta", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "diamond_aims",
      frames: this.anims.generateFrameNumbers("diamond", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    //set animation for gameObject
    player.play("dino-anims").setScale(0.5);

    diamond.body.allowGravity = false;
    diamond.play("diamond_aims");
    preta.play("preta_aims");
    gameOverReplayBtn.play("replay_gameover_aims");

    player.body.setGravityY(300);
    preta.body.allowGravity = false;

    this.physics.add.collider(player, ground);

    this.physics.add.collider(cactusGroup, ground);

    // this.score = this.add.text.()
    socerTextDisplay = this.add.text(
      this.scale.width - 50,
      50,
      this.score.toString(),
      { fontFamily: "CustomFont" }
    );

    this.physics.add.overlap(
      player,
      cactusGroup,
      this.pauseGame,
      () => {},
      this
    );

    // handle clamid diamond
    this.physics.add.overlap(player, preta, this.pauseGame, () => {}, this);
    const physic = this.physics;
    physic.add.overlap(
      player,
      diamond,
      () => {
        this.createDiamond();
        const ranDomIndex: number = Math.Between(0, 3);
        claimText
          .setText(claimTextList[ranDomIndex].text)
          .setPosition(player.x + 50, player.y - 50)
          .setVisible(true);
        this.coinClaimed += claimTextList[ranDomIndex].score;

        var textDisplayLoop = timer.addEvent({
          delay: 1000, // ms
          callback: () => {
            claimText.setVisible(false);
          },
          loop: false,
        });

        textDisplayLoop.paused;
      },
      () => {},
      this
    );
  }

  update() {
    land.tilePositionX += 5;
    background.tilePositionX += 2;
    bg1.tilePositionX += 1;
    diamond.x -= 5;

    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-380);
    }
    if (cursors.down.isDown) {
      if (player.height === 180) {
        player.setTexture("dino-down");
        player.play("dino-ducking-anims", true);
        player.setSize(150, 92);
      }
    }

    if (cursors.down.isUp) {
      if (player.height === 92) {
        player.setTexture("dino");
        player.play("dino-anims", true);
        player.setSize(150, 180);
        player.y -= 20;
      }
    }
    diamond.x < 0 && this.createDiamond();

    //move cactus

    this.moveCatus(catuses1, 5);
    this.moveCatus(catuses2, 5);
    this.moveCatus(catuses3, 5);

    this.movePreta(preta);
  }
  collectDiamond(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    star: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {}

  moveCatus(catuses: Phaser.GameObjects.Image, speed: number): void {
    catuses.x -= speed;
    if (catuses.x == 0) {
      this.resetCatus(catuses);
    }
  }
  movePreta(preta: Phaser.GameObjects.Sprite) {
    const speed = Math.Between(5, 7);
    preta.x -= speed;

    if (preta.x < 0) {
      this.resetPtera(preta);
    }
  }

  resetPtera(preta: Phaser.GameObjects.Sprite) {
    preta.x = this.scale.width;
    preta.y = this.scale.height / 2 + 150 - Math.Between(50, 200);
    this.score += 10;
    socerTextDisplay.setText(this.score.toString());
    scoreText.setText(this.score.toString());
  }
  createDiamond() {
    const xPos = Math.Between(
      this.scale.width + 1000,
      this.scale.height + 1500
    );
    const yPost = this.scale.height / 2 + 200 - Math.Between(50, 200);
    diamond.setPosition(xPos, yPost);
  }

  resetCatus(catuses: Phaser.GameObjects.Image): void {
    catuses.x = this.scale.width + Math.Between(200, 1000);
    this.score += 10;
    socerTextDisplay.setText(this.score.toString());
  }

  pauseGame() {
    gameOVer.setVisible(true);
  }
  replay() {
    gameOVer.setVisible(false);
  }
}

import Phaser, { Game, GameObjects, Math } from "phaser";
import { claimTextList } from "../contansts";

var player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
var ground: Phaser.GameObjects.Image;
var background: Phaser.GameObjects.TileSprite;
var bg1: Phaser.GameObjects.TileSprite;
var bg2: Phaser.GameObjects.TileSprite;
var bg3: Phaser.GameObjects.TileSprite;
var bg4: Phaser.GameObjects.TileSprite;
var land: Phaser.GameObjects.TileSprite;
var cursors: Phaser.Types.Input.Keyboard.CursorKeys;
var catuses1: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
var catuses2: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
var catuses3: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
var gameOVer: Phaser.GameObjects.Container;
var socerTextDisplay: Phaser.GameObjects.Text;
var preta: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
var cactusGroup: Phaser.GameObjects.Group;
var scoreText: Phaser.GameObjects.Text;
var pauseButton: Phaser.GameObjects.Sprite;
var diamond: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
var claimText: Phaser.GameObjects.Text;
var jumpSound: Phaser.Sound.BaseSound;
var mainthemeSound: Phaser.Sound.BaseSound;
var playButton: Phaser.GameObjects.Image;
var guide: Phaser.GameObjects.Image;
var guidTween: Phaser.Tweens.Tween;
var emitter: GameObjects.Particles.ParticleEmitter;
var soundButton: Phaser.GameObjects.Sprite;

export default class Demo extends Phaser.Scene {
  private DISTANCE: number = 400;
  private countDistance: number = 0;
  private isGameOver: boolean;
  private score: number;
  private coinClaimed: number;
  private GAME_SPEED: number = 5;
  private isStart: boolean = false;
  private isPlayAudio: boolean = true;
  private isPause: boolean = false;

  constructor() {
    super("GameScene");

    this.createDiamond = this.createDiamond.bind(this);
    this.isStart = false;
    this.isGameOver = false;
    this.score = 0;
    this.coinClaimed = 0;
  }
  init() {}

  preload() {
    this.load.image("ground", "assets/ground.png");

    //sunset background
    this.load.image("sunset-land", "assets/sunset/sunset_land.png");
    this.load.image("sunset-bg1", "assets/sunset/sunset_1.png");
    this.load.image("sunset-bg2", "assets/sunset/sunset_2.png");
    this.load.image("sunset-bg3", "assets/sunset/sunset_3.png");
    this.load.image("sunset-bg4", "assets/sunset/sunset_4.png");
    this.load.image("sunset-bg", "assets/sunset/sunset_bg.png");

    //night background
    this.load.image("night-land", "assets/night/night_land.png");
    this.load.image("night-bg1", "assets/night/night_1.png");
    this.load.image("night-bg2", "assets/night/night_2.png");
    this.load.image("night-bg3", "assets/night/night_3.png");
    this.load.image("night-bg4", "assets/night/sunset_4.png");
    this.load.image("night-bg", "assets/night/night_bg.png");

    //noon background
    this.load.image("noon-land", "assets/noon/noon_land.png");
    this.load.image("noon-bg1", "assets/noon/noon_1.png");
    this.load.image("noon-bg2", "assets/noon/noon_2.png");
    this.load.image("noon-bg3", "assets/noon/noon_3.png");
    this.load.image("noon-bg4", "assets/noon/noon_4.png");
    this.load.image("noon-bg", "assets/noon/noon_bg.png");

    //sunrise background
    this.load.image("sunrise-land", "assets/sunrise/sunrise_land.png");
    this.load.image("sunrise-bg1", "assets/sunrise/sunrise_1.png");
    this.load.image("sunrise-bg2", "assets/sunrise/sunrise_2.png");
    this.load.image("sunrise-bg3", "assets/sunrise/sunrise_3.png");
    this.load.image("sunrise-bg4", "assets/sunrise/sunrise_4.png");
    this.load.image("sunrise-bg", "assets/sunrise/noon_bg.png");

    this.load.image("rain", "assets/rain.png");
    this.load.image("gameover", "assets/gameover.png");
    this.load.image("guide", "assets/guide.png");
    this.load.image("play", "assets/play.png");

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
    this.load.spritesheet("sound", "assets/sound.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    //load audio
    this.load.audio("jumpSound", "./assets/sound/jump.mp3");
    this.load.audio("maintheme", "./assets/sound/main.ogg");
    this.load.audio("collect", "./assets/sound/heartSound.ogg");
  }

  create() {
    this.isStart = false;
    //random map
    let ranDomMapIndex = Math.Between(0, 4);
    switch (ranDomMapIndex) {
      case 0:
        land = this.add.tileSprite(0, 570, 2800, 1050, "sunset-land");

        // prettier-ignore
        bg2 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunset_background").setDepth(0);

        // prettier-ignore
        bg3 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunset-bg3")
        // prettier-ignore
        bg1 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunset-bg2");
        // prettier-ignore
        background = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunset-bg1");

        break;

      case 1:
        land = this.add.tileSprite(0, 570, 2800, 1050, "night-land");
        // prettier-ignore
        bg2 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"night_background").setDepth(0);
        // prettier-ignore
        bg3 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"night-bg3");
        // prettier-ignore
        bg1 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"night-bg2");
        // prettier-ignore
        background = this.add.tileSprite(0,this.scale.height - 400,2800,400,"night-bg1");
        break;

      case 2:
        land = this.add.tileSprite(0, 570, 2800, 1050, "noon-land");
        // prettier-ignore
        bg3 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"noon-bg3");
        // prettier-ignore
        bg2 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"noon_background").setDepth(0);
        // prettier-ignore
        bg1 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"noon-bg2");
        // prettier-ignore
        background = this.add.tileSprite(0,this.scale.height - 400,2800,400,"noon-bg1");
        break;

      default:
        land = this.add.tileSprite(0, 570, 2800, 1050, "sunrise-land");

        // prettier-ignore
        bg2 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunrise_background").setDepth(0);
        // prettier-ignore
        bg4 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunrise-bg4");
        // prettier-ignore
        bg3 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunrise-bg3");
        // prettier-ignore
        bg1 = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunrise-bg2");
        // prettier-ignore
        background = this.add.tileSprite(0,this.scale.height - 400,2800,400,"sunrise-bg1");

        break;
    }
    let _this = this;

    var rain = this.add.particles("rain").setDepth(2);
    emitter = rain.createEmitter({
      x: { min: 0, max: this.scale.width },
      y: 0,
      lifespan: { min: 100, max: 300 },
      speedY: 1500,
      scaleY: 0.2,
      scaleX: 0.1,
      quantity: { min: 5, max: 15 },
      blendMode: "LIGHTEN",
    });
    emitter.pause();

    jumpSound = this.sound.add("jumpSound");
    let collectSound = this.sound.add("collect");
    // mainthemeSound = this.sound.add("maintheme");
    // mainthemeSound.play();
    soundButton = this.add
      .sprite(this.scale.width - 50, 100, "sound")
      .setInteractive({ useHandCursor: true })
      .setScale(0.5)
      .on("pointerdown", _this.handleSound, this);

    playButton = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "play")
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", _this.onClickPlay, this);

    guide = this.add.image(200, 200, "guide");

    pauseButton = this.add
      .sprite(this.scale.width - 100, 100, "play")
      .setInteractive({ useHandCursor: true })
      .setScale(0.6)
      .on("pointerdown", _this.handlePause, this);

    //catuses
    catuses1 = this.physics.add
      .image(this.scale.width + 100, 450, "cactus_big")
      .setScale(0.8)
      .setSize(50, 100);
    catuses2 = this.physics.add
      .image(this.scale.width + 100 + 450, 450, "cactus_group")
      .setScale(0.8)
      .setSize(80, 100);
    catuses3 = this.physics.add
      .image(this.scale.width + 100 + 450 * 2, 450, "cactus_small")
      .setScale(0.8)
      .setSize(50, 100);

    cactusGroup = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    catuses1.body.allowGravity = false;
    catuses2.body.allowGravity = false;
    catuses3.body.allowGravity = false;
    //dino
    player = this.physics.add.sprite(100, 300, "dino");
    player.setSize(100, 170);
    ground = this.physics.add.staticImage(200, 500, "ground");

    preta = this.physics.add
      .sprite(this.scale.width + 100, this.scale.height / 2 - 50, "preta")
      .setScale(0.5)
      .setSize(50, 50);

    cactusGroup.addMultiple([catuses1, catuses2, catuses3]);
    player.setCollideWorldBounds(true).setBounce(0.1).setVisible(false);
    player.body.allowGravity = false;

    //Text

    claimText = this.add
      .text(player.x + 100, player.y + 100, "15", {
        fontFamily: "CustomFont",
        fontSize: "25px",
      })
      .setVisible(false);

    diamond = this.physics.add
      .sprite(
        this.scale.width / 2 + 900,
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
    player.body.setGravityY(300);

    diamond.body.allowGravity = false;
    diamond.play("diamond_aims");
    preta.play("preta_aims");

    preta.body.allowGravity = false;

    this.physics.add.collider(player, ground);

    this.physics.add.collider(cactusGroup, ground);

    //
    socerTextDisplay = this.add.text(
      this.scale.width - 50,
      50,
      this.score.toString(),
      { fontFamily: "CustomFont" }
    );

    //create tweeens
    var tweens = this.tweens.add({
      targets: claimText,
      duration: 1000,
      alpha: { start: 0, from: 1, to: 0 },
      y: { start: claimText.y - 100, to: claimText.y - 200 },
      ease: "Power0",
      repeat: 0,
    });

    guidTween = this.tweens.add({
      targets: guide,
      duration: 1000,
      ease: "Power0",
      repeat: 0,
      alpha: { start: 1, to: 0 },
      paused: true,
    });

    this.physics.add.overlap(
      player,
      cactusGroup,
      this.gameOver,
      () => {},
      this
    );

    // handle clamid diamond
    this.physics.add.overlap(player, preta, this.gameOver, () => {}, this);
    this.physics.add.overlap(
      diamond,
      cactusGroup,
      () => {
        diamond.x += 100;
      },
      () => {},
      this
    );

    this.physics.add.overlap(
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
        collectSound.play();
        tweens.play();
      },
      () => {},
      this
    );
  }

  update() {
    if (!this.isStart) return;
    if (this.isPause) return;

    land.tilePositionX += 5;
    background.tilePositionX += 3;
    bg1.tilePositionX += 2;
    bg3.tilePositionX += 1;
    diamond.x -= 5;

    this.countDistance += 1;
    if (this.countDistance == 120) {
      this.score += 10;
      this.countDistance = 0;
    }

    socerTextDisplay.setText(this.score.toString());

    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-390);
      jumpSound.play();
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
        player.setSize(100, 165);
        player.y -= 20;
      }
    }
    diamond.x < 0 && this.createDiamond();
    if (this.score == 60 || this.score == 200) {
      emitter.resume();
    }
    if (this.score == 120 || this.score == 240) {
      emitter.stop();
    }

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

    if (catuses.x < 0) {
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
    preta.x = this.scale.width + Math.Between(100, 1000);
    preta.y = this.scale.height / 2 + 150 - Math.Between(50, 200);
  }
  createDiamond() {
    let xPos = Math.Between(this.scale.width + 1000, this.scale.height + 1500);
    let yPost = this.scale.height / 2 + 200 - Math.Between(50, 200);
    (xPos == catuses1.x || xPos == catuses2.x || xPos == catuses3.x) &&
      (xPos += 200);

    diamond.setPosition(xPos, yPost);
  }

  resetCatus(catuses: Phaser.GameObjects.Image): void {
    const xPos = Math.Between(
      this.scale.width + 1000,
      this.scale.height + 2000
    );
    catuses.setPosition(xPos, 440);
    this.checkValidCatusPostion();
  }

  gameOver() {
    this.isGameOver = true;
    this.scene.launch("GameOverScene", {
      score: this.score,
      claimScore: this.coinClaimed,
    });
    this.sound.pauseAll();
    this.score = 0;
    this.coinClaimed = 0;
    this.scene.pause();
  }

  checkValidCatusPostion() {
    if (catuses1.x > catuses3.x && catuses1.x - catuses3.x < 450) {
      catuses1.x += 450;
    }
    if (catuses2.x > catuses1.x && catuses2.x - catuses1.x < 450) {
      catuses2.x += 450;
    }
    if (catuses3.x > catuses2.x && catuses3.x - catuses2.x < 450) {
      catuses3.x += 450;
    }
  }

  onClickPlay() {
    this.isStart = true;
    player.setVisible(true);
    player.body.allowGravity = true;
    guidTween.play();
    playButton.destroy();
  }
  handleSound() {
    if (!this.isStart) return;

    this.isPlayAudio = !this.isPlayAudio;
    console.log(this.isPlayAudio);

    if (this.isPlayAudio) {
      soundButton.setTexture("sound", 0);
      this.sound.mute = false;
    }
    if (!this.isPlayAudio) {
      soundButton.setTexture("sound", 1);
      this.sound.mute = true;
    }
  }

  handlePause() {
    if (!this.isStart) return;

    this.isPause = !this.isPause;
    if (this.isPause) {
    }
    if (!this.isPause) {
    }
  }
}

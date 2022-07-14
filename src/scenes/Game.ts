import Phaser from "phaser";

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let ground: Phaser.GameObjects.Image;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let container: Phaser.GameObjects.Container;
let text: Phaser.GameObjects.Text;
let text2: Phaser.GameObjects.BitmapText;
let replyOver: Phaser.GameObjects.Sprite;

export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // preload image
    this.load.image("ground", "assets/ground.png");
    this.load.image("over_container", "assets/gameover.png");

    //preload sprite
    this.load.spritesheet("dino", "assets/dino.png", {
      frameWidth: 150,
      frameHeight: 180,
    });
    this.load.spritesheet("dino-down", "assets/dino_ducking.png", {
      frameWidth: 20,
      frameHeight: 180,
    });
    this.load.spritesheet("replay_over", "assets/replay_over.png", {
      frameWidth: 92,
      frameHeight: 40,
    });
  }

  create() {
    const _this = this;
    ground = this.physics.add.staticImage(200, 500, "ground");

    player = this.physics.add.sprite(100, 450, "dino");

    player.setCollideWorldBounds(true);

    // container child
    const over = new Phaser.GameObjects.Image(this, 0, 0, "over_container");

    text = new Phaser.GameObjects.Text(this, 10, 50, "Text Objects", {
      font: "20px CustomFont",
    }).setStroke("#de77ae", 1);

    replyOver = new Phaser.GameObjects.Sprite(this, 0, 12, "replay_over")
      .on("pointerdown", () => {
        console.log("heelo");
      })
      .play("replay_anims")
      .setPosition(0, 140);

    //container
    container = this.add
      .container(this.scale.width / 2, this.scale.height / 2, [
        over,
        text,
        replyOver,
      ])
      .setScale(0.8);

    // animation
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

    player.play("dino-anims").setScale(0.5);
    player.body.setGravityY(300);

    this.physics.add.collider(player, ground);
  }

  update() {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
    if (cursors.down.isDown) {
      player.setVelocityX(0);
      player.play("dino-ducking-anims", true);
    } else {
      player.play("dino-anims", true);
    }
  }

  startGame() {}
}

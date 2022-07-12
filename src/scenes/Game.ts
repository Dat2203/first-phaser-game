import Phaser from "phaser";

let player: any;
let ground: any;

let cursors: any;
export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.spritesheet("dino", "assets/dino.png", {
      frameWidth: 150,
      frameHeight: 180,
    });
    this.load.spritesheet("dino-down", "assets/dino_ducking.png", {
      frameWidth: 20,
      frameHeight: 180,
    });
  }

  create(): void {
    ground = this.physics.add.staticImage(200, 500, "ground");

    player = this.physics.add.sprite(100, 450, "dino");

    player.setCollideWorldBounds(true);

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
}

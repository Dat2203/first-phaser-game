import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  private finalScore: number = 0;
  private claimScore: number = 0;
  constructor() {
    super("GameOverScene");
  }
  init(data: { score: number; claimScore: number }) {
    this.finalScore = data.score;
    this.claimScore = data.claimScore;
  }

  preload() {
    this.load.image("gameover", "assets/gameover.png");
    this.load.spritesheet("replay_gameover", "assets/replay_over.png", {
      frameWidth: 92,
      frameHeight: 38,
    });
  }
  create() {
    //create animation object
    this.anims.create({
      key: "replay_over_anims",
      frames: this.anims.generateFrameNumbers("replay_gameover", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //
    const scoreText = new Phaser.GameObjects.Text(
      this,
      0,
      20,
      this.finalScore.toString(),
      {
        fontFamily: "CustomFont",
        color: "white",
        fontSize: "24px",
      }
    );

    const claimText = new Phaser.GameObjects.Text(
      this,
      0,
      82,
      this.claimScore.toString(),
      {
        fontFamily: "CustomFont",
        color: "red",
        fontSize: "15px",
      }
    );
    const containerImage = new Phaser.GameObjects.Image(this, 0, 0, "gameover");
    const replayButton = new Phaser.GameObjects.Sprite(
      this,
      0,
      0,
      "replay_gameover"
    )
      .setPosition(0, 140)
      .setOrigin()
      .play("replay_over_anims")
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });
    this.add.container(this.scale.width / 2, this.scale.height / 2, [
      containerImage,
      replayButton,
      scoreText,
      claimText,
    ]);
  }
}

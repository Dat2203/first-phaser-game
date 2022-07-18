import Phaser, { Math } from "phaser";

class Preta extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture, frame);
  }

  resePretaAndUpdateScore(score: number): number {
    this.x = this.scene.scale.width;
    this.y = this.scene.scale.height / 2 + 150 - Math.Between(50, 200);
    return (score += 10);
  }
}

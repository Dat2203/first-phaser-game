import Phaser from "phaser";
import config from "./gameConfig";
import GameScene from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import Preloader from "./scenes/Preloader";

function init() {
  //  Inject our CSS
  var element = document.createElement("style");

  document.head.appendChild(element);

  var sheet = element.sheet;

  var styles =
    '@font-face { font-family: "CustomFont"; src: url("public/assets/font/SFPixelate.ttf") format("opentype"); }\n';

  sheet && sheet.insertRule(styles, 0);
}
init();

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene, GameOver, Preloader],
  })
);

import Phaser from "phaser";
import cactus_big from "/assets/cactus_big.png";
import cactus_small from "/assets/cactus_small.png";
import cactus_group from "/assets/cactus_group.png";
import ground from "/assets/ground.png";
import cloud from "/assets/cloud.png";
import diamond from "/assets/diamond.png";
import bird from "/assets/ptera.png";
import dino from "/assets/dino.png";
import background from "/assets/background.png";
import dino_ducking from "/assets/dino_ducking.png";
import mainSound from "/assets/sound/maintheme.ogg";
import heartSound from "/assets/sound/heartSound.ogg";
import meatSound from "/assets/sound/meatSound.ogg";
import jumpSound from "/assets/sound/jump.mp3";
import moon from "/assets/moon.png";
import sun from "/assets/sun.png";
import rain from "/assets/rain.png";
import playButton from "/assets/play.png";
import replayButton from "/assets/reply.png";
import arrowLeft from "/assets/arrow_left.png";
import arrowRight from "/assets/arrow_right.png";
import buttonA from "/assets/buttonA.png";
import buttonB from "/assets/buttonB.png";
import howtoplay from "/assets/howtoplay.png";
import sound from "/assets/sound.png";
import guide from "/assets/guide.png";
import replayover from "/assets/replay_over.png";
import roomover from "/assets/room_over.png";
import howtoplayover from "/assets/howtoplay_over.png";

//sunrise
import sunriseBg from "/assets/sunrise/sunrise_bg.png";
import sunrise1 from "/assets/sunrise/sunrise_1.png";
import sunrise2 from "/assets/sunrise/sunrise_2.png";
import sunrise3 from "/assets/sunrise/sunrise_3.png";
import sunrise4 from "/assets/sunrise/sunrise_4.png";
import sunriseLand from "/assets/sunrise/sunrise_land.png";
import sunriseOverlay from "/assets/sunrise/sunrise_overlay.png";

//sunset
import sunsetBg from "/assets/sunset/sunset_bg.png";
import sunset1 from "/assets/sunset/sunset_1.png";
import sunset2 from "/assets/sunset/sunset_2.png";
import sunset3 from "/assets/sunset/sunset_3.png";
import sunset4 from "/assets/sunset/sunset_4.png";
import sunsetLand from "/assets/sunset/sunset_land.png";
import sunsetOverlay from "/assets/sunset/sunset_overlay.png";

//noon
import noonBg from "/assets/noon/noon_bg.png";
import noon1 from "/assets/noon/noon_1.png";
import noon2 from "/assets/noon/noon_2.png";
import noon3 from "/assets/noon/noon_3.png";
import noon4 from "/assets/noon/noon_4.png";
import noonLand from "/assets/noon/noon_land.png";
import noonOverlay from "/assets/noon/noon_overlay.png";

//night
import nightBg from "/assets/night/night_bg.png";
import night1 from "/assets/night/night_1.png";
import night2 from "/assets/night/night_2.png";
import night3 from "/assets/night/night_3.png";
import night4 from "/assets/night/night_4.png";
import nightLand from "/assets/night/night_land.png";
import nightOverlay from "/assets/night/night_overlay.png";
import teneocto from "/assets/teneocto_logo.png";

//guide
//import pcguide from './assets/pc_guide.png';
import gameoverbg from "/assets/gameover.png";
import fbshare from "/assets/fbshare.png";
import twittershare from "/assets/twittershare.png";
import replay from "/assets/replay.png";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "Preloader", active: true });
  }
  preload() {
    //load image
    // this.load.image("ground", ground);
    this.load.image("background", background);
    this.load.image("howtoplay", howtoplay);
    // this.load.image("guide", guide);
    //sunrise
    this.load.image("sunrise_overlay", sunriseOverlay);
    this.load.image("sunrise_ground", sunriseLand);
    this.load.image("sunrise_background", sunriseBg);
    this.load.image("sunrise_mid1", sunrise1);
    this.load.image("sunrise_mid2", sunrise2);
    this.load.image("sunrise_mid3", sunrise3);
    this.load.image("sunrise_mid4", sunrise4);
    //sunset
    this.load.image("sunset_overlay", sunsetOverlay);
    this.load.image("sunset_ground", sunsetLand);
    this.load.image("sunset_background", sunsetBg);
    this.load.image("sunset_mid1", sunset1);
    this.load.image("sunset_mid2", sunset2);
    this.load.image("sunset_mid3", sunset3);
    this.load.image("sunset_mid4", sunset4);

    //noon
    this.load.image("noon_overlay", noonOverlay);
    this.load.image("noon_ground", noonLand);
    this.load.image("noon_background", noonBg);
    this.load.image("noon_mid1", noon1);
    this.load.image("noon_mid2", noon2);
    this.load.image("noon_mid3", noon3);
    this.load.image("noon_mid4", noon4);

    //night
    this.load.image("night_overlay", nightOverlay);
    this.load.image("night_ground", nightLand);
    this.load.image("night_background", nightBg);
    this.load.image("night_mid1", night1);
    this.load.image("night_mid2", night2);
    this.load.image("night_mid3", night3);
    this.load.image("night_mid4", night4);

    // game UI
    this.load.image("cloud", cloud);
    this.load.image("cactus_group", cactus_group);
    this.load.image("cactus_small", cactus_small);
    this.load.image("cactus_big", cactus_big);
    this.load.image("moon", moon);
    this.load.image("sun", sun);
    this.load.image("play_btn", playButton);
    this.load.image("replay_btn", replayButton);
    this.load.image("arrow_left", arrowLeft);
    this.load.image("arrow_right", arrowRight);
    this.load.image("teneocto", teneocto);
    this.load.image("gameoverbg", gameoverbg);
    this.load.spritesheet("buttonA", buttonA);
    this.load.spritesheet("buttonB", buttonB);

    //load spritesheet
    // this.load.spritesheet("bird", bird, 70, 110);
    // this.load.spritesheet("dino", dino, 150, 180);
    // this.load.spritesheet("dino_ducking", dino_ducking, 150, 92);
    // this.load.spritesheet("rain", rain, 32, 86);
    // this.load.spritesheet("diamond", diamond, 76, 70);
    // this.load.spritesheet("replay", replay, 72, 72);
    // this.load.spritesheet("fbshare", fbshare, 50, 50);
    // this.load.spritesheet("twittershare", twittershare, 50, 50);
    // this.load.spritesheet("sound", sound, 50, 50);
    // this.load.spritesheet("replayOver", replayover, 92, 38);
    // this.load.spritesheet("howtoplayOver", howtoplayover, 42, 38);
    // this.load.spritesheet("roomOver", roomover, 42, 38);

    // load audio
    // this.load.audio("maintheme", mainSound);
    // this.load.audio("heartSound", heartSound);
    // this.load.audio("meatSound", meatSound);
    // this.load.audio("jumpSound", jumpSound);
  }

  create() {
    this.scene.launch("GameScene");
  }
}

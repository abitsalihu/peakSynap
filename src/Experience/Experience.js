import * as THREE from "three";
import Size from "./Utils/Size";
import Time from "./Utils/Time";
import Debug from "./Utils/Debug";
import Camera from "./Camera";
import Renderer from "./Renderer";
import source from "./source";
import Resources from "./Utils/Resources";
import World from "./World";
import Parallax from "./Parallax";
import HTML from "./Html";
import Animations from "./Animations";
let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    this.source = source;

    instance = this;

    window.experience = this;

    this.canvas = canvas;

    //? utils setup
    this.debug = new Debug();
    this.size = new Size();
    this.time = new Time();
    this.resources = new Resources(source);

    //? world Setup
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.animations = new Animations();
    this.parallax = new Parallax();
    this.html = new HTML();
    this.world = new World();
    this.renderer = new Renderer();

    this.size.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.debug.stats.begin();

    this.camera.update();
    this.world.update();
    this.parallax.update();
    this.animations.update();
    this.html.update();
    this.renderer.update();
    this.debug.stats.end();
  }
}

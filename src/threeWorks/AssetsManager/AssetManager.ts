"use client";

import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import SceneSetup from "../SceneSetup";

interface Coord3D {
  x: number;
  y: number;
  z: number;
}

class ModelAssetManager {
  public static gtlfLoader = new GLTFLoader();
  assetGltf: GLTF | null;
  animMixer: THREE.AnimationMixer | null;
  scene: THREE.Group<THREE.Object3DEventMap> | null;
  animPresent: boolean;
  downloaded: boolean;
  postProcess: (() => void) | undefined;
  scale: Coord3D;
  position: Coord3D;
  url: string;

  /**
   *
   * @param url Path to the GLB file
   * @param scale Sets the scale of the model after it has been downloaded.
   * @param position Sets the position of the model after it has been downloaded
   */
  constructor(
    url: string,
    scale: Coord3D = { x: 1, y: 1, z: 1 },
    position: Coord3D = { x: 0, y: 0, z: 0 }
  ) {
    this.url = url;

    this.scale = scale;
    this.position = position;

    this.assetGltf = null;
    this.animMixer = null;
    this.scene = null;
    this.animPresent = false;
    this.downloaded = false;
  }

  /**
   * This function loads the GLB file, applies the animations
   * and adds it to the scene
   */
  async load() {
    try {
      this.assetGltf = await ModelAssetManager.gtlfLoader.loadAsync(
        this.url,
        (prog) => {}
      );

      console.log(this.assetGltf);

      this.downloaded = true;

      this.scene = this.assetGltf.scene;

      this.scene.scale.set(this.scale.x, this.scale.y, this.scale.z);
      this.scene.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );

      //   Add the model to the scene
      SceneSetup.scene.add(this.scene);

      // Add animations if present and play
      this.animMixer = new THREE.AnimationMixer(this.scene);
      this.animPresent = this.assetGltf.animations.length > 0;

      this.assetGltf.animations.forEach((anim) => {
        const action = this.animMixer?.clipAction(anim);
        action?.play();
      });

      if (this.postProcess) this.postProcess();
    } catch (err) {
      // TODO: Add error handling
      alert(
        "Error loading assets, check your internet connection and try again"
      );
      console.error(err);
      throw err;
    }
  }

  /**
   * Set's the scale of the scene after the assets are loaded
   */
  setScale(x: number, y?: number, z?: number) {
    this.scale.x = x;
    this.scale.y = y ?? this.scale.y;
    this.scale.z = z ?? this.scale.z;

    if (this.scene) {
      this.scene.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }
  }

  /**
   * Set's the position of the scene after the assets are loaded
   */
  setPosition(x: number, y?: number, z?: number) {
    this.position.x = x;
    this.position.y = y ?? this.position.y;
    this.position.z = z ?? this.position.z;

    if (this.scene) {
      this.scene.position.set(this.scale.x, this.scale.y, this.scale.z);
    }
  }

  /**
   * Update animations if present
   */
  update() {
    if (this.animMixer && this.downloaded) {
      this.animMixer.update(SceneSetup.clock.getDelta());
    }
  }
}

export default ModelAssetManager;

"use client";

import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import SceneSetup from "../SceneSetup";
import { CustomLoader, OnProgressFunc } from "./GlobalLoader";
import { ClientDims } from "../utils";

interface Coord3D {
  x: number;
  y: number;
  z: number;
}

type ResizeFactor = { screen: number; min: number; max: number };

class ModelAssetManager implements CustomLoader {
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
  scalingFactor: ResizeFactor;
  positionFactor: { x: ResizeFactor; y: ResizeFactor };
  group?: THREE.Group;
  modelName?: string;

  /**
   *
   * @param url Path to the GLB file
   */
  constructor(
    url: string,
    {
      scale,
      position,
      group = undefined,
      modelName,
    }: {
      scale?: Coord3D;
      position?: Coord3D;
      group?: THREE.Group;
      modelName?: string;
    }
  ) {
    this.url = url;

    this.scale = scale || { x: 1, y: 1, z: 1 };
    this.position = position || { x: 0, y: 0, z: 0 };

    this.assetGltf = null;
    this.animMixer = null;
    this.scene = null;
    this.animPresent = false;
    this.downloaded = false;

    this.scalingFactor = { screen: 1920, min: 0.5, max: 1.5 };

    this.positionFactor = {
      x: {
        screen: 1920,
        min: 0.5,
        max: 1.5,
      },
      y: {
        screen: 1920,
        min: 0.5,
        max: 1.5,
      },
    };

    this.group = group;
    this.modelName = modelName;
  }

  /**
   * This function loads the GLB file, applies the animations
   * and adds it to the scene
   */
  async load(onProgress: OnProgressFunc) {
    try {
      this.assetGltf = await ModelAssetManager.gtlfLoader.loadAsync(
        this.url,
        onProgress
      );

      console.log(this.assetGltf, this.url);

      this.downloaded = true;

      this.scene = this.assetGltf.scene;
      this.scene.name = this.modelName || this.scene.name;

      this.scene.scale.set(this.scale.x, this.scale.y, this.scale.z);
      this.scene.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );
      this.updateResizeFactor();

      //   Add the model to the scene
      let addingScene = this.scene;
      if (this.group) {
        this.group.add(this.scene);
        this.group.name = this.modelName ? this.modelName : this.group.name;
        addingScene = this.group;
      }
      SceneSetup.scene.add(addingScene);

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

  updateResizeFactor() {
    const curFactor =
      Math.min(
        Math.max(
          ClientDims.width / this.scalingFactor.screen,
          this.scalingFactor.min
        ),
        this.scalingFactor.max
      ) - 1;

    const posFactorX = ClientDims.width / this.positionFactor.x.screen;

    if (this.scene) {
      this.scene.scale.set(
        this.scale.x + curFactor,
        this.scale.y + curFactor,
        this.scale.y + curFactor
      );

      console.log(
        this.scene.position.x,
        posFactorX,
        this.position.x + posFactorX
      );

      this.scene.position.setX(this.position.x + posFactorX);
    }
  }
}

class HDRAssetManager implements CustomLoader {
  static loader = new RGBELoader();
  urlPath: string;
  texture: THREE.DataTexture | null;
  afterLoad?: () => void;

  constructor(urlPath: string, afterLoad?: () => void) {
    this.urlPath = urlPath;
    this.texture = null;
    this.afterLoad = afterLoad;
  }

  async load(onProgress: OnProgressFunc) {
    const hdr = await HDRAssetManager.loader.loadAsync(
      this.urlPath,
      onProgress
    );
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    this.texture = hdr;

    if (this.afterLoad) this.afterLoad();
  }
}

export { ModelAssetManager, HDRAssetManager };

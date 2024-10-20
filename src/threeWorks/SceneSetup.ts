"use client";

import * as THREE from "three";

import { ClientDims } from "@/threeWorks/utils";
import ModelAssetManager from "./AssetsManager/AssetManager";

class SceneSetup {
  public static scene: THREE.Scene = new THREE.Scene();
  public static renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  public static clock: THREE.Clock = new THREE.Clock();
  public static camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    ClientDims.width / ClientDims.height,
    0.1,
    1000
  );
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;

  constructor() {
    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    SceneSetup.scene.add(this.ambientLight);
    SceneSetup.scene.add(this.directionalLight);

    // Setting initial position
    this.directionalLight.position.set(10, 10, 10);
    SceneSetup.camera.position.z = 3;
    SceneSetup.camera.position.y = 0.1;

    SceneSetup.renderer.outputColorSpace = THREE.SRGBColorSpace;
    SceneSetup.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    SceneSetup.renderer.toneMappingExposure = 1;
  }

  initialize() {
    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();

    // Add space background
    // const fog = new THREE.FogExp2(0x000514, 0.01);
    // SceneSetup.renderer.setClearColor(fog.color);

    document
      .getElementById("three-work")!
      .appendChild(SceneSetup.renderer.domElement);
  }

  update() {
    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();
  }

  render(scene?: THREE.Scene) {
    SceneSetup.renderer.render(SceneSetup.scene, SceneSetup.camera);
  }
}

export default SceneSetup;

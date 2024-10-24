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
  static ambientLight: THREE.AmbientLight;
  static directionalLight: THREE.DirectionalLight;

  static background: {
    gradient: CanvasGradient;
    gradientTexture: THREE.CanvasTexture;
    canvasCtx: CanvasRenderingContext2D;
  };

  static initialize() {
    // Lighting
    SceneSetup.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    SceneSetup.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    SceneSetup.scene.add(SceneSetup.ambientLight);
    SceneSetup.scene.add(SceneSetup.directionalLight);

    // Setting initial position
    SceneSetup.directionalLight.position.set(10, 10, 10);
    SceneSetup.camera.position.z = 3;
    SceneSetup.camera.position.y = 0.1;

    SceneSetup.renderer.outputColorSpace = THREE.SRGBColorSpace;
    SceneSetup.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    SceneSetup.renderer.toneMappingExposure = 1;

    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();

    // Add space background
    // const fog = new THREE.FogExp2(0x000514, 0.01);
    // SceneSetup.renderer.setClearColor(fog.color);

    document
      .getElementById("three-work")!
      .appendChild(SceneSetup.renderer.domElement);

    SceneSetup.setupBg();
  }

  static update() {
    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();
  }

  private static setupBg() {
    const canvas = document.createElement("canvas");

    canvas.width = ClientDims.width;
    canvas.height = ClientDims.height;

    const canvasCtx = canvas.getContext("2d")!;

    const gradient = canvasCtx.createLinearGradient(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      0
    );

    gradient.addColorStop(0, "rgb(2, 0, 36)"); // Deep purple at the top
    gradient.addColorStop(0.5, "rgb(46, 5, 78)"); // Mid purple
    gradient.addColorStop(1, "rgb(12, 18, 84)"); // Dark blue at the bottom

    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const gradientTexture = new THREE.CanvasTexture(canvas);

    SceneSetup.background = { gradient, gradientTexture, canvasCtx };

    // gradientTexture.rotation = 12;

    SceneSetup.scene.background = SceneSetup.background.gradientTexture;
  }

  render(scene?: THREE.Scene) {
    SceneSetup.renderer.render(SceneSetup.scene, SceneSetup.camera);
  }
}

export default SceneSetup;

"use client";

import * as THREE from "three";

import { ClientDims } from "@/threeWorks/utils";

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
    canvas: HTMLCanvasElement;
    gradient: CanvasGradient;
    gradientTexture: THREE.CanvasTexture;
    canvasCtx: CanvasRenderingContext2D;
    index: number;
  };

  static colorSets = [
    {
      stops: [
        { offset: 0, color: { r: 2, g: 0, b: 36 } },
        { offset: 0.5, color: { r: 46, g: 5, b: 78 } },
        { offset: 1, color: { r: 12, g: 18, b: 84 } },
      ],
    },
    {
      stops: [
        { offset: 0, color: { r: 134, g: 45, b: 89 } },
        { offset: 0.35, color: { r: 48, g: 34, b: 93 } },
        { offset: 1, color: { r: 8, g: 19, b: 37 } },
      ],
    },
    {
      stops: [
        { offset: 0, color: { r: 2, g: 38, b: 41 } },
        { offset: 0.42, color: { r: 5, g: 65, b: 111 } },
        { offset: 1, color: { r: 45, g: 13, b: 80 } },
      ],
    },
    {
      stops: [
        { offset: 0, color: { r: 6, g: 17, b: 37 } },
        { offset: 0.41, color: { r: 31, g: 35, b: 82 } },
        { offset: 1, color: { r: 122, g: 58, b: 155 } },
      ],
    },
    {
      stops: [
        { offset: 0, color: { r: 168, g: 39, b: 148 } },
        { offset: 0.55, color: { r: 47, g: 45, b: 146 } },
        { offset: 1, color: { r: 2, g: 18, b: 72 } },
      ],
    },
  ];

  static initialize() {
    // Lighting
    SceneSetup.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    SceneSetup.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    SceneSetup.scene.add(SceneSetup.ambientLight);
    SceneSetup.scene.add(SceneSetup.directionalLight);

    // Setting initial position
    SceneSetup.directionalLight.position.set(10, 10, 10);
    SceneSetup.camera.position.z = 3;
    // SceneSetup.camera.position.y = 0.1;

    SceneSetup.renderer.outputColorSpace = THREE.SRGBColorSpace;
    SceneSetup.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    SceneSetup.renderer.toneMappingExposure = 1;

    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();

    document
      .getElementById("three-work")!
      .appendChild(SceneSetup.renderer.domElement);

    SceneSetup.renderer.domElement.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );
    SceneSetup.renderer.domElement.addEventListener("contextlost", () => {
      location.reload();
    });

    SceneSetup.setupBg();
  }

  static update() {
    SceneSetup.renderer.setSize(ClientDims.width, ClientDims.height);
    SceneSetup.camera.aspect = ClientDims.width / ClientDims.height;
    SceneSetup.camera.updateProjectionMatrix();

    SceneSetup.background.canvas.width = ClientDims.width;
    SceneSetup.background.canvas.height = ClientDims.height;

    SceneSetup.background.gradientTexture.dispose();

    SceneSetup.background.gradient =
      SceneSetup.background.canvasCtx.createLinearGradient(
        ClientDims.width / 2,
        ClientDims.height,
        ClientDims.width / 2,
        0
      );

    const curIdx = SceneSetup.background.index;
    for (let i = 0; i < SceneSetup.colorSets[curIdx].stops.length; i++) {
      const { r, g, b } = SceneSetup.colorSets[curIdx].stops[i].color;
      SceneSetup.background.gradient.addColorStop(
        SceneSetup.colorSets[curIdx].stops[i].offset,
        `rgb(${r}, ${g}, ${b})`
      );
    }

    SceneSetup.background.canvasCtx.fillStyle = SceneSetup.background.gradient;
    SceneSetup.background.canvasCtx.fillRect(
      0,
      0,
      ClientDims.width,
      ClientDims.height
    );

    SceneSetup.background.gradientTexture = new THREE.CanvasTexture(
      SceneSetup.background.canvas
    );

    SceneSetup.background.gradientTexture.needsUpdate = true;

    SceneSetup.scene.background = SceneSetup.background.gradientTexture;

    console.log(ClientDims.width, ClientDims.height);
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

    SceneSetup.background = {
      index: 0,
      gradient,
      gradientTexture,
      canvasCtx,
      canvas,
    };

    // gradientTexture.rotation = 12;

    SceneSetup.scene.background = SceneSetup.background.gradientTexture;
  }

  /**
   * linear-gradient(90deg, rgb(134, 45, 89) 0%, 17.5772%, rgb(48, 34, 93) 35.1544%, 67.5772%, rgb(8, 19, 37) 100%)
   *
   * linear-gradient(90deg, rgb(2, 38, 41) 0%, 21.4286%, rgb(5, 65, 111) 42.8571%, 71.4286%, rgb(45, 13, 80) 100%)
   *
   * linear-gradient(90deg, rgb(6, 17, 37) 0%, 20.7937%, rgb(31, 35, 82) 41.5873%, 70.7937%, rgb(122, 58, 155) 100%)
   *
   * linear-gradient(90deg, rgb(168, 39, 148) 0%, 27.5728%, rgb(47, 45, 146) 55.1456%, 77.5728%, rgb(2, 18, 72) 100%)
   */
  static changeBg(progress: number, dir: 1 | -1 = 1) {
    const { canvasCtx } = SceneSetup.background;

    // Gradient color stops for different progress levels

    // Interpolation helper function
    function interpolateColor(
      color1: { r: number; g: number; b: number },
      color2: { r: number; g: number; b: number },
      t: number
    ) {
      return {
        r: Math.round(color1.r + (color2.r - color1.r) * t),
        g: Math.round(color1.g + (color2.g - color1.g) * t),
        b: Math.round(color1.b + (color2.b - color1.b) * t),
      };
    }

    // Choose two sets of colors to interpolate between based on progress
    const startIndex = SceneSetup.background.index;
    let endIndex = (startIndex + dir) % SceneSetup.colorSets.length;

    if (endIndex < 0) endIndex = SceneSetup.colorSets.length - 1;

    const startColors = SceneSetup.colorSets[startIndex].stops;
    const endColors = SceneSetup.colorSets[endIndex].stops;

    // Create a new gradient
    const gradient = canvasCtx.createLinearGradient(
      ClientDims.width / 2,
      ClientDims.height,
      ClientDims.width / 2,
      0
    );

    for (let i = 0; i < startColors.length; i++) {
      const interpolatedColor = interpolateColor(
        startColors[i].color,
        endColors[i].color,
        progress
      );
      gradient.addColorStop(
        startColors[i].offset,
        `rgb(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b})`
      );
    }

    // Update the canvas with the new gradient
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(0, 0, ClientDims.width, ClientDims.height);

    // Update the texture
    SceneSetup.background.gradientTexture.needsUpdate = true;
  }

  render() {
    SceneSetup.renderer.render(SceneSetup.scene, SceneSetup.camera);
  }
}

export default SceneSetup;

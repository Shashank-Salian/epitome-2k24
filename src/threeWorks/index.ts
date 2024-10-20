"use client";

import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EffectComposer, RenderPass } from "postprocessing";
import { Clouds } from "@pmndrs/vanilla";

import SceneSetup from "./SceneSetup";
import { ClientDims } from "./utils";

// Just for dev
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initCloud } from "./Models/Clouds";
import { initStars } from "./Models/Stars";

// Setup Scene
const sceneSetup = new SceneSetup();
sceneSetup.initialize();

// Post Processing
const postRenderPass = new RenderPass(SceneSetup.scene, SceneSetup.camera);
const effectComposer = new EffectComposer(SceneSetup.renderer);
effectComposer.addPass(postRenderPass);

// HDR loading:
const hdrLoader = new RGBELoader();
hdrLoader.load("/hdr/night.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  SceneSetup.scene.environment = texture;
  //   SceneSetup.scene.background;
});

// const blackHoleAsset = blackHoleInit(effectComposer);

// Controls
const controls = new OrbitControls(
  SceneSetup.camera,
  SceneSetup.renderer.domElement
);
// controls.enableDamping = true;
// controls.autoRotate = true;

let clouds: Clouds | undefined;
initCloud().then((c) => (clouds = c));

const stars = initStars(effectComposer);

// Canvas background
const fog = new THREE.FogExp2(0x000001, 0.01);

// Animation loop
SceneSetup.renderer.setClearColor(fog.color);
function animate() {
  //   blackHoleAsset.update();

  controls.update();
  //   cloud.updateCloud();
  if (clouds) {
    clouds.update(
      SceneSetup.camera,
      SceneSetup.clock.getElapsedTime(),
      SceneSetup.clock.getDelta()
    );
  }

  //   fog.color.g += 0.00005;

  effectComposer.render(SceneSetup.clock.getDelta());
  //   sceneSetup.render();
}

SceneSetup.renderer.setAnimationLoop(animate);

// Global events
window.addEventListener("resize", () => {
  sceneSetup.update();
  effectComposer.setSize(ClientDims.width, ClientDims.height);
});

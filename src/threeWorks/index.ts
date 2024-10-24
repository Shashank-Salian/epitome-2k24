"use client";

import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EffectComposer, RenderPass } from "postprocessing";
import { Clouds } from "@pmndrs/vanilla";

import SceneSetup from "./SceneSetup";
import { ClientDims, randomSelect, throttle } from "./utils";

// Just for dev
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initCloud } from "./Models/Clouds";
import { initStars } from "./Models/Stars";
import ModelAssetManager from "./AssetsManager/AssetManager";

// Setup Scene
SceneSetup.initialize();

const UPDATE_FUNCS: Function[] = [];

// Post Processing
const postRenderPass = new RenderPass(SceneSetup.scene, SceneSetup.camera);
const effectComposer = new EffectComposer(SceneSetup.renderer);
effectComposer.addPass(postRenderPass);

// HDR loading:
const hdrLoader = new RGBELoader();
hdrLoader.load("/hdr/night.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  SceneSetup.scene.environment = texture;
});

// Controls
const controls = new OrbitControls(
  SceneSetup.camera,
  SceneSetup.renderer.domElement
);

// const madAdsAsset = new ModelAssetManager("/3D/events/mad_ads.glb");
// madAdsAsset.load();

let clouds: Clouds | undefined;
// initCloud().then((c) => (clouds = c));

const stars = initStars(effectComposer);

let gradVal = 0.1;
// Animation loop
function animate() {
  //   blackHoleAsset.update();

  controls.update();

  //   cloud.updateCloud();
  //   if (clouds) {
  //     clouds.update(
  //       SceneSetup.camera,
  //       SceneSetup.clock.getElapsedTime(),
  //       SceneSetup.clock.getDelta()
  //     );
  //   }

  UPDATE_FUNCS.forEach((f) => f());

  effectComposer.render(SceneSetup.clock.getDelta());
}

SceneSetup.renderer.setAnimationLoop(animate);

function onResize() {
  SceneSetup.update();

  effectComposer.setSize(ClientDims.width, ClientDims.height);
}

const updateResize = throttle(onResize, 100);

// Global events
window.addEventListener("resize", updateResize);

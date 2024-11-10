"use client";

import { EffectComposer, RenderPass } from "postprocessing";

import SceneSetup from "./SceneSetup";
import { ClientDims, throttle, UPDATE_FUNCS } from "./utils";

// Just for dev
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initStars } from "./Models/Stars";
import { HDRAssetManager } from "./AssetsManager/AssetManager";
import GlobalLoader from "./AssetsManager/GlobalLoader";
import {
  EventsRayCaster,
  initEventsModel,
  updateCurvePath,
} from "./Models/EventsModel";

import EventList from "@/utils/EventList";
import { SpaceShip } from "./Models/SpaceShip";

// Setup Scene
SceneSetup.initialize();
ClientDims.initMouseEvent();
EventsRayCaster.init();

// Post Processing
const postRenderPass = new RenderPass(SceneSetup.scene, SceneSetup.camera);
const effectComposer = new EffectComposer(SceneSetup.renderer);
effectComposer.addPass(postRenderPass);

SpaceShip.init();

// Controls
// const controls = new OrbitControls(
//   SceneSetup.camera,
//   SceneSetup.renderer.domElement
// );

const nightHdr = new HDRAssetManager("/3D/hdr/night.hdr", () => {
  SceneSetup.scene.environment = nightHdr.texture;
});
GlobalLoader.pushFirst(nightHdr);

EventList.forEach((eventInfo, i) => {
  const asset = initEventsModel(`/3D/events/${eventInfo.modelName}`);
  GlobalLoader.pushFirst(asset);
  EventsRayCaster.eventsModels.push(asset);
});

SceneSetup.scene.add(EventsRayCaster.listenObjects);

const stars = initStars(effectComposer);

// Animation loop
function animate() {
  //   controls.update();

  UPDATE_FUNCS.forEach((f) => f());

  for (let i = 0; i < stars.children.length; i++) {
    const star = stars.children[i];

    star.position.z += i / 100;

    if (star.position.z > 100) star.position.z = -400;
  }

  effectComposer.render(SceneSetup.clock.getDelta());
}

SceneSetup.renderer.setAnimationLoop(animate);

function onResize() {
  SceneSetup.update();

  updateCurvePath();

  EventsRayCaster.eventsModels.forEach((asset) => {
    asset.updateResizeFactor();
  });

  SpaceShip.updateResizeFactor();

  effectComposer.setSize(ClientDims.width, ClientDims.height);
}

const updateResize = throttle(onResize, 100);

// Global events
window.addEventListener("resize", updateResize);

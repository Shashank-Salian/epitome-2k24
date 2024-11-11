import * as THREE from "three";

import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  SelectiveBloomEffect,
} from "postprocessing";

import SceneSetup from "../SceneSetup";
import {
  ClientDims,
  MOBILE_WIDTH,
  pushAnimationFrame,
  randomInRange,
  randomSelect,
} from "../utils";

const BLOOM_LAYER = 2;
const starColors = [0xffffff, 0xe9d14c, 0x3ab9eb, 0xe73c92];

function initStars(composer: EffectComposer) {
  const stars = new THREE.Group();
  const coloredStars = [];

  SceneSetup.camera.layers.enable(BLOOM_LAYER);

  // Add a light source for the shiny effect
  const pointLight = new THREE.PointLight(0xffffff, 1, 2000);
  pointLight.position.set(0, 0, 100);
  SceneSetup.scene.add(pointLight);

  const bloomEffect = new SelectiveBloomEffect(
    SceneSetup.scene,
    SceneSetup.camera,
    {
      blendFunction: BlendFunction.ADD,
      mipmapBlur: true,
      luminanceThreshold: 0.4,
      luminanceSmoothing: 0.2,
      intensity: 3.0,
    }
  );
  const effectPass = new EffectPass(SceneSetup.camera, bloomEffect);
  composer.addPass(effectPass);

  const starCount = ClientDims.width >= MOBILE_WIDTH ? 300 : 200;
  for (let i = 0; i < starCount; ++i) {
    const geometry = new THREE.SphereGeometry(randomInRange(0.2, 0.6), 32, 32);

    let color = new THREE.Color(starColors[0]);

    const material = new THREE.MeshStandardMaterial({
      metalness: 0.8,
      roughness: 0.1,
      emissiveIntensity: randomInRange(0.5, 1),
      emissive: color,
    });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = randomInRange(-350, 350);
    sphere.position.y = randomInRange(-200, 200);

    sphere.position.z = randomInRange(-100, -400);

    // Scale it up a bit
    sphere.scale.x = sphere.scale.y = 2;

    if (Math.random() < 0.2) {
      const index = Math.floor(randomInRange(0, starColors.length));
      color = new THREE.Color(starColors[index]);

      sphere.material.emissive = color;
      sphere.material.color = color;
      sphere.material.emissiveIntensity = 8;

      coloredStars.push(sphere);
    }

    bloomEffect.selection.add(sphere);

    // SceneSetup.scene.add(sphere);
    stars.add(sphere);
  }

  const rayEffectStars = randomSelect(coloredStars, 0.3);

  rayEffectStars.forEach((star) => {
    const godRays = new GodRaysEffect(SceneSetup.camera, star, {
      blur: false,
      density: 0.98,
      decay: 0.92,
      weight: 0.7,
      exposure: 0.7,
    });

    const effectPass = new EffectPass(SceneSetup.camera, godRays);
    composer.addPass(effectPass);
  });

  SceneSetup.scene.add(stars);

  return stars;
}

export { initStars };

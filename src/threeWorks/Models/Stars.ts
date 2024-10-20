import * as THREE from "three";
import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  SelectiveBloomEffect,
} from "postprocessing";

import SceneSetup from "../SceneSetup";
import { randomInRange } from "../utils";

type Model = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial,
  THREE.Object3DEventMap
>[];

function initStars(composer: EffectComposer) {
  const stars = [];
  const starColors = [0xffffff, 0xe9d14c, 0x3ab9eb, 0xe73c92]; // White, Gold, Light Blue, Pink

  // Add a light source for the shiny effect
  const pointLight = new THREE.PointLight(0xffffff, 1, 2000);
  pointLight.position.set(0, 0, 500);
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
  //   bloomEffect.inverted = true;
  const effectPass = new EffectPass(SceneSetup.camera, bloomEffect);
  composer.addPass(effectPass);

  for (let i = 0; i < 100; ++i) {
    let geometry = new THREE.SphereGeometry(0.4, 32, 32);

    let color = new THREE.Color(starColors[0]);

    const material = new THREE.MeshStandardMaterial({
      metalness: 0.8,
      roughness: 0.1,
      emissiveIntensity: randomInRange(0.5, 1),
      emissive: color,
    });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = randomInRange(-400, 400);
    sphere.position.y = randomInRange(-400, 400);

    sphere.position.z = randomInRange(-200, -400);

    // Scale it up a bit
    sphere.scale.x = sphere.scale.y = 2;

    if (Math.random() < 0.2) {
      const index = Math.floor(Math.random() * starColors.length);
      color = new THREE.Color(starColors[index]);

      sphere.material.emissive = color;
      sphere.material.color = color;
    }

    bloomEffect.selection.toggle(sphere);

    SceneSetup.scene.add(sphere);
    stars.push(sphere);
  }

  return stars;
}

function animateShootingStars(shootingStars: Model) {
  const tails = [];

  shootingStars.forEach((star) => {
    const tailLength = 50;
    const tailGeometry = new THREE.BufferGeometry().setFromPoints([
      star.position,
    ]);

    // Create the tail with a similar color to the star
    const tailMaterial = new THREE.LineBasicMaterial({
      color: star.material.color,
    });
    const tail = new THREE.Line(tailGeometry, tailMaterial);

    tails.push({
      star,
      tail,
      positions: [star.position.clone()],
      tailLength,
    });

    SceneSetup.scene.add(tail);
  });
}

export { initStars };

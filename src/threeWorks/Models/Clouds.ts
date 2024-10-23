"use client";

import { Cloud, Clouds } from "@pmndrs/vanilla";
import * as THREE from "three";
import { randomInRange } from "../utils";
import SceneSetup from "../SceneSetup";

async function initCloud() {
  try {
    const textureLoader = new THREE.TextureLoader();
    let clouds: Clouds | undefined;

    const texture = await textureLoader.loadAsync(
      `/textures/cloud.png`,
      function (progress) {}
    );
    clouds = new Clouds({
      limit: 100,
      texture,
    });

    for (let i = 0; i < 20; i++) {
      const cloud = new Cloud({
        segments: 2,
        opacity: 0.5,
        fade: 100,
        growth: 15,
        speed: 0.05,
        volume: 7,
        color: new THREE.Color(0xffffff),
        bounds: new THREE.Vector3(20, 2, 4),
      });

      cloud.position.set(randomInRange(-20, 20), randomInRange(-20, 20), -20);
      // cloud.scale.set(1, 0.7, 1);

      clouds.add(cloud);
    }

    SceneSetup.scene.add(clouds);
    console.log(clouds);
    return clouds;
  } catch (err) {
    // TODO: handle error
    console.error(err);
    throw err;
  }
}

export { initCloud };

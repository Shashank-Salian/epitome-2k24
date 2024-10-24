"use client";

import { Cloud, Clouds } from "@pmndrs/vanilla";
import * as THREE from "three";
import { ClientDims, randomInRange, throttle } from "../utils";
import SceneSetup from "../SceneSetup";

function distortCloud(clouds: Clouds) {
  const rayCaster = new THREE.Raycaster();

  const mouseMoveThrottle = throttle((e: MouseEvent) => {
    const coords = new THREE.Vector2(
      (e.clientX / ClientDims.width) * 2 - 1,
      -((e.clientY / ClientDims.height) * 2 - 1)
    );
    rayCaster.setFromCamera(coords, SceneSetup.camera);

    const intersectClouds = rayCaster.intersectObjects(clouds.children, true);

    if (intersectClouds.length > 0) {
      console.log(intersectClouds);
      //   clouds.position.set(
      //     clouds.position.x + 1,
      //     clouds.position.y + 1,
      //     clouds.position.z
      //   );
      intersectClouds.forEach((cloud) => {
        cloud.object.position.set(
          cloud.object.position.x + 10,
          cloud.object.position.y + 1,
          cloud.object.position.z
        );
      });
    }
  }, 100);

  document.addEventListener("mousemove", (e) => {
    mouseMoveThrottle(e);
  });
}

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

    for (let i = 0; i < 4; i++) {
      const cloud = new Cloud({
        segments: 15,
        opacity: 0.2,
        fade: 20,
        growth: 1,
        speed: 0.1,
        volume: 10,
        color: new THREE.Color("#ababab"),
        bounds: new THREE.Vector3(6, 2, 4),
      });

      cloud.position.set(randomInRange(-2, 2), randomInRange(-2, 2), -20);
      //   cloud.scale.set(2, 2, 2);

      clouds.add(cloud);
    }

    SceneSetup.scene.add(clouds);
    // console.log(clouds);
    // distortCloud(clouds);
    return clouds;
  } catch (err) {
    // TODO: handle error
    console.error(err);
    throw err;
  }
}

export { initCloud };

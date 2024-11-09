import { ModelAssetManager } from "@/threeWorks/AssetsManager/AssetManager";
import GlobalLoader from "@/threeWorks/AssetsManager/GlobalLoader";
import SceneSetup from "../SceneSetup";
import { ClientDims, pushAnimationFrame, removeAnimationFrame } from "../utils";

class SpaceShip {
  static asset: ModelAssetManager;
  static inScene = false;
  static posZ = {
    remove: 10,
    add: -0.4,
  };

  static init() {
    SpaceShip.asset = new ModelAssetManager("/3D/CockPit.glb", {
      addToScene: false,
      onLoaded: () => {
        SpaceShip.updateResizeFactor();
      },
    });
    GlobalLoader.pushFirst(SpaceShip.asset);

    SpaceShip.asset.setPosition(0, 0, SpaceShip.posZ.add);

    SpaceShip.asset.scalingFactor = {
      screen: 1700,
      max: 1,
      min: 0.4,
    };
  }

  static remove() {
    if (!SpaceShip.inScene || !SpaceShip.asset.scene) return;
    // SceneSetup.scene.remove(SpaceShip.asset.scene!);

    const animate = () => {
      const delta = SceneSetup.clock.getDelta();
      SpaceShip.asset.scene!.position.z += 15 * delta;
      if (SpaceShip.asset.scene!.position.z > SpaceShip.posZ.remove) {
        SpaceShip.inScene = false;
        SceneSetup.scene.remove(SpaceShip.asset.scene!);

        removeAnimationFrame(animate);
      }
    };

    pushAnimationFrame(animate);
  }

  static add() {
    if (SpaceShip.inScene || !SpaceShip.asset.scene) return;

    SceneSetup.scene.add(SpaceShip.asset.scene!);
    // SpaceShip.asset.scene!.position.set(0, 0, -1);

    const animate = () => {
      const delta = SceneSetup.clock.getDelta();
      SpaceShip.asset.scene!.position.z -= 15 * delta;
      if (SpaceShip.asset.scene!.position.z < SpaceShip.posZ.add) {
        SpaceShip.inScene = true;
        // SceneSetup.scene.add(SpaceShip.asset.scene!);
        SpaceShip.updateResizeFactor();
        removeAnimationFrame(animate);
      }
    };

    pushAnimationFrame(animate);
  }

  static updateResizeFactor() {
    if (!SpaceShip.asset.scene) return;

    SpaceShip.asset.updateResizeFactor();
    const cl = (1200 - ClientDims.width) * 0.01;
    const pos = Math.max(Math.min(1.4, cl), -0.4);
    SpaceShip.posZ.add = pos;

    SpaceShip.asset.scene?.position.set(0, 0, pos);
  }
}

export { SpaceShip };

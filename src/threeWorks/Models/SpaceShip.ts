import { ModelAssetManager } from "@/threeWorks/AssetsManager/AssetManager";
import GlobalLoader from "@/threeWorks/AssetsManager/GlobalLoader";
import SceneSetup from "../SceneSetup";
import { pushAnimationFrame, removeAnimationFrame } from "../utils";

class SpaceShip {
  static asset: ModelAssetManager;
  static inScene = false;

  static init() {
    SpaceShip.asset = new ModelAssetManager("/3D/CockPit.glb", {
      addToScene: false,
    });
    GlobalLoader.pushFirst(SpaceShip.asset);

    SpaceShip.asset.setPosition(0, 0, -1);
  }

  static remove() {
    if (!SpaceShip.inScene || !SpaceShip.asset.scene) return;
    SceneSetup.scene.remove(SpaceShip.asset.scene!);

    const animate = () => {
      SpaceShip.asset.scene!.position.z += 1;
      if (SpaceShip.asset.scene!.position.z > 10) {
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
    SpaceShip.asset.scene!.position.set(0, 0, -1);

    const animate = () => {
      const delta = SceneSetup.clock.getDelta();
      SpaceShip.asset.scene!.position.z -= 0.1 * delta;
      if (SpaceShip.asset.scene!.position.z < -1) {
        SpaceShip.inScene = true;
        SceneSetup.scene.add(SpaceShip.asset.scene!);
        removeAnimationFrame(animate);
      }
    };

    pushAnimationFrame(animate);
  }
}

export { SpaceShip };

import { EffectComposer } from "postprocessing";
import ModelAssetManager from "../AssetsManager/AssetManager";
import { BlackHolePP } from "../PostProcessing/PostProcessing";

function blackHoleInit(effectComposer: EffectComposer) {
  const blackHoleAsset = new ModelAssetManager("/3D/blackhole.glb");
  blackHoleAsset.load((prog) => {});
  blackHoleAsset.setPosition(0, 0, 0);
  blackHoleAsset.setScale(0.6, 0.6, 0.6);

  blackHoleAsset.postProcess = function () {
    // const bloom = new BlackHolePP(effectComposer);
    //   if (blackHoleAsset.scene) blackHoleAsset.scene.visible = false;
    this.scene?.rotation.set(0.05, 0, 0.1);

    if (this.animMixer) {
      this.animMixer.timeScale = 0.1;
    }

    this.scene?.traverse((child) => {
      if (child.name === "Blackhole_ring") {
        // bloom.bloomEffect.selection.toggle(child);
        console.log("Added bloom");
      }
    });
  };

  return blackHoleAsset;
}

export default blackHoleInit;

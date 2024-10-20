import {
  SMAAEffect,
  SelectiveBloomEffect,
  EffectComposer,
  EffectPass,
  BlendFunction,
  GodRaysEffect,
} from "postprocessing";
import * as THREE from "three";
import SceneSetup from "../SceneSetup";

class BlackHolePP {
  composer;
  bloomEffect: SelectiveBloomEffect;
  godRaysEffect: GodRaysEffect | undefined;

  constructor(composer: EffectComposer) {
    this.composer = composer;
    this.bloomEffect = new SelectiveBloomEffect(
      SceneSetup.scene,
      SceneSetup.camera,
      {
        blendFunction: BlendFunction.ADD,
        mipmapBlur: true,
        luminanceThreshold: 0.4,
        luminanceSmoothing: 0.2,
        intensity: 0.9,
        radius: 0.6,
      }
    );
    this.bloomEffect.inverted = true;

    const effectPass = new EffectPass(SceneSetup.camera, this.bloomEffect);
    this.composer.addPass(effectPass);
  }

  initialize(mesh: any) {}
}

export { BlackHolePP };

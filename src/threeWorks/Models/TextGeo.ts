import * as THREE from "three";
import { FontLoader, Font } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import SceneSetup from "../SceneSetup";
import { CustomLoader, OnProgressFunc } from "../AssetsManager/GlobalLoader";
import { convertDOMRectToThreeJS, randomInRange } from "../utils";

interface TextArgs {
  text: string;
}

class FontRepo {
  static spaceAge: Font | null = null;
}

class FontManager implements CustomLoader {
  static loader = new FontLoader();
  font: Font | null = null;
  urlPath: string;
  afterLoad?: () => void;

  constructor(url: string, afterLoad?: () => void) {
    this.urlPath = url;
    this.afterLoad = afterLoad;
  }

  async load(prog: OnProgressFunc) {
    const font = await FontManager.loader.loadAsync(this.urlPath, prog);
    this.font = font;

    if (this.afterLoad) this.afterLoad();
  }
}

const textGeo = async (text: string, anchor: HTMLDivElement) => {
  if (!FontRepo.spaceAge) {
    // await FontManager.loadFonts();
    throw new Error("Load the fonts first!");
  }

  const geo = convertDOMRectToThreeJS(anchor.getBoundingClientRect());
  const maxWidth = geo.width;
  const maxHeight = geo.height;
  console.log(geo);

  console.log(FontRepo.spaceAge);

  const geometry = new TextGeometry(text, {
    font: FontRepo.spaceAge,
    size: geo.width,
    depth: 0.01,
    curveSegments: 2,
  });

  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;

  if (boundingBox) {
    const textWidth = boundingBox.max.x - boundingBox.min.x;
    const textHeight = boundingBox.max.y - boundingBox.min.y;

    // Calculate the scale factor for both width and height
    const scaleFactor = Math.min(maxWidth / textWidth, maxHeight / textHeight);

    // Apply the scale factor to resize the text geometry
    geometry.scale(scaleFactor, scaleFactor, 1);
  }

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: false,
    metalness: 0.8,
    roughness: 0.1,
    emissiveIntensity: randomInRange(0.5, 1),
    emissive: 0xffffff,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(
    geo.position.x - geo.width / 2,
    geo.position.y - geo.height / 2,
    geo.position.z
  );
  //   mesh.scale.set(0.2, 0.2, 0.2);

  SceneSetup.scene.add(mesh);
};

export { textGeo, FontManager, FontRepo };

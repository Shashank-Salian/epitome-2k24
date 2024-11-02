import * as THREE from "three";

import { ModelAssetManager } from "../AssetsManager/AssetManager";
import { ClientDims, throttle } from "../utils";
import SceneSetup from "../SceneSetup";

type EventRayCastFunc = (obj: THREE.Object3D, mousePos: THREE.Vector2) => void;

type EventRayCastData = {
  object: THREE.Object3D;
  onMouseDown?: EventRayCastFunc | null;
  onMouseMove?: EventRayCastFunc | null;
};

type MouseData = {
  down: boolean;
  x: number;
  y: number;
  inertia: number;
  selectedModel: THREE.Object3D | null;
};

class EventsRayCaster {
  static raycaster: THREE.Raycaster = new THREE.Raycaster();
  static listenObjects: THREE.Group = new THREE.Group();
  static mouse: MouseData = {
    down: false,
    x: -1,
    y: -1,
    selectedModel: null,
    inertia: 0,
  };
  //   static listenObjectsData: { [key: string]: EventRayCastData } = {};

  static init() {
    // EventsRayCaster.listenObjects = eventsGroup;

    document.addEventListener("mousedown", EventsRayCaster._onMouseDown);
    document.addEventListener("mouseup", EventsRayCaster._onMouseUp);
    document.addEventListener(
      "mousemove",
      throttle((e) => EventsRayCaster._onMouseMove(e), 50)
    );
  }

  private static _onMouseMove(e: MouseEvent) {
    if (!EventsRayCaster.mouse.down) return;

    if (EventsRayCaster.mouse.selectedModel) {
      const obj = EventsRayCaster.mouse.selectedModel;

      const rotateFactor = 0.3;
      EventsRayCaster.mouse.inertia = e.clientX - EventsRayCaster.mouse.x;
      const rotateDir = EventsRayCaster.mouse.inertia < 0 ? -1 : 1;

      console.log(EventsRayCaster.mouse.inertia);
      obj.rotateY(rotateFactor * rotateDir);

      EventsRayCaster.mouse.x = e.clientX;
      EventsRayCaster.mouse.y = e.clientY;
    }
  }

  private static _onMouseDown(e: MouseEvent) {
    if (EventsRayCaster.listenObjects.children.length === 0) return;

    EventsRayCaster.mouse.down = true;
    EventsRayCaster.mouse.x = e.clientX;
    EventsRayCaster.mouse.y = e.clientY;

    const mousePos = ClientDims.toNDC(e.clientX, e.clientY);
    EventsRayCaster.raycaster.setFromCamera(mousePos, SceneSetup.camera);

    const interObjects = EventsRayCaster.raycaster.intersectObjects(
      EventsRayCaster.listenObjects.children,
      true
    );
    if (interObjects.length > 0) {
      const obj = interObjects[0].object;
      EventsRayCaster.mouse.selectedModel = obj;
    }
  }

  private static _onMouseUp(e: MouseEvent) {
    EventsRayCaster.mouse.down = false;
    EventsRayCaster.mouse.x = -1;
    EventsRayCaster.mouse.y = -1;

    // Inertia Decay Factor
    const decayFactor = 0.5;
    const minInertiaThreshold = 1;

    const interval = setInterval(() => {
      if (Math.abs(EventsRayCaster.mouse.inertia) < minInertiaThreshold) {
        clearInterval(interval);
        EventsRayCaster.mouse.selectedModel = null;
        EventsRayCaster.mouse.inertia = 0;
        return;
      }

      // Apply inertia rotation with decay
      const rotateDir = EventsRayCaster.mouse.inertia < 0 ? -1 : 1;
      EventsRayCaster.mouse.selectedModel?.rotateY(
        Math.abs(EventsRayCaster.mouse.inertia) * 0.009 * rotateDir
      );

      // Reduce inertia gradually
      EventsRayCaster.mouse.inertia *= decayFactor;
    }, 50);
  }
}

function initEventsModel(url: string) {
  const eventModel = new ModelAssetManager(url, {
    group: EventsRayCaster.listenObjects,
    modelName: "MadAds",
  });
  eventModel.scalingFactor = {
    screen: 1300,
    max: 1.2,
    min: 0.8,
  };
  eventModel.positionFactor.x = {
    ...eventModel.positionFactor.x,
    screen: 1300,
  };

  return eventModel;
}

export { initEventsModel, EventsRayCaster };
export type { EventRayCastFunc, EventRayCastData };

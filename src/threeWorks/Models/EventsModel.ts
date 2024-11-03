import * as THREE from "three";

import { ModelAssetManager } from "../AssetsManager/AssetManager";
import {
  ClientDims,
  pushAnimationFrame,
  removeAnimationFrame,
  throttle,
} from "../utils";
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

type MouseCoords = {
  clientX: number;
  clientY: number;
};

const outCircleCurve = new THREE.EllipseCurve(
  3.9,
  -3.3,
  4,
  4,
  Math.PI * 0.69,
  Math.PI,
  false
);

const inCircleCurve = new THREE.EllipseCurve(
  3.9,
  -3.3,
  4,
  4,
  0,
  Math.PI * 0.69,
  false
);

// Generate points on the circle
const outPoints = outCircleCurve.getPoints(100);
const inPoints = inCircleCurve.getPoints(100);

// Development purpose
const geometry = new THREE.BufferGeometry().setFromPoints(outPoints);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const circleLine = new THREE.Line(geometry, material);
const geometry2 = new THREE.BufferGeometry().setFromPoints(inPoints);
const material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const circleLine2 = new THREE.Line(geometry2, material2);
SceneSetup.scene.add(circleLine2);
SceneSetup.scene.add(circleLine);

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
  static curModelIndex = 0;
  static velocity = 0;
  static eventsModels: ModelAssetManager[] = [];
  static transitioning = false;

  static init() {
    pushAnimationFrame(() => {
      const obj = EventsRayCaster.listenObjects.children[0];
      if (obj && !EventsRayCaster.mouse.selectedModel) {
        if (EventsRayCaster.velocity < 0.01) {
          EventsRayCaster.velocity += 0.00004;
        }
        // EventsRayCaster.velocity -= 0.00004;
        obj.rotation.y -= EventsRayCaster.velocity;
      }
    });

    document.addEventListener("touchstart", (e) => {
      EventsRayCaster._onMouseDown({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
    });
    document.addEventListener("touchmove", (e) => {
      EventsRayCaster._onMouseMove({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
    });

    document.addEventListener("touchend", EventsRayCaster._onMouseUp);

    document.addEventListener("mousedown", EventsRayCaster._onMouseDown);
    document.addEventListener("mouseup", EventsRayCaster._onMouseUp);
    document.addEventListener(
      "mousemove",
      throttle((e) => EventsRayCaster._onMouseMove(e), 50)
    );
  }

  private static _onMouseMove({ clientX, clientY }: MouseCoords) {
    if (!EventsRayCaster.mouse.down) return;

    if (EventsRayCaster.mouse.selectedModel) {
      const obj = EventsRayCaster.mouse.selectedModel;

      const rotateFactor = 0.3;
      EventsRayCaster.mouse.inertia = clientX - EventsRayCaster.mouse.x;
      const rotateDir = EventsRayCaster.mouse.inertia < 0 ? -1 : 1;

      obj.rotateY(rotateFactor * rotateDir);

      EventsRayCaster.mouse.x = clientX;
      EventsRayCaster.mouse.y = clientY;
    }
  }

  private static _onMouseDown({ clientX, clientY }: MouseCoords) {
    if (EventsRayCaster.listenObjects.children.length === 0) return;

    const mousePos = ClientDims.toNDC(clientX, clientY);
    EventsRayCaster.raycaster.setFromCamera(mousePos, SceneSetup.camera);

    const interObjects = EventsRayCaster.raycaster.intersectObjects(
      EventsRayCaster.listenObjects.children,
      true
    );
    if (interObjects.length > 0) {
      EventsRayCaster.mouse.down = true;
      EventsRayCaster.mouse.x = clientX;
      EventsRayCaster.mouse.y = clientY;
      EventsRayCaster.velocity = 0;
      document.body.style.cursor = "grabbing";

      const obj = interObjects[0].object;
      EventsRayCaster.mouse.selectedModel = obj;
    }
  }

  private static _onMouseUp() {
    if (!EventsRayCaster.mouse.down) return;

    EventsRayCaster.mouse.down = false;
    EventsRayCaster.mouse.x = -1;
    EventsRayCaster.mouse.y = -1;
    EventsRayCaster.velocity = 0;
    document.body.style.cursor = "auto";

    // Inertia Decay Factor
    const decayFactor = 0.75;
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
        Math.min(Math.abs(EventsRayCaster.mouse.inertia) * 0.009, 0.7) *
          rotateDir
      );

      // Reduce inertia gradually
      EventsRayCaster.mouse.inertia *= decayFactor;
    }, 50);
  }

  static moveEvent(next = true) {
    if (EventsRayCaster.transitioning) return;

    EventsRayCaster.transitioning = true;
    const outgoingModel =
      EventsRayCaster.eventsModels[EventsRayCaster.curModelIndex].scene!;

    EventsRayCaster.curModelIndex += next ? 1 : -1;
    if (EventsRayCaster.curModelIndex >= EventsRayCaster.eventsModels.length) {
      EventsRayCaster.curModelIndex = 0;
    }
    if (EventsRayCaster.curModelIndex < 0) {
      EventsRayCaster.curModelIndex = EventsRayCaster.eventsModels.length - 1;
    }

    const incomingModel =
      EventsRayCaster.eventsModels[EventsRayCaster.curModelIndex].scene!;

    EventsRayCaster.listenObjects.add(incomingModel);

    const postTransition = () => {
      removeAnimationFrame(animFunc);
      SceneSetup.background.index =
        (SceneSetup.background.index + (next ? 1 : -1)) %
        SceneSetup.colorSets.length;

      if (SceneSetup.background.index < 0)
        SceneSetup.background.index = SceneSetup.colorSets.length - 1;

      EventsRayCaster.listenObjects.remove(outgoingModel);

      EventsRayCaster.transitioning = false;
    };

    let progress = 0;
    let fProg = 0;
    let direction: 1 | -1 = 1;
    let oModel = outgoingModel;
    let iModel = incomingModel;
    if (!next) {
      oModel = incomingModel;
      iModel = outgoingModel;
      progress = 1;
      direction = -1;
    }

    const speed = 0.007; // Adjust this value to control speed
    const animFunc = () => {
      progress += speed * direction;
      fProg += speed;

      if (fProg >= 1) {
        progress = 0;
        fProg = 0;
        postTransition();

        return;
      }

      // Get the point on the curve based on the current progress
      const outgoingPoint = outCircleCurve.getPoint(progress);
      const incomingPoint = inCircleCurve.getPoint(progress);

      // Move the model to the point
      oModel.position.set(outgoingPoint.x, outgoingPoint.y, oModel.position.z);
      iModel.position.set(incomingPoint.x, incomingPoint.y, iModel.position.z);

      SceneSetup.changeBg(fProg, direction);
    };

    pushAnimationFrame(animFunc);
  }
}

function initEventsModel(url: string, addToScene = false) {
  const eventModel = new ModelAssetManager(url, {
    group: EventsRayCaster.listenObjects,
    modelName: "MadAds",
    addToScene,
    onLoaded: () => {
      const pos = outCircleCurve.getPointAt(0);
      eventModel.scene!.position.set(pos.x, pos.y, 0);
    },
    onResize: () => {
      const pos = outCircleCurve.getPointAt(0);
      eventModel.scene!.position.set(pos.x, pos.y, 0);
    },
  });

  eventModel.setPosition(0.2, 0, 0);

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

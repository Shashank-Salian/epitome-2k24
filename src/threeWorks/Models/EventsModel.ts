import * as THREE from "three";

import { ModelAssetManager } from "../AssetsManager/AssetManager";
import {
  ClientDims,
  MOBILE_WIDTH,
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

const outCircleParams = {
  ax: 3.9,
  ay: -3.5,
  xRadius: 4,
  yRadius: 4,
  aStartAngle: Math.PI * 0.69,
  aEndAngle: Math.PI,
  anticlockwise: false,
};

const inCircleParams = {
  ax: 3.9,
  ay: -3.5,
  xRadius: 4,
  yRadius: 4,
  aStartAngle: Math.PI * 0.3,
  aEndAngle: Math.PI * 0.69,
};

const outCircleCurve = new THREE.EllipseCurve(
  outCircleParams.ax,
  outCircleParams.ay,
  outCircleParams.xRadius,
  outCircleParams.yRadius,
  outCircleParams.aStartAngle,
  outCircleParams.aEndAngle,
  false
);

const inCircleCurve = new THREE.EllipseCurve(
  inCircleParams.ax,
  inCircleParams.ay,
  inCircleParams.xRadius,
  inCircleParams.yRadius,
  inCircleParams.aStartAngle,
  Math.PI * inCircleParams.aEndAngle,
  false
);

//   Dev purpose:
// let geometry = new THREE.BufferGeometry().setFromPoints(
//   outCircleCurve.getPoints(100)
// );
// let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
// let circleLine = new THREE.Line(geometry, material);
// let geometry2 = new THREE.BufferGeometry().setFromPoints(
//   inCircleCurve.getPoints(100)
// );
// let material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
// let circleLine2 = new THREE.Line(geometry2, material2);
// SceneSetup.scene.add(circleLine2);
// SceneSetup.scene.add(circleLine);

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
  static removing = false;

  static init() {
    updateCurvePath();

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

  static moveEvent(next = true, first = false) {
    if (EventsRayCaster.transitioning) return;

    EventsRayCaster.transitioning = true;
    const outgoingModel = first
      ? null
      : EventsRayCaster.eventsModels[EventsRayCaster.curModelIndex].scene!;

    EventsRayCaster.curModelIndex += next ? 1 : -1;
    if (
      EventsRayCaster.curModelIndex >= EventsRayCaster.eventsModels.length ||
      first
    ) {
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

      if (outgoingModel) EventsRayCaster.listenObjects.remove(outgoingModel);

      EventsRayCaster.transitioning = false;
    };

    let progress = 0;
    let fProg = 0;
    let direction: 1 | -1 = 1;
    let oModel = outgoingModel;
    let iModel = incomingModel;
    if (!next) {
      oModel = incomingModel;
      iModel = outgoingModel || incomingModel;
      progress = 1;
      direction = -1;
    }

    const speed = first ? 2 : 1; // Adjust this value to control speed
    const animFunc = () => {
      const delta = SceneSetup.clock.getDelta();
      progress += speed * direction * delta;
      fProg += speed * delta;

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
      if (oModel) {
        oModel.position.set(
          outgoingPoint.x,
          outgoingPoint.y,
          oModel.position.z
        );
      }
      iModel.position.set(incomingPoint.x, incomingPoint.y, iModel.position.z);

      SceneSetup.changeBg(fProg, direction);
    };

    pushAnimationFrame(animFunc);
  }

  public static removeEvents() {
    if (
      EventsRayCaster.listenObjects.children.length === 0 ||
      EventsRayCaster.removing
    )
      return;

    EventsRayCaster.removing = true;

    const movingObj = EventsRayCaster.listenObjects.children[0];

    let progress = 0;
    const speed = 4;
    const animFunc = () => {
      const delta = SceneSetup.clock.getDelta();
      progress += speed * delta;

      if (progress >= 1) {
        EventsRayCaster.listenObjects.remove(
          ...EventsRayCaster.listenObjects.children
        );
        removeAnimationFrame(animFunc);
        EventsRayCaster.removing = false;
        return;
      }

      // Get the point on the curve based on the current progress
      const outgoingPoint = outCircleCurve.getPoint(progress);

      // Move the model to the point
      movingObj.position.set(
        outgoingPoint.x,
        outgoingPoint.y,
        movingObj.position.z
      );

      SceneSetup.changeBg(progress, -1);
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
      eventModel.scene?.position.set(pos.x, pos.y, 0);
    },
  });

  eventModel.setPosition(0.2, 0, 0);

  eventModel.scalingFactor = {
    screen: 1800,
    max: 0.9,
    min: 0.5,
  };

  return eventModel;
}

function updateCurvePath() {
  if (window.innerWidth >= MOBILE_WIDTH) {
    const ax = Math.max(
      4,
      Math.min(4, inCircleCurve.aX * (ClientDims.width / 1200))
    );
    inCircleCurve.aX = outCircleCurve.aX = ax;

    inCircleCurve.aY = inCircleParams.ay;
    outCircleCurve.aY = outCircleParams.ay;

    inCircleCurve.xRadius = inCircleParams.xRadius;
    outCircleCurve.xRadius = outCircleParams.xRadius;

    inCircleCurve.aStartAngle = inCircleParams.aStartAngle;
    outCircleCurve.aStartAngle = outCircleParams.aStartAngle;

    inCircleCurve.aEndAngle = inCircleParams.aEndAngle;
    outCircleCurve.aEndAngle = outCircleParams.aEndAngle;
  } else {
    inCircleCurve.aX = outCircleCurve.aX = 0;
    inCircleCurve.aY = outCircleCurve.aY = -5.5;

    inCircleCurve.xRadius = outCircleCurve.xRadius = 2;

    inCircleCurve.aStartAngle = Math.PI * 0.3;
    inCircleCurve.aEndAngle = Math.PI * 0.5;

    outCircleCurve.aStartAngle = Math.PI * 0.5;
    outCircleCurve.aEndAngle = Math.PI * 0.7;
  }

  //   SceneSetup.scene.remove(circleLine);
  //   SceneSetup.scene.remove(circleLine2);

  //   geometry = new THREE.BufferGeometry().setFromPoints(
  //     outCircleCurve.getPoints(100)
  //   );
  //   material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  //   circleLine = new THREE.Line(geometry, material);
  //   geometry2 = new THREE.BufferGeometry().setFromPoints(
  //     inCircleCurve.getPoints(100)
  //   );
  //   material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  //   circleLine2 = new THREE.Line(geometry2, material2);

  //   SceneSetup.scene.add(circleLine);
  //   SceneSetup.scene.add(circleLine2);
}

export { initEventsModel, EventsRayCaster, updateCurvePath };
export type { EventRayCastFunc, EventRayCastData };

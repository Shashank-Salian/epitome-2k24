"use client";

import * as THREE from "three";
import SceneSetup from "./SceneSetup";
import { SpaceShip } from "./Models/SpaceShip";

// Array of functions which will be run on every frame
const UPDATE_FUNCS: (() => void)[] = [];

const MOBILE_WIDTH = 1024;

class ClientDims {
  static mouseX = 0;
  static mouseY = 0;

  static get width() {
    return document.documentElement.clientWidth;
  }

  static get height() {
    return window.innerHeight;
  }

  static initMouseEvent() {
    window.addEventListener(
      "mousemove",
      throttle((e) => {
        const { x, y } = ClientDims.toNDC(e.clientX, e.clientY);
        ClientDims.mouseX = x;
        ClientDims.mouseY = y;
      }, 50)
    );
  }

  static toNDC(x: number, y: number) {
    const xNDC = (x / window.innerWidth) * 2 - 1;
    const yNDC = -(y / window.innerHeight) * 2 + 1;

    return new THREE.Vector2(xNDC, yNDC);
  }
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function debounce<T extends any[]>(
  callback: (...args: T) => void,
  delay: number = 1000
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function throttle<T extends any[]>(
  callback: (...args: T) => void,
  delay: number = 1000
) {
  let shouldWait = false;
  let waitingArgs: T | null = null;

  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: T) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

function randomSelect<T>(arr: T[], threshold = 0.5): T[] {
  return arr.filter(() => Math.random() < threshold);
}

function convertDOMRectToThreeJS(rect: DOMRect) {
  const { left, top, width, height } = rect;

  // Convert DOM coordinates to normalized device coordinates (NDC)
  const xNDC = ((left + width / 2) / window.innerWidth) * 2 - 1;
  const yNDC = -((top + height / 2) / window.innerHeight) * 2 + 1;

  // Create a 3D vector for the position in NDC space
  const vector = new THREE.Vector3(xNDC, yNDC, 0.5); // z=0.5 for midpoint depth

  // Unproject this NDC point to 3D space
  vector.unproject(SceneSetup.camera);

  // Calculate scale factors to adjust size based on depth
  const distance = SceneSetup.camera.position.distanceTo(vector);
  const sizeFactor =
    distance / (SceneSetup.camera.projectionMatrix.elements[5] * 2);

  // Convert the 2D width and height to 3D scale
  const widthIn3D = (width / window.innerWidth) * 2 * sizeFactor;
  const heightIn3D = (height / window.innerHeight) * 2 * sizeFactor;

  // Return the 3D position and size
  return {
    position: vector,
    width: widthIn3D,
    height: heightIn3D,
  };
}

function pushAnimationFrame(callback: () => void) {
  UPDATE_FUNCS.push(callback);
}

function removeAnimationFrame(callback: () => void) {
  UPDATE_FUNCS.splice(UPDATE_FUNCS.indexOf(callback), 1);
}

function onRouteChange(rote?: string) {
  SceneSetup.update();

  SpaceShip.updateResizeFactor();
}

export {
  ClientDims,
  randomInRange,
  debounce,
  throttle,
  randomSelect,
  convertDOMRectToThreeJS,
  pushAnimationFrame,
  onRouteChange,
  UPDATE_FUNCS,
  removeAnimationFrame,
  MOBILE_WIDTH,
};

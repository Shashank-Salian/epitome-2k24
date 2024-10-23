"use client";

class ClientDims {
  static get width() {
    return document.documentElement.clientWidth;
  }

  static get height() {
    return document.documentElement.clientHeight;
  }
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export { ClientDims, randomInRange };

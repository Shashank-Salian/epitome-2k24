"use client";

class ClientDims {
  static get width() {
    return document.documentElement.clientWidth;
  }

  static get height() {
    return document.documentElement.clientHeight;
  }
}

export { ClientDims };

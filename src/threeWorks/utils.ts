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

export { ClientDims, randomInRange, debounce, throttle, randomSelect };

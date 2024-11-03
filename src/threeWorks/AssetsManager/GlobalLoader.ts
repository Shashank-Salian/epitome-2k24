import { throttle } from "../utils";

type OnProgressFunc = (prog: ProgressEvent) => void;

interface CustomLoader {
  load: (onProgress: OnProgressFunc) => Promise<void>;
}

enum LoadingState {
  IDLE,
  LOADING,
  LOADED,
  ERROR,
}

type LoaderArray = {
  loader: CustomLoader;
  onProgress: (prog: ProgressEvent) => void;
  progress: number;
  completed: boolean;
}[];

class GlobalLoader {
  static firstPriorLoaders: LoaderArray = [];
  static secondPriorLoaders: LoaderArray = [];
  static thirdPriorLoaders: LoaderArray = [];
  static globalProgress: number = 0;
  static onProgressChange: (prog: number) => void | undefined;
  static loadingState: LoadingState = LoadingState.IDLE;

  static loadFirst() {
    GlobalLoader.loadingState = LoadingState.LOADING;
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < GlobalLoader.firstPriorLoaders.length; i++) {
        const { loader, onProgress } = GlobalLoader.firstPriorLoaders[i];
        loader
          .load(onProgress)
          .then(() => {
            GlobalLoader.firstPriorLoaders[i].completed = true;

            if (GlobalLoader.firstPriorLoaders.every((l) => l.completed)) {
              resolve();
              GlobalLoader.loadingState = LoadingState.LOADED;
            }
          })
          .catch((err) => {
            GlobalLoader.loadingState = LoadingState.ERROR;
            reject(err);
          });
      }
    });
  }

  static pushFirst(loader: CustomLoader) {
    const idx = GlobalLoader.firstPriorLoaders.length;
    GlobalLoader.firstPriorLoaders.push({
      loader,
      onProgress: (prog) => {
        GlobalLoader.onIndividualProgress(prog, idx);
      },
      progress: 0,
      completed: false,
    });
  }

  private static onIndividualProgress(prog: ProgressEvent, i: number) {
    const percent = prog.total === 0 ? 100 : (prog.loaded / prog.total) * 100;

    GlobalLoader.firstPriorLoaders[i].progress = percent;

    // console.log(`Percent : ${percent}`);

    throttle(GlobalLoader.updateGlobalProgress, 100)();
    // GlobalLoader.updateGlobalProgress();
  }

  static updateGlobalProgress() {
    let total = 0;
    for (let i = 0; i < GlobalLoader.firstPriorLoaders.length; i++) {
      total += GlobalLoader.firstPriorLoaders[i].progress;
    }

    for (let i = 0; i < GlobalLoader.secondPriorLoaders.length; i++) {
      total += GlobalLoader.secondPriorLoaders[i].progress;
    }

    for (let i = 0; i < GlobalLoader.thirdPriorLoaders.length; i++) {
      total += GlobalLoader.thirdPriorLoaders[i].progress;
    }

    const totalProgress =
      total /
      (GlobalLoader.firstPriorLoaders.length +
        GlobalLoader.secondPriorLoaders.length +
        GlobalLoader.thirdPriorLoaders.length);

    console.log(totalProgress);

    GlobalLoader.globalProgress = totalProgress;

    if (GlobalLoader.onProgressChange) {
      GlobalLoader.onProgressChange(totalProgress);
    }
  }
}

export default GlobalLoader;
export type { CustomLoader, OnProgressFunc };
export { LoadingState };

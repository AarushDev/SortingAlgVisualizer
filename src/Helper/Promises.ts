export const showSelectTimeoutPromise = (signal: AbortSignal, speed: number) =>
  new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, 500 / speed);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Sortin Aborted"));
    });
  });

export const swapTimeoutPromise = (signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, 100);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Sortin Aborted"));
    });
  });

export const bogoTimeoutPromise = (signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, 0);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Sortin Aborted"));
    });
  });

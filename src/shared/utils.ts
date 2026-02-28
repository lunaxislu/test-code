export type Fn<Args extends unknown[] = unknown[], R = unknown> = (
  ...args: Args
) => R;

export function debounce<T extends Fn>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

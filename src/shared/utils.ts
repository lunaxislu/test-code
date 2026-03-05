export type Fn<Args extends unknown[] = unknown[], R = unknown> = (
  ...args: Args
) => R;

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

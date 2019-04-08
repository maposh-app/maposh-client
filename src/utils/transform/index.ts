import config from "../../config";

interface IParams {
  [key: string]: string;
}
interface IOption {
  value: string;
  label: string;
}

type IOptions = IOption[];

export function selectify(block: IParams): IOptions {
  const options: IOptions = Object.keys(block).map(key => {
    return { value: key, label: block[key] };
  });
  return options;
}

// adapted from https://gist.github.com/mlocati/7210513
export function percentage2color(percentage: number) {
  const colors = config.map.foursquare.colors;
  return colors[Math.round((percentage * (colors.length - 1)) / 100)];
}

export const hexToRGBA = (hex: string, alpha: number) => {
  hex = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;

  if (hex.length !== 6) {
    alert("Invalid length of the input hex value!");
    return;
  }
  if (/[0-9a-f]{6}/i.test(hex) !== true) {
    alert("Invalid digits in the input hex value!");
    return;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b, alpha * 255];
};

export function union<T>(...iterables: Array<Set<T>>): Set<T> {
  const set = new Set<T>();
  iterables.forEach(iterable => {
    iterable.forEach(item => set.add(item));
  });
  return set;
}

export { default as mutations } from "./mutations";

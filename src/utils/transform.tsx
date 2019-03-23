import config from "../config";

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

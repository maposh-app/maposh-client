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

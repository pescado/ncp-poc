export interface IInputProps extends IOnClickHandler {
  suggestions?: string[];
  placeholder: string;
  loading: boolean;
}

export interface IOnClickHandler {
  onClickFlightReference: (value: string) => void;
}

export interface ICity {
  id: number;
  name: string;
}

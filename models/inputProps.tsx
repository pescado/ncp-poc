export interface IInputProps extends IOnClickHandler {
  suggestions?: string[];
  placeholder: string;
}

export interface IOnClickHandler {
  onClickFlightReference: (value: string) => void;
}

import { ICity } from './FlightSearchData';

export interface IInputProps extends IOnClickHandler {
  suggestions?: ICity[];
  placeholder: string;
  loading: boolean;
}

export interface IOnClickHandler {
  onClickFlightReference: (value: string) => void;
}

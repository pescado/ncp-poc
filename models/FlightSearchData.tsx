export interface FlightSearchData {
  error: string;
  msg: string;
  data: CountryInfo;
}

export interface CountryInfo {
  name: string;
  iso3: string;
  iso2: string;
  states: StateInfo[];
}

export interface StateInfo {
  name: string;
  state_code: string;
}

export interface ICity {
  id: number;
  name: string;
}

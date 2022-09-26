export interface FlightSelectData {
    error: string,
    msg: string,
    data: CountryInfo;
  }
  
 export interface CountryInfo {
    name: string,
    iso3: string,
    iso2: string,
    states: StateInfo[],
  }
  
export interface StateInfo {
    name: string;
    state_code: string;
  }
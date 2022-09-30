import { ICity } from "../models/FlightSearchData";

const delay = () => new Promise((res) => setTimeout(() => res(null), 1500));

let cities = [
  {id: Date.now(), name: 'Denver'},
  {id: Date.now() + 1, name: 'Atlanta'},
  {id: Date.now() + 2, name: 'Portland'},
  {id: Date.now() + 3, name: 'Raleigh'},
];

export async function getCities(): Promise<ICity[]> {
  console.log('API getCities');
  await delay();
  return cities;
}

export async function addCity(city: ICity) {
  await delay();
  // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
  cities = [...cities, city];
  return cities;
}
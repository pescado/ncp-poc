const delay = () => new Promise((res) => setTimeout(() => res(), 1500));
let todos = [{id: 1, text: 'previously saved todo'}];
let cities = [
  {id: Date.now(), name: 'Denver'},
  {id: Date.now() + 1, name: 'Atlanta'},
  {id: Date.now() + 2, name: 'Portland'},
  {id: Date.now() + 3, name: 'Raleigh'},
];

export async function getTodos() {
  console.log('API getTodos() called');
  await delay();
  console.log('API getTodos returned');
  return todos;
}

export async function addTodo(todo) {
  await delay();
  // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
  todos = [...todos, todo];
  return todos;
}

export async function getCities() {
  console.log('API getCities');
  await delay();
  return cities;
}

export async function addCity(city) {
  await delay();
  // city.name === 'Dallas' ? city.name = 'Dallassssss' : city.name;
  cities = [...cities, city];
  return cities;
}
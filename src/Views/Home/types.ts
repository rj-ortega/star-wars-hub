export type Person = {
  name: string;
  species: string[];
  url: string;
};

export type People = {
  [speciesUrl: string]: Person[];
};

export type DetailedPerson = Person & {
  height: string;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string;
  vehicles: string[];
  starships: string[];
};

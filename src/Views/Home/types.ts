export type Person = {
  name: string;
  species: string[];
};

export type People = {
  [speciesUrl: string]: Person[];
};

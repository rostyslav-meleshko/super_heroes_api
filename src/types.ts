interface ISimpleParams {
  [key: string]: string | number;
}

interface IArrayParams {
  [key: string]: string | string[];
}

interface Appearance extends IArrayParams {
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string[];
  race: string;
  weight: string[];
}

interface Biography extends IArrayParams {
  aliases: string[];
  alignment: string;
  alterEgos: string;
  firstAppearance: string;
  fullName: string;
  placeOfBirth: string;
  publisher: string;
}

interface Connections extends ISimpleParams {
  groupAffiliation: string;
  relatives: string;
}

interface Images {
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

interface Powerstats extends ISimpleParams {
  combat: number;
  durability: number;
  intelligence: number;
  power: number;
  speed: number;
  strength: number;
}

interface Work extends ISimpleParams {
  base: string;
  occupation: string;
}

export interface HeroData {
  id: number;
  appearance: Appearance;
  biography: Biography;
  connections: Connections;
  images: Images;
  name: string;
  powerstats: Powerstats;
  slug: string;
  work: Work;
  isFavorite?: boolean;
}

export enum UrlSearchOptions {
  HeroName = "heroName",
  IsFavorite = "isFavorites",
}

export enum ServerFetchUrls {
  AllHeroes = "https://akabab.github.io/superhero-api/api/all.json",
  HeroDataById = "https://akabab.github.io/superhero-api/api/id/",
  WrongUrl = "https://akabab.github.io/superhero-api/api/0.json",
}

export enum SessionStorage {
  FavoriteHeroes = "FavoriteHeroes",
}

export type favoriteID = {
  [key: number]: boolean;
};

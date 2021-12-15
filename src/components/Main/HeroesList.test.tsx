import { render, screen, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

import store from "store/rootStore";
import HeroesList from "components/Main/HeroesList";

const hero1 = {
  id: 1,
  appearance: {
    eyeColor: "black",
    gender: "male",
    hairColor: "black",
    height: ["6ft", "190cm"],
    race: "human",
    weight: ["5pd", "100kg"],
  },
  biography: {
    aliases: ["1", "2"],
    alignment: "good",
    alterEgos: "string",
    firstAppearance: "string",
    fullName: "string",
    placeOfBirth: "string",
    publisher: "string",
  },
  connections: { groupAffiliation: "string", relatives: "string" },
  images: {
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  },
  name: "A-Bomb",
  powerstats: {
    combat: 64,
    durability: 80,
    intelligence: 38,
    power: 24,
    speed: 17,
    strength: 100,
  },
  slug: "1-a-bomb",
  work: {
    base: "-",
    occupation: "Musician, adventurer, author; formerly talk show host",
  },
  isFavorite: false,
};
const hero2 = {
  id: 2,
  appearance: {
    eyeColor: "black",
    gender: "male",
    hairColor: "black",
    height: ["6ft", "190cm"],
    race: "human",
    weight: ["5pd", "100kg"],
  },
  biography: {
    aliases: ["1", "2"],
    alignment: "good",
    alterEgos: "string",
    firstAppearance: "string",
    fullName: "string",
    placeOfBirth: "string",
    publisher: "string",
  },
  connections: { groupAffiliation: "string", relatives: "string" },
  images: {
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  },
  name: "Abe Sapien",
  powerstats: {
    combat: 64,
    durability: 80,
    intelligence: 38,
    power: 24,
    speed: 17,
    strength: 100,
  },
  slug: "1-abe-sapien",
  work: {
    base: "-",
    occupation: "Musician, adventurer, author; formerly talk show host",
  },
  isFavorite: false,
};
const hero3 = {
  id: 3,
  appearance: {
    eyeColor: "black",
    gender: "male",
    hairColor: "black",
    height: ["6ft", "190cm"],
    race: "human",
    weight: ["5pd", "100kg"],
  },
  biography: {
    aliases: ["1", "2"],
    alignment: "good",
    alterEgos: "string",
    firstAppearance: "string",
    fullName: "string",
    placeOfBirth: "string",
    publisher: "string",
  },
  connections: { groupAffiliation: "string", relatives: "string" },
  images: {
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  },
  name: "Abin Sur",
  powerstats: {
    combat: 64,
    durability: 80,
    intelligence: 38,
    power: 24,
    speed: 17,
    strength: 100,
  },
  slug: "3-abin-sur",
  work: {
    base: "-",
    occupation: "Musician, adventurer, author; formerly talk show host",
  },
  isFavorite: true,
};
const heroesArray = [hero1, hero2, hero3];

const heroesListProps = {
  isMobile: false,
  showedHeroes: heroesArray,
};

describe("HeroesList", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <HashRouter>
          <HeroesList {...heroesListProps} />
        </HashRouter>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("should render heroes accordingly", () => {
    heroesArray.forEach((hero) =>
      expect(screen.getByText(hero.name)).toBeTruthy()
    );
  });

  it("should show empty heart icon at not favourite hero, when isFavorite:false", () => {
    expect(
      screen.getByTestId(`icon-not-favorite-${hero1.id}`)
    ).toBeInTheDocument();
  });

  it("should show filled heart icon at favourite hero, when isFavorite:true", () => {
    expect(screen.getByTestId(`icon-favorite-${hero3.id}`)).toBeInTheDocument();
  });
});

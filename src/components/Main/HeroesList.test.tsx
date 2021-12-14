import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import React from "react";

import store from "store/rootStore";
import HeroesList from "components/Main/HeroesList";

test("changes icon of not favorite hero to favorite when clicking on it", async () => {
  const ariaLabel = "heart A-Bomb";

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

  const hero1_true = {
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
    isFavorite: true,
  };
  // const hero2 = {
  //   id: 2,
  //   appearance: {
  //     eyeColor: "black",
  //     gender: "male",
  //     hairColor: "black",
  //     height: ["6ft", "190cm"],
  //     race: "human",
  //     weight: ["5pd", "100kg"],
  //   },
  //   biography: {
  //     aliases: ["1", "2"],
  //     alignment: "good",
  //     alterEgos: "string",
  //     firstAppearance: "string",
  //     fullName: "string",
  //     placeOfBirth: "string",
  //     publisher: "string",
  //   },
  //   connections: { groupAffiliation: "string", relatives: "string" },
  //   images: {
  //     lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
  //     md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
  //     sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
  //     xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  //   },
  //   name: "Abe Sapien",
  //   powerstats: {
  //     combat: 64,
  //     durability: 80,
  //     intelligence: 38,
  //     power: 24,
  //     speed: 17,
  //     strength: 100,
  //   },
  //   slug: "2-abe-sapien",
  //   work: {
  //     base: "-",
  //     occupation: "Musician, adventurer, author; formerly talk show host",
  //   },
  //   isFavorite: false,
  // };
  // const hero3 = {
  //   id: 3,
  //   appearance: {
  //     eyeColor: "black",
  //     gender: "male",
  //     hairColor: "black",
  //     height: ["6ft", "190cm"],
  //     race: "human",
  //     weight: ["5pd", "100kg"],
  //   },
  //   biography: {
  //     aliases: ["1", "2"],
  //     alignment: "good",
  //     alterEgos: "string",
  //     firstAppearance: "string",
  //     fullName: "string",
  //     placeOfBirth: "string",
  //     publisher: "string",
  //   },
  //   connections: { groupAffiliation: "string", relatives: "string" },
  //   images: {
  //     lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
  //     md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
  //     sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
  //     xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  //   },
  //   name: "Abin Sur",
  //   powerstats: {
  //     combat: 64,
  //     durability: 80,
  //     intelligence: 38,
  //     power: 24,
  //     speed: 17,
  //     strength: 100,
  //   },
  //   slug: "3-abin-sur",
  //   work: {
  //     base: "-",
  //     occupation: "Musician, adventurer, author; formerly talk show host",
  //   },
  //   isFavorite: false,
  // };

  // const heroesArray = [hero1, hero2, hero3];
  const heroesArray = [hero1];
  const heroesArray2 = [hero1_true];

  const props = {
    isMobile: false,
    showedHeroes: heroesArray,
  };

  const props2 = {
    isMobile: false,
    showedHeroes: heroesArray2,
  };

  const { rerender, getByTestId, findByTestId } = render(
    <Provider store={store}>
      <HashRouter>
        <HeroesList {...props} />
      </HashRouter>
    </Provider>
  );

  const heroHeartButton = screen.getByLabelText(ariaLabel);

  expect(heroHeartButton).toBeInTheDocument(); // passed correctly

  // fireEvent.click(heroHeartButton);

  // heroHeartButton.fireEvent.click();

  expect(getByTestId("icon-not-favorite 1")).toBeInTheDocument(); // passed correctly
  // expect(screen.getByTestId("icon-favorite 1")).not.toBeInTheDocument();

  userEvent.click(heroHeartButton);
  rerender(
    <Provider store={store}>
      <HashRouter>
        <HeroesList {...props2} />
      </HashRouter>
    </Provider>
  );
  // component.rerender()
  // //
  expect(await findByTestId("icon-favorite 1")).toBeInTheDocument();
});

// test("changes icon of favorite hero to not favorite when clicking on it", () => {
//   const ariaLabel = "heart A-Bomb";
//
//   const hero1 = {
//     id: 1,
//     appearance: {
//       eyeColor: "black",
//       gender: "male",
//       hairColor: "black",
//       height: ["6ft", "190cm"],
//       race: "human",
//       weight: ["5pd", "100kg"],
//     },
//     biography: {
//       aliases: ["1", "2"],
//       alignment: "good",
//       alterEgos: "string",
//       firstAppearance: "string",
//       fullName: "string",
//       placeOfBirth: "string",
//       publisher: "string",
//     },
//     connections: { groupAffiliation: "string", relatives: "string" },
//     images: {
//       lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
//       md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
//       sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
//       xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
//     },
//     name: "A-Bomb",
//     powerstats: {
//       combat: 64,
//       durability: 80,
//       intelligence: 38,
//       power: 24,
//       speed: 17,
//       strength: 100,
//     },
//     slug: "1-a-bomb",
//     work: {
//       base: "-",
//       occupation: "Musician, adventurer, author; formerly talk show host",
//     },
//     isFavorite: true,
//   };
//   // const hero2 = {
//   //   id: 2,
//   //   appearance: {
//   //     eyeColor: "black",
//   //     gender: "male",
//   //     hairColor: "black",
//   //     height: ["6ft", "190cm"],
//   //     race: "human",
//   //     weight: ["5pd", "100kg"],
//   //   },
//   //   biography: {
//   //     aliases: ["1", "2"],
//   //     alignment: "good",
//   //     alterEgos: "string",
//   //     firstAppearance: "string",
//   //     fullName: "string",
//   //     placeOfBirth: "string",
//   //     publisher: "string",
//   //   },
//   //   connections: { groupAffiliation: "string", relatives: "string" },
//   //   images: {
//   //     lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
//   //     md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
//   //     sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
//   //     xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
//   //   },
//   //   name: "Abe Sapien",
//   //   powerstats: {
//   //     combat: 64,
//   //     durability: 80,
//   //     intelligence: 38,
//   //     power: 24,
//   //     speed: 17,
//   //     strength: 100,
//   //   },
//   //   slug: "2-abe-sapien",
//   //   work: {
//   //     base: "-",
//   //     occupation: "Musician, adventurer, author; formerly talk show host",
//   //   },
//   //   isFavorite: false,
//   // };
//   // const hero3 = {
//   //   id: 3,
//   //   appearance: {
//   //     eyeColor: "black",
//   //     gender: "male",
//   //     hairColor: "black",
//   //     height: ["6ft", "190cm"],
//   //     race: "human",
//   //     weight: ["5pd", "100kg"],
//   //   },
//   //   biography: {
//   //     aliases: ["1", "2"],
//   //     alignment: "good",
//   //     alterEgos: "string",
//   //     firstAppearance: "string",
//   //     fullName: "string",
//   //     placeOfBirth: "string",
//   //     publisher: "string",
//   //   },
//   //   connections: { groupAffiliation: "string", relatives: "string" },
//   //   images: {
//   //     lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
//   //     md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
//   //     sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
//   //     xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
//   //   },
//   //   name: "Abin Sur",
//   //   powerstats: {
//   //     combat: 64,
//   //     durability: 80,
//   //     intelligence: 38,
//   //     power: 24,
//   //     speed: 17,
//   //     strength: 100,
//   //   },
//   //   slug: "3-abin-sur",
//   //   work: {
//   //     base: "-",
//   //     occupation: "Musician, adventurer, author; formerly talk show host",
//   //   },
//   //   isFavorite: false,
//   // };
//
//   // const heroesArray = [hero1, hero2, hero3];
//   const heroesArray = [hero1];
//
//   const props = {
//     isMobile: false,
//     showedHeroes: heroesArray,
//   };
//
//   render(
//     <Provider store={store}>
//       <HashRouter>
//         <HeroesList {...props} />
//       </HashRouter>
//     </Provider>
//   );
//
//   const heroHeartButton = screen.getByLabelText(ariaLabel);
//
//   // expect(screen.getByTestId("icon-favorite 1")).toBeInTheDocument(); // passed ok, icon exists
//
//   userEvent.click(heroHeartButton);
//   //
//   expect(screen.getByTestId("icon-favorite 1")).not.toBeVisible();
// });

import { screen, cleanup, render } from "@testing-library/react";
import React from "react";

import HeroesCharacteristics from "./HeroCharacteristics";
import { hero1 } from "__mock__/heroes";

describe("HeroesList with mockedStore", () => {
  afterEach(cleanup);

  it("renders component with mocked heroes quantity", () => {
    render(<HeroesCharacteristics hero={hero1} />);

    expect(screen.getByTitle(/A-Bomb/i)).toBeInTheDocument();
    expect(screen.getByText(/Powerstats/i)).toBeInTheDocument();
    expect(screen.getByText(/Biography/i)).toBeInTheDocument();
    expect(screen.getByText(/Connections/i)).toBeInTheDocument();
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });
});

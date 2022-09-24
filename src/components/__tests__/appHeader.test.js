import { act, render, screen } from "@testing-library/react";

import AppHeader from "../appHeader";

describe("AppHeader", () => {
  test("render application info", async () => {
    await act(async () => await render(<AppHeader />));

    const name = screen.getByText(process.env.REACT_APP_NAME);
    expect(name).toBeInTheDocument();

    const version = screen.getByText(process.env.REACT_APP_VERSION);
    expect(version).toBeInTheDocument();
  });
});

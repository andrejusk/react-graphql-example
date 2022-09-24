import { act, render, screen } from "@testing-library/react";

import App from "..";

describe("App", () => {
  test("render learn react link", async () => {
    await act(async () => await render(<App />));
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render unauthenticated view by default", async () => {
    await act(async () => await render(<App />));
    const patliteral = screen.getByText(/PAT/i);
    expect(patliteral).toBeInTheDocument();
  });
});

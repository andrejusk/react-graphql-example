import { render, screen } from "@testing-library/react";

import AppHeader from "../header";

describe("AppHeader", () => {
  test("render", () => {
    render(<AppHeader />);

    const child = screen.getByTestId("header");
    expect(child).toBeInTheDocument();
  });
  test("render child props", () => {
    const testString = "test";
    render(<AppHeader>{testString}</AppHeader>);

    const child = screen.getByText(testString);
    expect(child).toBeInTheDocument();
  });
  test("render application info", async () => {
    render(<AppHeader />);

    const name = screen.getByText(process.env.REACT_APP_NAME);
    expect(name).toBeInTheDocument();

    const version = screen.getByText(process.env.REACT_APP_VERSION);
    expect(version).toBeInTheDocument();
  });
});

import { act, render, screen } from "@testing-library/react";

import Loader from "../loader";

describe("Loader", () => {
  test("render", async () => {
    await act(async () => await render(<Loader />));

    const child = screen.getByTestId("loader");
    expect(child).toBeInTheDocument();
  });
});

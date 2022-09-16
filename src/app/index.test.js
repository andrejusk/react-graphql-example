import { act, render, screen } from "@testing-library/react";

import App from ".";

test("renders learn react link", async () => {
  await act(async () => await render(<App />));
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

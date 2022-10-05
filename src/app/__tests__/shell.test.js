import { render, screen } from "@testing-library/react";
import AppShell from "../shell";

describe("AppShell", () => {
  test("render children", () => {
    const testString = "test";
    render(<AppShell>{testString}</AppShell>);

    const child = screen.getByText(testString);
    expect(child).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import DeadComponent from "./DeadComponent";

describe("DeadComponent", () => {
  test("renders DeadComponent text", () => {
    render(<DeadComponent />);

    expect(screen.getByText("DeadComponent")).toBeInTheDocument();
  });
});

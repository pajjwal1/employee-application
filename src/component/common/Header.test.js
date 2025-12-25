import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders header title and icon", () => {
    render(<Header />);

    expect(
      screen.getByText("Employee Portal")
    ).toBeInTheDocument();

    expect(screen.getByText("🏢")).toBeInTheDocument();
  });

  test("renders Logout button", () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: /logout/i })
    ).toBeInTheDocument();
  });

  test("clears login state and navigates to login page on logout", () => {
    localStorage.setItem("isLoggedIn", "true");

    render(<Header />);

    fireEvent.click(
      screen.getByRole("button", { name: /logout/i })
    );

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

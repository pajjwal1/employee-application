import { render, screen } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import { isAuthenticated } from "../../utils/auth";

jest.mock("../../utils/auth", () => ({
  isAuthenticated: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: ({ to }) => <div>Redirected to {to}</div>,
}));

describe("ProtectedRoute Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to login when user is NOT authenticated", () => {
    isAuthenticated.mockReturnValue(false);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Redirected to /")
    ).toBeInTheDocument();
  });

  test("renders children when user IS authenticated", () => {
    isAuthenticated.mockReturnValue(true);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Protected Content")
    ).toBeInTheDocument();
  });
});

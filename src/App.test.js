import { render, screen } from "@testing-library/react";
import App from "./App";

// ============================
// Mock react-router-dom (v7 fix)
// ============================
jest.mock("react-router-dom", () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

// ============================
// Mock auth flag
// ============================
let mockIsLoggedIn = false;

// ============================
// Mock components
// ============================
jest.mock("./component/Auth/Login/Login", () => () => (
  <div>Login Page</div>
));

jest.mock("./component/Auth/SignUp/Signup", () => () => (
  <div>Signup Page</div>
));

jest.mock("./component/Dashboard/Dashboard", () => () => (
  <div>Dashboard Page</div>
));

jest.mock("./component/common/DeadComponent", () => () => (
  <div>404 Page</div>
));

jest.mock("./component/Auth/ProtectedRoute", () => {
  return function MockProtectedRoute({ children }) {
    return mockIsLoggedIn ? children : <div>Unauthorized</div>;
  };
});

describe("App routing", () => {
  afterEach(() => {
    mockIsLoggedIn = false;
  });

  test("renders Login page on '/'", () => {
    render(<App />);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders Signup page", () => {
    render(<App />);
    expect(screen.getByText("Signup Page")).toBeInTheDocument();
  });

  test("renders Dashboard when logged in", () => {
    mockIsLoggedIn = true;
    render(<App />);
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  test("blocks Dashboard when not logged in", () => {
    render(<App />);
    expect(screen.getByText("Unauthorized")).toBeInTheDocument();
  });

  test("renders DeadComponent for unknown route", () => {
    render(<App />);
    expect(screen.getByText("404 Page")).toBeInTheDocument();
  });
});

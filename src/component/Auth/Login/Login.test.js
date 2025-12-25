import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders login form correctly", () => {
    render(<Login />);

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("updates email and password fields on change", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("successful login calls API with Basic Auth and navigates to dashboard", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "akash@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const expectedAuthHeader = `Basic ${btoa(
      "akash@gmail.com:password123"
    )}`;

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/login`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: expectedAuthHeader,
          "Content-Type": "application/json",
        }),
      })
    );

    expect(localStorage.getItem("auth_email")).toBe("akash@gmail.com");
    expect(localStorage.getItem("auth_password")).toBe("password123");
    expect(localStorage.getItem("isLoggedIn")).toBe("true");

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("shows error message on failed login", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const errorMessage = await screen.findByText(
      "Invalid email or password"
    );

    expect(errorMessage).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("disables button and shows loading text while logging in", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByRole("button", { name: /logging in/i })
    ).toBeDisabled();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  test("navigates to signup page when clicking signup link", () => {
    render(<Login />);

    fireEvent.click(screen.getByText("Sign up"));

    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});

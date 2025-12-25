import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders signup form correctly", () => {
    render(<Signup />);

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  test("updates input fields on change", () => {
    render(<Signup />);

    const nameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(nameInput, {
      target: { value: "Akash Kumar" },
    });

    fireEvent.change(emailInput, {
      target: { value: "akash@gmail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(nameInput.value).toBe("Akash Kumar");
    expect(emailInput.value).toBe("akash@gmail.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("calls handleSubmit on form submit", () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Akash Kumar" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "akash@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create account/i })
    );

    expect(consoleSpy).toHaveBeenCalledWith("Signup Data:", {
      name: "Akash Kumar",
      email: "akash@gmail.com",
      password: "password123",
    });

    consoleSpy.mockRestore();
  });

  test("navigates to login page on clicking Login link", () => {
    render(<Signup />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

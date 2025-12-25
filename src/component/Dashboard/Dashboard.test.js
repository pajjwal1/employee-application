import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import api from "../../api/axiosInstance";

jest.mock("../../api/axiosInstance");

jest.mock("../common/Header", () => () => (
  <div data-testid="header">Header</div>
));

jest.mock("../common/Pagination", () => () => (
  <div data-testid="pagination">Pagination</div>
));

jest.mock("../Employee/EmployeeTable", () => () => (
  <div data-testid="employee-table">EmployeeTable</div>
));

jest.mock("../Employee/EmployeeModal", () => () => (
  <div data-testid="employee-modal">EmployeeModal</div>
));

const mockEmployees = [
  {
    id: 1,
    employeeCode: "EMP001",
    firstName: "Akash",
  },
  {
    id: 2,
    employeeCode: "EMP002",
    firstName: "Rahul",
  },
];

describe("Dashboard Component (Safe Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockResolvedValue({ data: mockEmployees });
  });

  test("renders dashboard and fetches employees on mount", async () => {
    render(<Dashboard />);

    expect(
      screen.getByText("Welcome to Employee Dashboard")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/employees");
    });

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("employee-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeTable from "./EmployeeTable";

describe("EmployeeTable Component", () => {
  const mockEmployees = [
    {
      id: 1,
      employeeCode: "EMP001",
      firstName: "Akash",
      lastName: "Kumar",
      email: "akash@gmail.com",
      phone: "9876543210",
      department: "Engineering",
      designation: "Developer",
    },
    {
      id: 2,
      employeeCode: "EMP002",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@gmail.com",
      phone: "9876543222",
      department: "HR",
      designation: "HR Manager",
    },
  ];

  const mockOnNameClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers correctly", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onNameClick={mockOnNameClick}
      />
    );

    expect(screen.getByText("Employee ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Designation")).toBeInTheDocument();
  });

  test("renders employee data in table rows", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onNameClick={mockOnNameClick}
      />
    );

    expect(screen.getByText("EMP001")).toBeInTheDocument();
    expect(screen.getByText("Akash Kumar")).toBeInTheDocument();
    expect(screen.getByText("akash@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();

    expect(screen.getByText("EMP002")).toBeInTheDocument();
    expect(screen.getByText("Rahul Sharma")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  test("calls onNameClick with correct employee when name is clicked", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onNameClick={mockOnNameClick}
      />
    );

    fireEvent.click(screen.getByText("Akash Kumar"));

    expect(mockOnNameClick).toHaveBeenCalledTimes(1);
    expect(mockOnNameClick).toHaveBeenCalledWith(mockEmployees[0]);
  });

  test("renders correct number of rows", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onNameClick={mockOnNameClick}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockEmployees.length + 1);
  });
});

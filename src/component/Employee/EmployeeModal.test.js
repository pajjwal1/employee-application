import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeModal from "./EmployeeModal";

describe("EmployeeModal Component", () => {
  const mockOnSave = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnClose = jest.fn();

  const mockEmployee = {
    id: 1,
    employeeCode: "EMP001",
    firstName: "Akash",
    lastName: "Kumar",
    email: "akash@gmail.com",
    phone: "9876543210",
    department: "Engineering",
    designation: "Developer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("renders create employee modal with employee code field", () => {
    render(
      <EmployeeModal
        employee={null}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByText("Create Employee")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Employee ID")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Delete")
    ).not.toBeInTheDocument();
  });

  test("calls onSave with correct payload when creating employee", () => {
    render(
      <EmployeeModal
        employee={null}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Employee ID"), {
      target: { value: "EMP100" },
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "New" },
    });

    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "User" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "new@company.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create/i })
    );

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        employeeCode: "EMP100",
        firstName: "New",
        lastName: "User",
        email: "new@company.com",
      })
    );
  });


  test("renders edit employee modal without employee code field", () => {
    render(
      <EmployeeModal
        employee={mockEmployee}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByText("Edit Employee")
    ).toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText("Employee ID")
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /delete/i })
    ).toBeInTheDocument();
  });

  test("pre-fills form fields in edit mode", () => {
    render(
      <EmployeeModal
        employee={mockEmployee}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByDisplayValue("Akash")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Kumar")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("akash@gmail.com")
    ).toBeInTheDocument();
  });

  test("calls onSave with correct payload when editing employee", () => {
    render(
      <EmployeeModal
        employee={mockEmployee}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Updated" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /save/i })
    );

    expect(mockOnSave).toHaveBeenCalledWith({
      id: 1,
      employeeCode: "EMP001",
      firstName: "Updated",
      lastName: "Kumar",
      email: "akash@gmail.com",
      phone: "9876543210",
      department: "Engineering",
      designation: "Developer",
    });
  });

  test("calls onDelete with correct payload", () => {
    render(
      <EmployeeModal
        employee={mockEmployee}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /delete/i })
    );

    expect(mockOnDelete).toHaveBeenCalledWith(mockEmployee);
  });


  test("calls onClose when clicking cancel button", () => {
    render(
      <EmployeeModal
        employee={mockEmployee}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /cancel/i })
    );

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

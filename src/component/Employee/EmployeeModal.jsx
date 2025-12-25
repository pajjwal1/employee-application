import { useEffect, useState } from "react";

const emptyEmployee = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
};

const EmployeeModal = ({ employee, onSave, onDelete, onClose }) => {
  const initialForm = employee
    ? {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
    }
    : emptyEmployee;

  const [form, setForm] = useState(initialForm);
  const isEdit = Boolean(employee);
  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
      });
    } else {
      setForm(emptyEmployee);
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
  const payload = employee
    ? {
        id: employee.id,
        employeeCode: employee.employeeCode,
        ...form,
      }
    : {
        ...form,
      };

  onSave(payload);
};
  const handleDelete = () => {
  const payload = {
    id: employee.id,
    employeeCode: employee.employeeCode,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    department: employee.department,
    designation: employee.designation,
  };

  onDelete(payload);
};

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{isEdit ? "Edit Employee" : "Create Employee"}</h3>

        {!isEdit && <input
          name="employeeCode"
          placeholder="Employee ID"
          value={form.employeeCode}
          onChange={handleChange}
          style={styles.input}
        />}

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.actions}>
          <button onClick={handleSave}>
            {isEdit ? "Save" : "Create"}
          </button>

          {isEdit && (
            <button
              style={styles.delete}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    width: "420px",
    borderRadius: "6px",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  delete: {
    background: "#e53e3e",
    color: "#fff",
  },
};

export default EmployeeModal;

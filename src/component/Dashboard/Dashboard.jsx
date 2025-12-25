import { useState, useMemo, useEffect } from "react";
import Header from "../common/Header";
import EmployeeTable from "../Employee/EmployeeTable";
import EmployeeModal from "../Employee/EmployeeModal";
import Pagination from "../common/Pagination";
import api from "../../api/axiosInstance";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(employees.length / pageSize);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return employees.slice(startIndex, startIndex + pageSize);
  }, [employees, currentPage, pageSize]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  const openCreateModal = () => {
    setSelectedEmp(null);
    setIsModalOpen(true);
  };

  const saveEmployee = async (payload) => {
  try {
    // 🔹 EDIT
    if (payload.id) {
      const response = await api.put(
        `/employees/${payload.id}`,
        payload
      );

      const updatedEmployee = response.data;

      setEmployees((prev) =>
        prev.map((e) =>
          e.id === updatedEmployee.id
            ? updatedEmployee
            : e
        )
      );
    }
    // 🔹 CREATE
    else {
      const response = await api.post(
        "/employees",
        payload
      );

      const createdEmployee = response.data;

      // ✅ add at END of list
      setEmployees((prev) => [
        ...prev,
        createdEmployee,
      ]);
    }

    setIsModalOpen(false);
    setSelectedEmp(null);
  } catch (err) {
    console.error("Save failed", err);
    alert("Failed to save employee");
  }
};


  const deleteEmployee = async (payload) => {
    try {
      await api.delete(`/employees/${payload.id}`, {
      });

      setEmployees((prev) =>
        prev.filter((e) => e.id !== payload.id)
      );

      setIsModalOpen(false);
      setSelectedEmp(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete employee");
    }
  };

  return (
    <>
      <Header />

      <div style={{ padding: "20px" }}>
        <h2>Welcome to Employee Dashboard</h2>

        <button onClick={openCreateModal} style={styles.createBtn}>
          Create Employee
        </button>

        <EmployeeTable
          employees={paginatedEmployees}
          onNameClick={(emp) => {
            setSelectedEmp(emp);
            setIsModalOpen(true);
          }}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {isModalOpen && (
        <EmployeeModal
          employee={selectedEmp}
          onSave={saveEmployee}
          onDelete={deleteEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

const styles = {
  createBtn: {
    marginBottom: "15px",
    padding: "8px 14px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Dashboard;

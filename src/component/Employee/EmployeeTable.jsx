const EmployeeTable = ({ employees, onNameClick }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Designation</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.employeeCode}</td>
            <td>
              <span
                style={styles.link}
                onClick={() => onNameClick(emp)}
              >
                {`${emp.firstName} ${emp.lastName}`}
              </span>
            </td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.department}</td>
            <td>{emp.designation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default EmployeeTable;

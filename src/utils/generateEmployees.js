const generateEmployees = (count = 1000) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    employeeId: `EMP${String(i + 1).padStart(4, "0")}`,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    phone: `900000${String(i).padStart(4, "0")}`,
    department: i % 2 === 0 ? "IT" : "HR",
    designation: i % 2 === 0 ? "Developer" : "Manager",
  }));
};

export default generateEmployees;

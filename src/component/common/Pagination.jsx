const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={styles.container}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.page,
            ...(page === currentPage ? styles.active : {}),
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "15px",
    display: "flex",
    gap: "6px",
    justifyContent: "center",
  },
  page: {
    border: "1px solid #dadce0",
    background: "#fff",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  active: {
    background: "#1a73e8",
    color: "#fff",
    borderColor: "#1a73e8",
  },
};

export default Pagination;

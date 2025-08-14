import React from "react";
import { Button } from "react-bootstrap";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  const themeColor = "#001f3f"; 

  return (
    <div className="d-flex justify-content-center my-3">
      <Button
        style={{ backgroundColor: themeColor, borderColor: themeColor }}
        className="me-2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          style={{
            backgroundColor: page === currentPage ? themeColor : "white",
            color: page === currentPage ? "white" : themeColor,
            borderColor: themeColor,
          }}
          className="me-1"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        style={{ backgroundColor: themeColor, borderColor: themeColor }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;

import React from "react";
import { Card, Button } from "react-bootstrap";

function BookCard({ book, onViewDetails }) {
  return (
    <Card style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={book.coverImageUrl}
        style={{
          width: "100%",
          maxHeight: "250px",
          objectFit: "contain",
          padding: "10px",
        }}
      />
      <Card.Body className="d-flex flex-column align-items-center text-center">
        <Card.Title style={{ fontWeight: "bold" }}>{book.title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{book.author}</Card.Subtitle>
        <Button
          variant="primary"
          style={{ 
            backgroundColor: "#001f3f", 
            borderColor: "#001f3f", 
            width: "100%" 
          }}
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;

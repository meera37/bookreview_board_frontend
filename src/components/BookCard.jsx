// import React from "react";
// import { Card, Button } from "react-bootstrap";

// function BookCard({ book, onViewDetails }) {
//   return (
//     <Card style={{ minHeight: "100%" }}>
//       <Card.Img
//         variant="top"
//         src={book.coverImageUrl}
//         style={{ height: "200px", objectFit: "contain", padding: "10px" }}
//       />
//       <Card.Body>
//         <Card.Title style={{ fontWeight: "bold" }}>{book.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
//         <Card.Text>{book.description.slice(0, 100)}...</Card.Text>
//         <Button
//           variant="primary"
//           style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
//           onClick={onViewDetails}
//         >
//           View Details
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BookCard;

// import React from "react";
// import { Card, Button } from "react-bootstrap";

// function BookCard({ book, onViewDetails }) {
//   return (
//     <Card style={{ height: "100%" }}>
//       <Card.Img
//         variant="top"
//         src={book.coverImageUrl}
//         style={{ height: "250px", objectFit: "cover" }}
//       />
//       <Card.Body>
//         <Card.Title style={{ fontWeight: "bold" }}>{book.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
//         <Button
//           variant="primary"
//           style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
//           onClick={onViewDetails}
//         >
//           View Details
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BookCard;

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
          maxHeight: "250px", // limits image height
          objectFit: "contain",
          padding: "10px",
        }}
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold" }}>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Button
          variant="primary"
          style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;


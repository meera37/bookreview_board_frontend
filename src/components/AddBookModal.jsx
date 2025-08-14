// import React, { useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
// import { addBookApi } from "../services/allApi";
// import { toast } from "react-toastify";

// function AddBookModal({ show, onClose, onBookAdded }) {
//   const [newBook, setNewBook] = useState({
//     title: "",
//     author: "",
//     description: "",
//     coverImageUrl: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await addBookApi(newBook);
//       if (response.data) {
//         toast.success("Book added successfully!");
//         onBookAdded(response.data); // Update parent list
//         setNewBook({ title: "", author: "", description: "", coverImageUrl: "" });
//         onClose();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error adding book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Book</Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               value={newBook.title}
//               onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Author</Form.Label>
//             <Form.Control
//               type="text"
//               value={newBook.author}
//               onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={newBook.description}
//               onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Cover Image URL</Form.Label>
//             <Form.Control
//               type="url"
//               value={newBook.coverImageUrl}
//               onChange={(e) => setNewBook({ ...newBook, coverImageUrl: e.target.value })}
//               required
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>Cancel</Button>
//           <Button
//             variant="primary"
//             type="submit"
//             style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Book"}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// }

// export default AddBookModal;


import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addBookApi } from "../services/allApi";
import { toast } from "react-toastify";

function AddBookModal({ show, onClose, onBookAdded }) {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    coverImageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // send auth token
      const response = await addBookApi(newBook, token);
      if (response.data) {
        toast.success("Book added successfully!");
        onBookAdded(response.data); // add to parent list
        onClose();
        setNewBook({ title: "", author: "", description: "", coverImageUrl: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control
              type="url"
              value={newBook.coverImageUrl}
              onChange={(e) => setNewBook({ ...newBook, coverImageUrl: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddBookModal;

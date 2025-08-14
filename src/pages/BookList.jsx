import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { getAllBooksApi } from "../services/allApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddBookModal from "../components/AddBookModal";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getAllBooksApi();
      if (response.data) setBooks(response.data);
      else toast.error("Failed to fetch books");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBookClick = () => {
    if (isLoggedIn) setShowModal(true);
    else toast.warning("Please log in to add books");
  };

  const handleBookAdded = (newBook) => {
    setBooks([newBook, ...books]);
  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Book List</h2>
          <Button
            variant="primary"
            onClick={handleAddBookClick}
            style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
          >
            Add New Book
          </Button>
        </div>

        {loading && <Spinner animation="border" />}

        <Row>
          {books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} className="mb-3">
              <BookCard
                book={book}
                onViewDetails={() => navigate(`/bookdetails/${book._id}`)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Add Book Modal */}
      <AddBookModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onBookAdded={handleBookAdded}
      />

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

export default BookList;

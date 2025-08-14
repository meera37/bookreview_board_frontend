import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllBooksApi } from "../services/allApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await getAllBooksApi();
      if (response.data) setBooks(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 31, 63, 0.6), rgba(0, 31, 63, 0.6)), url(https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFyayUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>Welcome to BookVista</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Discover, Review, and Share Your Favorite Reads
        </p>
        <Button
          variant="light"
          style={{ color: "#001f3f", fontWeight: "bold" }}
          onClick={() => navigate("/booklist")}
        >
          Explore Books
        </Button>
      </div>

      {/* About Section */}
      <Container className="my-5">
        <h3 className="text-center mb-4" style={{ color: "#001f3f" }}>
          About BookVista
        </h3>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          BookVista is a community-driven platform where book lovers can discover, review,
          and share their favorite reads. Whether you're exploring new genres or sharing
          insights on classics, BookVista connects readers worldwide.
        </p>
      </Container>

      {/* How It Works */}
      <Container className="my-5">
        <h3 className="text-center mb-4" style={{ color: "#001f3f" }}>
          How It Works
        </h3>
        <Row>
          <Col md={4} className="text-center mb-3">
            <FontAwesomeIcon icon={faBookOpen} size="2x" style={{ color: "#001f3f" }} />
            <h5 className="mt-2">Add Your Book</h5>
            <p>Post books you've read and share them with the community.</p>
          </Col>
          <Col md={4} className="text-center mb-3">
            <FontAwesomeIcon icon={faPen} size="2x" style={{ color: "#001f3f" }} />
            <h5 className="mt-2">Write Reviews</h5>
            <p>Leave short reviews for books you enjoyed or want to recommend.</p>
          </Col>
          <Col md={4} className="text-center mb-3">
            <FontAwesomeIcon icon={faSearch} size="2x" style={{ color: "#001f3f" }} />
            <h5 className="mt-2">Discover & Explore</h5>
            <p>Browse books and find hidden gems recommended by others.</p>
          </Col>
        </Row>
      </Container>

     {/* Latest Books Section */}
<Container className="my-5">
  <Row className="align-items-center mb-3">
    <Col>
      <h2 style={{ color: "#001f3f", fontWeight: "bold" }}>Latest Books</h2>
    </Col>
    <Col className="text-end">
      <Button
        variant="primary"
        style={{ backgroundColor: "#001f3f", color: "#fff", borderColor: "#001f3f" }}
        onClick={() => navigate("/booklist")}
      >
        View All Books
      </Button>
    </Col>
  </Row>

  {loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  ) : books.length === 0 ? (
    <p>No books available.</p>
  ) : (
    <Row xs={1} sm={2} md={2} lg={4} className="g-4">
      {books.slice(0, 4).map((book) => (
        <Col key={book._id}>
          <BookCard 
            book={book} 
            onViewDetails={() => navigate(`/bookdetails/${book._id}`)} 
          />
        </Col>
      ))}
    </Row>
  )}
</Container>



      {/* CTA Banner */}
      <Container fluid className="py-5 text-center" style={{ backgroundColor: "#001f3f", color: "#fdf6e3" }}>
        <h3>Join BookVista Today!</h3>
        <p>Discover your next favorite book and share your reviews with a global community.</p>
        <Button
          variant="light"
          style={{ color: "#001f3f", fontWeight: "bold" }}
          onClick={() => navigate("/register")}
        >
          Sign Up Now
        </Button>
      </Container>

      {/* FAQ Section */}
      <Container className="my-5">
        <h3 className="text-center mb-3" style={{ color: "#001f3f" }}>
          Frequently Asked Questions
        </h3>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I add a book?</Accordion.Header>
            <Accordion.Body>
              After registering, click on “Add Book” from your dashboard and fill out the book details.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I edit my review?</Accordion.Header>
            <Accordion.Body>
              Yes, you can edit your reviews by visiting the book’s detail page and selecting “Edit Review”.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Is BookVista free to use?</Accordion.Header>
            <Accordion.Body>
              Absolutely! BookVista is completely free for all users.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      {/* Contact Section */}
      <Container fluid className="py-5" style={{ backgroundColor: "#d9d9d9" }}>
        <Container className="text-center">
          <h4>Get in Touch</h4>
          <p>
            Email: support@bookvista.com | Follow us on{" "}
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> |{" "}
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          </p>
        </Container>
      </Container>

      <Footer />
    </>
  );
}

export default HomePage;

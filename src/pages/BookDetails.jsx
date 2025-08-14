import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { getBookByIdApi, addReviewApi, updateReviewApi } from "../services/allApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 3;
  const isLoggedIn = !!localStorage.getItem("token");
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await getBookByIdApi(id);
        if (response.data) setBook(response.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const userReview = book?.reviews?.find(
    (r) => r.user.toString() === userId
  ) || null;

  const sortedReviews = book?.reviews
    ? [...book.reviews].sort((a, b) => {
        if (a.user.toString() === userId) return -1; // logged-in user first
        if (b.user.toString() === userId) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt); // latest first
      })
    : [];

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [userReview]);

  const handleAddReviewClick = () => {
    if (!isLoggedIn) {
      toast.warning("Please log in to add a review");
      return;
    }
    if (userReview) {
      toast.info("Review already added");
      return;
    }

    setShowReviewForm(!showReviewForm);
    setEditingReviewId(null);
    setRating("");
    setComment("");
  };

  const handleEditReviewClick = (review) => {
    setEditingReviewId(review._id);
    setRating(review.rating);
    setComment(review.comment);
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Rating and comment are required");
      return;
    }

    setReviewLoading(true);
    try {
      let response;
      if (editingReviewId) {
        response = await updateReviewApi(
          id,
          editingReviewId,
          { rating: Number(rating), comment },
          token
        );
        if (response.data) toast.success("Review updated successfully!");
      } else {
        response = await addReviewApi(
          id,
          { rating: Number(rating), comment },
          token
        );
        if (response.data) toast.success("Review added successfully!");
      }

      setRating("");
      setComment("");
      setShowReviewForm(false);
      setEditingReviewId(null);
      const updated = await getBookByIdApi(id);
      if (updated.data) setBook(updated.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (!book) return null;

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={book.coverImageUrl}
                style={{ height: "400px", objectFit: "contain" }}
              />
            </Card>
          </Col>
          <Col md={8}>
            <h2>{book.title}</h2>
            <h5>Author: {book.author}</h5>
            <p>{book.description}</p>
            <p>
              <strong>Average Rating:</strong>{" "}
              {(book.averageRating || 0).toFixed(2)} |{" "}
              <strong>Reviews:</strong> {book.numReviews || 0}
            </p>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-between align-items-center my-2">
          <h4>Reviews</h4>
          {!userReview && (
            <Button
              variant="primary"
              onClick={handleAddReviewClick}
              className="ms-2"
              style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
            >
              Add Review
            </Button>
          )}
        </div>

        {showReviewForm && (
          <Form
            onSubmit={handleReviewSubmit}
            className="my-3 p-3 border rounded shadow-sm"
          >
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={reviewLoading}
              style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
            >
              {reviewLoading ? (
                <Spinner animation="border" size="sm" />
              ) : editingReviewId ? (
                "Update Review"
              ) : (
                "Submit Review"
              )}
            </Button>
          </Form>
        )}

        {book.reviews.length === 0 && <p className="mt-3">No reviews yet.</p>}

        {currentReviews.map((r) => (
          <Card key={r._id} className="mb-2 shadow-sm rounded">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title>{r.name}</Card.Title>
                {r.user.toString() === userId && (
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditReviewClick(r)}
                  />
                )}
              </div>
              <Card.Text>
                Rating: {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </Card.Text>
              <Card.Text>{r.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedReviews.length / reviewsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Container>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default BookDetails;


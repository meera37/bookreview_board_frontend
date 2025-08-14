import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { registerApi } from "../services/allApi";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.warning("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await registerApi(formData);
      if (response.data && response.data.user) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(response.response?.data?.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: "70vh" }}>
        <Card style={{ width: "400px", padding: "20px" }}>
          <h3 className="text-center mb-3">Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#001f3f", borderColor: "#001f3f", width: "100%" }}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Register"}
            </Button>
          </Form>

          <div className="mt-3 text-center">
            Already registered? <Link to="/login">Login here</Link>
          </div>
        </Card>
      </Container>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored"/>
    </>
  );
}

export default Register;


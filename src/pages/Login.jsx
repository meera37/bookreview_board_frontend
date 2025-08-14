import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { loginApi } from "../services/allApi";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await loginApi(formData);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success('Login Successful')
        setTimeout(() => {
        navigate("/");
        }, 3000);
      } else {
        toast.error(response.response?.data?.message || "Login failed");
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
          <h3 className="text-center mb-3">Login</h3>
          <Form onSubmit={handleSubmit}>
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
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>

          <div className="mt-3 text-center">
            First time here? <Link to="/register">Register now</Link>
          </div>
        </Card>
      </Container>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored"/>
    </>
  );
}

export default Login;

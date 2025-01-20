import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsAuthenticated, setProfilePic }) => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const endpoint = isLogin
                ? "http://localhost:5000/api/users/login"
                : "http://localhost:5000/api/users/register";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    // Login successful
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("profilePic", data.profilePic);
                    setProfilePic(data.profilePic);
                    setIsAuthenticated(true);
                    navigate("/");
                } else {
                    // Sign-up successful
                    alert("Sign up successful! Please log in.");
                    setIsLogin(true); // Switch to login mode after signing up
                }
            } else {
                // Handle errors from the backend
                setError(data.message || "An error occurred.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };


    return (
        <div className="register-container">
            <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
                {/* Show name field only if it's Sign Up */}
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ cursor: "pointer", color: "blue" }}
                >
                    {isLogin ? "Sign Up" : "Sign In"}
                </span>
            </p>
        </div>
    );
};

export default Register;

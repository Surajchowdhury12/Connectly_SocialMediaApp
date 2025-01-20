import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Add your styles

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            // Log the response for debugging
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                alert("Login Successful");
                localStorage.setItem("token", data.token); // Save the token
                navigate("/"); // Redirect to home page after successful login
            } else {
                alert(data.message || "Error during login");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong during login!");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

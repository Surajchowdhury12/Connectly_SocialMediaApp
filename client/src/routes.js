import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import axios from "axios";

const Layout = ({ children, profilePic, setProfilePic }) => {
    return (
        <>
            <Navbar profilePic={profilePic} />
            <div className="page-content">{children}</div>
        </>
    );
};

const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState(null);

    // Validate the token when the app starts
    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:5000/api/users/validate", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Token validation failed:", error);
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        validateToken();

        const savedProfilePic = localStorage.getItem("profilePic");
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Layout profilePic={profilePic} setProfilePic={setProfilePic}>
                                <Home setIsAuthenticated={setIsAuthenticated} />
                            </Layout>
                        ) : (
                            <Register
                                setIsAuthenticated={setIsAuthenticated}
                                setProfilePic={setProfilePic}
                            />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Layout profilePic={profilePic} setProfilePic={setProfilePic}>
                            <Profile setProfilePic={setProfilePic} />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            setIsAuthenticated={setIsAuthenticated}
                            setProfilePic={setProfilePic}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Register
                            setIsAuthenticated={setIsAuthenticated}
                            setProfilePic={setProfilePic}
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

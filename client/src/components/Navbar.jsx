import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ profilePic }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("profilePic");
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="Connectly Logo" className="logo" />
                <h1>Connectly</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </li>
                    <li>
                        <div className="profile-container">
                            <img
                                src={profilePic || "/default-profile.png"}  // Show the profilePic or default
                                alt="Profile"
                                className="navbar-profile-pic"
                            />
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;

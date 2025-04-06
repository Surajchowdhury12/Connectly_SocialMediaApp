import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  // Import Context
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { profilePic, setUser, setProfilePic } = useContext(UserContext); // Access Context

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("profilePic");

        setUser(null);  // Clear global user state
        setProfilePic(null); // Clear profile picture globally

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
                                src={profilePic || "/default-profile.png"}  // Show profilePic from Context
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

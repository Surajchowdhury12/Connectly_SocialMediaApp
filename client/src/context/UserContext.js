import React, { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Context Provider Component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch("http://localhost:5000/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                    
                    // Ensure profilePic has the full URL
                    const fullProfilePic = data.profilePic ? `http://localhost:5000${data.profilePic}` : null;
                    
                    setProfilePic(fullProfilePic);
                    localStorage.setItem("profilePic", fullProfilePic); // ✅ Store in localStorage
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, profilePic, setProfilePic }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

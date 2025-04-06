import React, { useState } from "react";
import axios from "axios";

const Profile = ({ setProfilePic }) => {
    const [file, setFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Upload function
    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", file); // The key "profilePic" must match backend

        try {
            const token = localStorage.getItem("token"); // Get user token
            const response = await axios.post(
                "http://localhost:5000/api/users/update-profile-pic",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ Save profile picture URL in localStorage & update Navbar
            const newProfilePic = response.data.profilePic; // Backend should return the image URL
            localStorage.setItem("profilePic", newProfilePic);
            setProfilePic(newProfilePic); // Update state

            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
            alert("Failed to upload image!");
        }
    };

    return (
        <div>
            <h2>Update Profile Picture</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default Profile;

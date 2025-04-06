import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext"; // Import Context
import "./Profile.css";

const Profile = () => {
    const { profilePic, setProfilePic } = useContext(UserContext); // Use Context for global state
    const [profilePhoto, setProfilePhoto] = useState(profilePic); // Local state
    const [bio, setBio] = useState("This is my bio");
    const [posts, setPosts] = useState(["My first post!", "Loving Connectly!"]);
    const [newPost, setNewPost] = useState("");
    const [userId, setUserId] = useState(null);

    // ✅ Load profile picture from localStorage & token decoding
    useEffect(() => {
        const savedProfilePic = localStorage.getItem("profilePic");
        if (savedProfilePic) {
            setProfilePhoto(savedProfilePic);
            setProfilePic(savedProfilePic); // ✅ Ensure Navbar updates
        }

        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [setProfilePic]); // ✅ Dependency ensures it updates correctly

    // ✅ Handle Profile Picture Upload
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);
        formData.append("userId", userId);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/update-profile-pic",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Profile picture updated:", response.data);

            // ✅ Get the file URL from the backend response
            const newProfilePicUrl = `http://localhost:5000${response.data.fileUrl}`;

            setProfilePhoto(newProfilePicUrl); // Update local state
            setProfilePic(newProfilePicUrl + "?t=" + new Date().getTime());  // ✅ Update global state in Context API
            localStorage.setItem("profilePic", newProfilePicUrl); // Save to localStorage
        } catch (error) {
            console.error("Error updating profile pic:", error.response?.data);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <label className="photo-upload">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                    {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="profile-photo" />
                    ) : (
                        <div className="photo-placeholder">Upload Photo</div>
                    )}
                </label>
                <textarea
                    className="bio-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write your bio..."
                    rows="3"
                ></textarea>
            </div>

            <div className="profile-posts">
                <h2>My Posts</h2>
                <div className="create-post">
                    <textarea
                        placeholder="What's on your mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows="3"
                    ></textarea>
                    <button onClick={() => setPosts([newPost, ...posts])}>Post</button>
                </div>
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <p>{post}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

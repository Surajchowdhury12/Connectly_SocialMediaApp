import React, { useState } from "react";
import "./Profile.css";
import axios from 'axios';

const Profile = ({ setProfilePic }) => {
    const [profilePhoto, setProfilePhoto, userId] = useState(null);
    const [bio, setBio] = useState("This is my bio");
    const [posts, setPosts] = useState(["My first post!", "Loving Connectly!"]);
    const [newPost, setNewPost] = useState("");

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const profilePic = reader.result;
                setProfilePhoto(profilePic);

                // Update backend
                const token = localStorage.getItem("token");
                await axios.post(
                    "http://localhost:5000/api/users/update-profile-pic",
                    { userId, profilePic },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setProfilePic(profilePic); // Update global state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handlePostSubmit = () => {
        if (newPost.trim()) {
            setPosts([newPost, ...posts]);
            setNewPost("");
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
                    onChange={handleBioChange}
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
                    <button onClick={handlePostSubmit}>Post</button>
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

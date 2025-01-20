import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css"; // Create this file for styling

const CreatePost = ({ refreshPosts }) => {
    const [content, setContent] = useState("");

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            const response = await axios.post(
                "http://localhost:5000/api/posts",
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setContent(""); // Clear the textarea
                refreshPosts(); // Refresh posts on the home page
            } else {
                console.error("Failed to create post:", response.data.message);
            }
        } catch (error) {
            console.error("Error while creating post:", error);
        }
    };

    return (
        <div className="create-post-container">
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    rows="3"
                    required
                ></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;

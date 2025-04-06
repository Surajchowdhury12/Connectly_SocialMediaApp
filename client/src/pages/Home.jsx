import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Create this CSS file for styling
import Trending from "../components/Trending";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

const Home = ({ setIsAuthenticated }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch posts from backend API
    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/posts",{
                headers: { Authorization: `Bearer ${token}` } // ✅ Send token in headers
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle search input
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) =>
        post.content.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="home-container">

            {/* Search Box */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-box"
                />
            </div>

            <div className="main-content">
                <aside className="sidebar">
                    <h3>Suggestions</h3>
                    <div className="suggested-friends">
                        {/* Example Suggested Friend */}
                        <div className="suggested-friend">
                            <img
                                src="https://randomuser.me/api/portraits/men/1.jpg" // Sample image, replace with actual profile pictures
                                alt="User 1"
                                className="friend-avatar"
                            />
                            <div className="friend-info">
                                <p className="friend-name">John Doe</p>
                                <button className="add-friend-btn">Add Friend</button>
                            </div>
                        </div>

                        {/* Another Suggested Friend */}
                        <div className="suggested-friend">
                            <img
                                src="https://randomuser.me/api/portraits/women/2.jpg" // Sample image, replace with actual profile pictures
                                alt="User 2"
                                className="friend-avatar"
                            />
                            <div className="friend-info">
                                <p className="friend-name">Jane Smith</p>
                                <button className="add-friend-btn">Add Friend</button>
                            </div>
                        </div>

                        {/* You can dynamically fetch and map through an array of users here */}
                    </div>
                </aside>

                <main className="feed">
                    <div className="create-post">
                        <CreatePost refreshPosts={fetchPosts} />
                    </div>

                    <div className="posts">
                        {filteredPosts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>
                </main>

                <aside className="sidebar">
                    <h3>Trending</h3>
                    <p>Popular Topics</p>
                    <Trending /> {/* Integrating the Trending component */}
                </aside>
            </div>
        </div>
    );
};

export default Home;

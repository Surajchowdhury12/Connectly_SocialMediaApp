import React from "react";
import "./Post.css"; // Create this file for styling

const Post = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.author}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
                <button>Like</button>
                <button>Comment</button>
            </div>
        </div>
    );
};

export default Post;

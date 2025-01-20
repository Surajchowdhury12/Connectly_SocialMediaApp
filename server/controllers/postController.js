const Post = require("../models/post"); // Import your Post model (mongoose model)

// Controller to create a new post
const createPost = async (req, res) => {
    try {
        const { content } = req.body; // Get data from request body

        // Ensure user is authenticated and `req.user` contains the user ID
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User information is missing" });
        }

        // Create a new post with the authenticated user's ID
        const newPost = new Post({
            user: req.user.id, // Associate post with the user ID
            content, // Post content (e.g., text)
            //image, // Image URL or base64 (optional)
            likes: [], // Empty likes array initially
        });

        // Save the new post to the database
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating post", error: err.message });
    }
};

// Controller to get all posts
const getPosts = async (req, res) => {
    try {
        // Fetch all posts with the user information populated
        const posts = await Post.find().populate("user", "name profilePic"); // Populate user fields
        res.status(200).json(posts); // Return posts
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching posts", error: err.message });
    }
};

// Controller to like a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params; // Get post ID from request params

        // Ensure user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User information is missing" });
        }

        // Find the post by postId
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "You already liked this post" });
        }

        // Add userId to the likes array
        post.likes.push(req.user.id);

        // Save the updated post
        await post.save();
        res.status(200).json({ message: "Post liked successfully", post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error liking post", error: err.message });
    }
};

module.exports = { createPost, getPosts, likePost };

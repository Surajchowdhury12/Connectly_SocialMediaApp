import axios from "axios";
import { useState } from "react";

const ProfilePicUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", file); // "profilePic" must match backend

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/users/update-profile-pic", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the user is authenticated
                },
            });

            console.log("Upload success:", response.data);
            alert("Profile picture updated successfully!");
            onUploadSuccess(response.data.fileUrl); // Pass new image URL to parent
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Profile picture update failed!");
        }
        setLoading(false);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default ProfilePicUpload;

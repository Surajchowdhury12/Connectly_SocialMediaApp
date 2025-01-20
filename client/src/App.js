import React, { useState } from "react";
import AppRoutes from "./routes";

function App() {
  const [profilePic, setProfilePic] = useState(""); // State for the profile picture
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication

  return (
    <AppRoutes
      profilePic={profilePic}
      setProfilePic={setProfilePic}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}

export default App;

import React, { useEffect } from "react";

const Trending = () => {
    useEffect(() => {
        // Dynamically load Twitter's widget script
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <aside className="sidebar">
            <h3>Trending</h3>
            <a
                className="twitter-timeline"
                href="https://twitter.com/BBCBreaking?ref_src=twsrc%5Etfw"
            >
                Tweets by BBCBreaking
            </a>
        </aside>
    );
};

export default Trending;

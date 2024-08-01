import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container/Container.jsx";
import PostCard from "./PostCard";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [displayedText, setDisplayedText] = useState("");
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
 

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const messages = [
        "Unlock the Power of Knowledge—Read Our Latest Posts!",
        "Transform Your Perspective with Fresh Articles Daily!",
        "Explore New Ideas and Expand Your Horizons with Us!",
        "Dive Into the Best Reads on Tech, Lifestyle, and More!",
        "Discover Inspiring Stories and Cutting-Edge Information!",
        "Fuel Your Curiosity with Our Most Popular Blog Posts!",
    ];
     
    useEffect(() => {
        const currentMessage = messages[currentMessageIndex];

        const typeWriterEffect = () => {
            if (charIndex < currentMessage.length) {
                setDisplayedText((prev) => prev + currentMessage.charAt(charIndex));
                setCharIndex((prev) => prev + 1);
            } else {
                setIsTyping(false);
                // Pause before next message
                setTimeout(() => {
                    setDisplayedText("");
                    setCharIndex(0);
                    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
                    setIsTyping(true);
                }, 2000); // 2 seconds pause
            }
        };

        const interval = setInterval(() => {
            if (isTyping) {
                typeWriterEffect();
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [charIndex, isTyping, currentMessageIndex, messages]);
    

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
    
    useEffect(() => {
        // console.log("User Data in Home:", userData); // Ensure userData is available
        if (userData) {
            navigate("/all-posts");
        }
    }, [userData, navigate]);
    
    const handleExploreClick = () => {
        if (userData) {
            navigate("/all-posts");
        } else {
            navigate("/login");
        }
    };

    if (posts.length === 0) {
        return (
            <div className="w-full text-center">
                <Container>
                    <div>No Post to show</div>
                </Container>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto my-auto mt-8 md:mt-0 overflow-x-hidden">
            <div className="md:w-full w-full max-w-3xl text-center">
                <div className="text-pink-300">
                    <h1 className="font-semibold md:text-4xl text-2xl p-4">{displayedText}</h1>
                    <p className="text-xl mt-2 p-2">Discover in-depth articles on technology, lifestyle, and more.</p>
                </div>
                <button
                    className="bg-pink-200 mt-4 rounded-md hover:bg-slate-400 text-2xl px-4 text-black py-2"
                    onClick={handleExploreClick}
                >
                    Start Exploring
                </button>
            </div>
            <div className="md:w-3/4 w-full mt-8 p-4">
                <Container>
                    <div className="flex flex-wrap md:flex-row flex-col md:mt-0 mt-4">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-4 md:w-1/4 w-full hover:cursor-pointer">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    );
 
}




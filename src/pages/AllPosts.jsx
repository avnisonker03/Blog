import React, { useState, useEffect } from "react";
import AppwriteService from '../appwrite/config';
import { Container, PostCard } from "../components";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AppwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <span className="visually-hidden text-white text-3xl">Loading...</span>
                    </div>
                ) : (
                    <div className="flex flex-wrap md:flex-row flex-col gap-4 justify-center">
                        {posts.length === 0 ? (
                            <div className="w-full flex justify-center items-center">
                                <span className="text-white text-3xl">No posts to show</span>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.$id} className="p-4 w-full md:w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))
                        )}
                    </div>

                )}
            </Container>
        </div>


    );
}


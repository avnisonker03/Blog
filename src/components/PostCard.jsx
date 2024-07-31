import React from "react";
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'



function PostCard({ $id, title, featuredImage }) {
    return (
        <div className="p-2 w-full">
            <div className="w-full flex flex-wrap justify-center shadow-sm rounded-lg">
                <Link to={`/post/${$id}`} className="flex flex-col bg-pink-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full sm:w-80 hover:bg-gray-200">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="w-full h-48 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-xl font-semibold mb-2 truncate">{title}</h2>
                        <p className="text-gray-700 mb-4 flex-grow">Click to read more...</p>
                    </div>
                </Link>
            </div>
        </div>




    )
}

export default PostCard

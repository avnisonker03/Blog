import React, { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoVideo from '../../assets/logo1.mp4'; 

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        },
    ];

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <header>
                <Container>
                    <nav className="w-full h-16 flex justify-between px-2 md:px-4 items-center">
                        <div className="mx-0 text-3xl font-bold text-pink-300">
                            <Link to="/">
                                <video
                                    src={logoVideo}
                                    autoPlay
                                    loop
                                    muted
                                    className="h-4 w-40"
                                    style={{ display: 'inline', height: '50%' }}
                                />
                            </Link>
                        </div>
                        <ul className="md:flex hidden font-semibold text-2xl">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name} className="mt-2 mx-[20px] text-3xl cursor-pointer text-pink-300 hover:text-gray-300">
                                        <button onClick={() => navigate(item.slug)}>{item.name}</button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className="px-4">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleDrawer} className="text-pink-300">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </nav>
                </Container>
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleDrawer}>
                        <div className="fixed rounded-lg inset-y-0 left-0 w-40 h-60 mb-4 bg-custom-gradient p-4 z-50">
                            <ul className="font-semibold text-lg">
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name} className="mt-4 mx-[20px] text-xl cursor-pointer text-pink-300 hover:text-gray-400">
                                            <button onClick={() => { navigate(item.slug); toggleDrawer(); }}>{item.name}</button>
                                        </li>
                                    ) : null
                                )}
                                {authStatus && (
                                    <li className="mt-4 px-4">
                                        <LogoutBtn />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
  


}


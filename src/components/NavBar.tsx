"use client";

import { useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import CartInNav from './cartNav';
import { TbUserCircle } from 'react-icons/tb';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import logoParfum from "@/assets/logo-parfum.png"

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-lg shadow-md z-50">
            <div className="flex flex-row items-center px-[5%] py-3">
                {/* Left Section (hidden on small screens) */}
                <div className="hidden md:flex items-center justify-start w-1/3">
                    <div className="flex flex-row gap-5">
                        <p
                            className="cursor-pointer text-lg px-2 py-1 hover:bg-gray-200 border border-transparent hover:border-gray-300 rounded-md"
                            onClick={() => router.push('/catalogo')}
                        >
                            Catálogo
                        </p>

                        <p
                            className="cursor-pointer text-lg px-2 py-1 hover:bg-gray-200 border border-transparent hover:border-gray-300 rounded-md"
                            onClick={() => router.push('/contacts')}
                        >
                            Contacto
                        </p>

                        <p
                            className="cursor-pointer text-lg px-2 py-1 hover:bg-gray-200 border border-transparent hover:border-gray-300 rounded-md"
                            onClick={() => router.push('/casas')}
                        >
                            Casas
                        </p>
                    </div>
                </div>

                {/* Center Section */}
                <div className="flex md:justify-center justify-start w-full md:w-1/3">
                    <div className="flex flex-row gap-1 items-center">
                        <div className="grid place-content-center">
                            <Image width={20} height={20} src={logoParfum} alt="logo" />
                        </div>
                        <h3
                            onClick={() => router.push('/')}
                            className="pt-1 text-xl md:text-2xl font-bold text-gray-700 cursor-pointer"
                        >
                            PARFUM COLOMBIA
                        </h3>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-end w-auto md:w-1/3 gap-5">
                    <div className="flex flex-row gap-3 items-center">
                        {/* Cart */}
                        <CartInNav />

                        {/* Profile (hidden on small screens) */}
                        <div
                            className="hidden md:flex flex-row gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer border border-gray-300 items-center"
                            onClick={() => router.push('/profile')}
                        >
                            <TbUserCircle size={20} className="text-gray-700" />
                            <p>{user ? user.name : "Tu cuenta"}</p>
                        </div>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div
                        className="md:hidden grid place-content-center cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <IconX className="text-gray-700" />
                        ) : (
                            <IconMenu2 className="text-gray-700" />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                setIsMenuOpen(false);
                                router.push('/catalogo');
                            }}
                        >
                            Catálogo
                        </li>
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                setIsMenuOpen(false);
                                router.push('/contacts');
                            }}
                        >
                            Contacto
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
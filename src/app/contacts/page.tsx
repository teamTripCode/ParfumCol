import NavBar from '@/components/NavBar';
import React from 'react';
import { FaFacebook, FaInstagram, FaMailBulk, FaWhatsapp } from 'react-icons/fa'; // Importando iconos de react-icons

function ContactPage() {
    const contacts = [
        {
            icon: <FaFacebook className="w-6 h-6" />,
            label: 'Facebook',
            link: 'https://facebook.com/yourcompany',
            color: 'hover:text-blue-600'
        },
        {
            icon: <FaInstagram className="w-6 h-6" />,
            label: 'Instagram',
            link: 'https://instagram.com/yourcompany',
            color: 'hover:text-pink-600'
        },
        {
            icon: <FaMailBulk className="w-6 h-6" />,
            label: 'Email',
            link: 'mailto:contact@yourcompany.com',
            color: 'hover:text-red-600'
        },
        {
            icon: <FaWhatsapp className="w-6 h-6" />,
            label: 'WhatsApp',
            link: 'https://wa.me/1234567890',
            color: 'hover:text-green-600'
        }
    ];

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Connect with us through any of our channels. We're here to help and answer any questions you may have.
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {contacts.map((contact, index) => (
                            <a
                                key={index}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex items-center p-6 bg-white rounded-lg shadow-sm 
                            transition-all duration-300 ease-in-out hover:shadow-md 
                            ${contact.color}`}
                            >
                                <div className="p-3 bg-gray-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                                    {contact.icon}
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{contact.label}</h2>
                                    <p className="text-gray-600 text-sm mt-1">Click to connect</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactPage;

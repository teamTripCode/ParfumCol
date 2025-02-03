"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import NavBar from "@/components/NavBar";
import { AccountDto } from "@/types/account";
import { useRouter } from "next/navigation";

function Profile() {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        email: '',
        names: '',
        lastNames: '',
        phone: '',
        addressOfResidence: '',
        country: '',
        city: '',
        identity_number: '',
        type_identity: ''
    });

    const router = useRouter()

    useEffect(() => {
        if (user) {
            setUserData({
                email: user.email || '',
                names: user.name || '',
                lastNames: user.lastName || '',
                phone: user.phone || '',
                addressOfResidence: '',
                country: '',
                city: '',
                identity_number: user.identity_number || '',
                type_identity: user.type_identity || '',
            });
        }
    }, [user]);

    const handleUpdate = async () => {
        const response = await fetch(`/api/accounts/${user?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (data.success) {
            console.log("Cuenta actualizada correctamente");
        } else {
            console.error("Error al actualizar la cuenta:", data.error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-6xl mx-auto px-4 mt-32 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Data Section */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Datos Personales</h2>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.names}
                                        onChange={(e) => setUserData({ ...userData, names: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Nombres"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.lastNames}
                                        onChange={(e) => setUserData({ ...userData, lastNames: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Apellidos"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Teléfono"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.identity_number}
                                        onChange={(e) => setUserData({ ...userData, identity_number: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="N° Identificacion"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleUpdate}
                                className="w-full bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 transition-colors"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>

                    {/* Delivery Data Section */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Datos de entrega</h2>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.country}
                                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="País"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.city}
                                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Ciudad"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg p-3">
                                    <span className="text-gray-500 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={userData.addressOfResidence}
                                        onChange={(e) => setUserData({ ...userData, addressOfResidence: e.target.value })}
                                        className="w-full outline-none"
                                        placeholder="Ingrese una dirección"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Lista de Direcciones</h3>
                                {/* Add address list here if needed */}
                            </div>
                        </div>
                    </div>

                    {/* Additional Options */}
                    <div className="md:col-span-2 space-y-4">
                        <button 
                        className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                        onClick={() => router.push('/orders')}
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-white rounded-full shadow">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                    </svg>
                                </span>
                                <span>Tus pedidos</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-white rounded-full shadow">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 1h2v2H7V5zm2 3H7v2h2V8zm2-3h2v2h-2V5zm2 3h-2v2h2V8z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span>Transacciones en la BlockChain</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
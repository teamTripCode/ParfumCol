"use client"

import { AccountDto } from "@/types/account";
import { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaPhone, FaHome } from "react-icons/fa"; // Importando íconos apropiados
import Select from "react-select";

const UpdateProfileForm: React.FC<{
    isLoading: boolean;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setNames: React.Dispatch<React.SetStateAction<string>>;
    setLastNames: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    handleUpdate: () => void;
    dataUser: Omit<AccountDto, 'password'>;
}> = ({
    isLoading,
    setEmail,
    setNames,
    setLastNames,
    setPhone,
    handleUpdate,
    dataUser
}) => {
        const [isClient, setIsClient] = useState(false); // Estado para asegurar que el código se ejecute solo en el cliente

        useEffect(() => {
            setIsClient(true);
        }, []);

        if (!isClient) {
            return null;
        }

        return (
            <form className="" action="#">
                {/* Correo Electrónico */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-gray-700">Correo Electrónico</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaEnvelope className="text-gray-500 dark:text-gray-400" size={18} />
                        </div>
                        <input
                            type="email"
                            value={dataUser.email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                {/* Nombres */}
                <div className="flex flex-col">
                    <label htmlFor="names" className="text-gray-700">Nombres</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaUser className="text-gray-500 dark:text-gray-400" size={18} />
                        </div>
                        <input
                            type="text"
                            id="names"
                            value={dataUser.name || ""}
                            onChange={(e) => setNames(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ej. Juan"
                        />
                    </div>
                </div>

                {/* Apellidos */}
                <div className="flex flex-col">
                    <label htmlFor="lastNames" className="text-gray-700">Apellidos</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaUser className="text-gray-500 dark:text-gray-400" size={18} />
                        </div>
                        <input
                            type="text"
                            id="lastNames"
                            value={dataUser.lastName || ""}
                            onChange={(e) => setLastNames(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ej. Pérez"
                        />
                    </div>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-gray-700">Teléfono</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaPhone className="text-gray-500 dark:text-gray-400" size={17} />
                        </div>
                        <input
                            type="text"
                            value={dataUser.phone || ""}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ej. 123456789"
                        />
                    </div>
                </div>

                {/* Dirección de Residencia */}
                {/* <div className="flex flex-col">
                    <label htmlFor="addressOfResidence" className="text-gray-700">Dirección de Residencia</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaHome className="text-gray-500 dark:text-gray-400" size={18} />
                        </div>
                        <input
                            type="text"
                            id="addressOfResidence"
                            value={dataUser.home_address || ""}
                            onChange={(e) => setAddressOfResidence(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ej. Calle 123 #45-67"
                        />
                    </div>
                </div> */}

                {/* Botón de actualización */}
                <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className={`bg-blue-400 px-4 py-1 rounded-md text-gray-100 hover:bg-blue-500 font-semibold ${isLoading ? "btn-disabled" : "btn-primary"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Actualizando..." : "Actualizar"}
                    </button>
                </div>
            </form>
        );
    };

export default UpdateProfileForm;

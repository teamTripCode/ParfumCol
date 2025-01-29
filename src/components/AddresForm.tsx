import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { TbBus } from 'react-icons/tb';

type Address = {
    country: string;
    city: string;
    address: string;
    isMain: boolean;
};

const AddressForm: React.FC = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState<Address[]>([]);
    // const [selectedMainAddress, setSelectedMainAddress] = useState<number | null>(null);

    const handleAddAddress = () => {
        if (country && city && address) {
            const newAddress: Address = {
                country,
                city,
                address,
                isMain: false, // New address is not the main by default
            };
            setAddresses((prev) => [...prev, newAddress]);
            setAddress('');
        }
    };

    const handleSelectMainAddress = (index: number) => {
        // setSelectedMainAddress(index);
        setAddresses((prev) =>
            prev.map((address, i) => ({
                ...address,
                isMain: i === index,
            }))
        );
    };

    return (
        <div className="px-5 py-8 bg-gray-100 shadow-md rounded-lg border border-gray-300">
            <div className="mb-9 flex flex-col gap-2">
                <div>
                    <TbBus className="text-gray-600" size={55} />
                </div>
                <p className="font-extrabold text-3xl text-gray-500">Datos de entrega</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">País</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    placeholder="Ingrese el país"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    placeholder="Ingrese la ciudad"
                />
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ingrese una dirección"
                />
                <button
                    type="button"
                    onClick={handleAddAddress}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md"
                >
                    <FaPlus />
                </button>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Lista de Direcciones</h3>
                <ul className="space-y-2">
                    {addresses.map((addr, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between p-2 border rounded-md ${addr.isMain ? 'bg-green-100' : ''}`}
                        >
                            <div>
                                <p className="text-sm font-semibold">{`${addr.country}, ${addr.city}`}</p>
                                <p className="text-xs">{addr.address}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleSelectMainAddress(index)}
                                    className={`p-1 text-xs ${addr.isMain ? 'text-white bg-green-500' : 'text-gray-500'}`}
                                >
                                    {addr.isMain ? 'Principal' : 'Seleccionar'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddressForm;

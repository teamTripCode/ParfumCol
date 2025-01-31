"use client"
import { useState } from "react";

interface AddCardFormProps {
    onSave: (cardInfo: {
        card_number: string;
        expiration_month: string;
        expiration_year: string;
        security_code: string;
    }) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onSave }) => {
    const [cardInfo, setCardInfo] = useState({
        card_number: "",
        expiration_month: "",
        expiration_year: "",
        security_code: "",
    });

    // Función para formatear el número de tarjeta
    const formatCardNumber = (value: string) => {
        // Eliminar todo excepto números
        const numbers = value.replace(/\D/g, '');

        // Formatear en grupos de 4
        const groups = [];
        for (let i = 0; i < numbers.length && i < 16; i += 4) {
            groups.push(numbers.slice(i, i + 4));
        }

        // Unir con espacios
        return groups.join(' ');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'card_number') {
            const formattedValue = formatCardNumber(value);
            setCardInfo(prev => ({ ...prev, [name]: formattedValue }));
        } else if (name === 'expiration_month') {
            // Validar que sea un mes válido (1-12)
            const month = value.replace(/\D/g, '');
            if (month === '' || (parseInt(month) > 0 && parseInt(month) <= 12)) {
                setCardInfo(prev => ({ ...prev, [name]: month }));
            }
        } else if (name === 'expiration_year') {
            // Solo permitir números para el año
            const year = value.replace(/\D/g, '');
            setCardInfo(prev => ({ ...prev, [name]: year }));
        } else if (name === 'security_code') {
            // Solo permitir números para el CVV
            const cvv = value.replace(/\D/g, '');
            setCardInfo(prev => ({ ...prev, [name]: cvv }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Enviar solo los números, sin espacios
        const cleanCardNumber = cardInfo.card_number.replace(/\s/g, '');
        onSave({
            ...cardInfo,
            card_number: cleanCardNumber
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Agregar nueva tarjeta</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Número de tarjeta</label>
                    <input
                        type="text"
                        name="card_number"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.card_number}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={19} // 16 números + 3 espacios
                    />
                </div>
                <div className="flex space-x-2">
                    <div className="w-1/2 space-y-1">
                        <label className="text-sm text-gray-600">Mes</label>
                        <input
                            type="text"
                            name="expiration_month"
                            placeholder="MM"
                            maxLength={2}
                            value={cardInfo.expiration_month}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="w-1/2 space-y-1">
                        <label className="text-sm text-gray-600">Año</label>
                        <input
                            type="text"
                            name="expiration_year"
                            placeholder="YY"
                            maxLength={2}
                            value={cardInfo.expiration_year}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">CVV</label>
                    <input
                        type="text"
                        name="security_code"
                        placeholder="123"
                        maxLength={3}
                        value={cardInfo.security_code}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Guardar Tarjeta
                </button>
            </form>
        </div>
    );
};

export default AddCardForm;
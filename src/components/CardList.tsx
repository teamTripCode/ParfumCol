import React, { useState } from 'react';
import { GiPayMoney } from 'react-icons/gi';

export interface CardData {
    idCardInfoAccount: string;
    lastFourDigits: string;
    expirationDate: string;
}

interface CardListProps {
    cards: CardData[];
    onSelectCard: (cardId: string) => void;
    onOpenForm: () => void
    PayInDoor: () => void
}

const CardList: React.FC<CardListProps> = ({ cards, onSelectCard, onOpenForm, PayInDoor }) => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleSelectCard = (cardId: string) => {
        setSelectedCard(cardId);
        onSelectCard(cardId);
    };

    console.log(cards)

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className='text-2xl mb-5'>Elige tu metodo de pago</h1>
            <h2 className="text-lg font-light text-gray-800 mb-2">Tarjeta debido / credito</h2>
            {cards.length > 0 ? (
                <div className="space-y-4">
                    {cards.map((card) => {
                        return (
                            <div
                                key={card.idCardInfoAccount}
                                onClick={() => handleSelectCard(card.idCardInfoAccount
                                )}
                                className={`p-4 border-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-100 cursor-pointer
                        ${selectedCard === card.idCardInfoAccount
                                        ? 'bg-blue-100 border-blue-400 shadow-md'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <div className="text-lg text-gray-500">
                                            {`•••• •••• •••• ${card.lastFourDigits}`}
                                        </div>

                                        <div className="text-sm font-semibold text-gray-800">Expiracion {card.expirationDate}</div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full ${selectedCard === card.idCardInfoAccount ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-600">No tienes tarjetas guardadas.</p>
            )}

            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={onOpenForm}
            >
                Agregar nueva tarjeta
            </button>

            <div className='flex flex-row justify-between mt-5 p-2 bg-gray-50 rounded-lg'>
                <div className='flex flex-row gap-3'>
                    <div className='grid place-content-center'>
                        <GiPayMoney size={30} className='drop-shadow-lg text-yellow-500' />
                    </div>
                    <div>
                        <h3 className='font-bold text-lg text-gray-600'>Pago contra entrega</h3>
                        <div className='flex justify-start'>
                            <p className='text-sm text-green-600'>Solo disponible en Cali</p>
                        </div>
                    </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" onClick={PayInDoor}></div>
                </label>
            </div>

        </div>
    );
};

export default CardList;
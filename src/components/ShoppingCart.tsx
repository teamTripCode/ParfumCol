"use client";

import { useAuth } from '@/context/authContext';
import { formatToCOP } from '@/handlers/FormatToCop';
import { OrderDto, OrderItem } from '@/types/account';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import CardList, { CardData } from './CardList';
import AddCardForm from './CardForm';
import axios from 'axios';

interface ShoppingCartProps {
    items?: OrderItem[];
    onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
    onRemoveItem?: (itemId: string) => void;
}

export interface cardHolderId {
    type: 'cc' | 'ce';
    number: string;
}

const ShoppingCart = ({ items = [], onUpdateQuantity, onRemoveItem }: ShoppingCartProps) => {
    const cartItems = Array.isArray(items) ? items : [];
    const { user } = useAuth();
    const [cards, setCards] = useState<CardData[]>([]);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [openFormNewCard, setOpenFormNewCard] = useState(false);
    const [isPayInDoor, setIsPayInDoor] = useState(false)

    useEffect(() => {
        const cardsSaved = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${user?.id}/cards`,
                )
                console.log(response)
                if (response.data.success === false) throw new Error(response.data.error);
                setCards(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }

        cardsSaved()
    }, [user?.id])

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const insurance = 24.99;
    const total = subtotal + insurance;

    const handleOpenForm = () => setOpenFormNewCard(!openFormNewCard);
    const handleIsPayInDoor = () => setIsPayInDoor(!isPayInDoor);

    const handleSelectCard = (cardId: string) => {
        console.log("Card Id: ", cardId)
        setSelectedCard(cardId);
        console.log("Tarjeta seleccionada:", cardId);
    };

    const handleSaveCard = async (
        cardInfo: {
            card_number: string;
            expiration_month: string;
            expiration_year: string;
            security_code: string
        }
    ) => {
        try {
            const {
                card_number,
                expiration_month,
                expiration_year,
                security_code,
            } = cardInfo

            const dataPay = {
                card_number,
                expiration_month,
                expiration_year,
                security_code,
                cardHolder: {
                    name: `${user?.name} ${user?.lastName}`,
                    identification: {
                        type: user?.type_identity,
                        number: user?.identity_number,
                    }
                }
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${user?.id}/cards`,
                dataPay
            );

            if (response.data.success == false) throw new Error(response.data.error);

            console.log("Tarjeta guardada:", cardInfo);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const RealizeOrden = async () => {
        try {
            if (!isPayInDoor && !selectedCard) throw new Error("Selecciona un metodod de pago");

            const orderData = {
                accountId: user?.id,
                items,
                totalAmount: total,
            }

            const order = await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${user?.id}/orders`,
                orderData
            )

            if (order.data.success === false) throw new Error(order.data.error);

            const succOrder: OrderDto = order.data.data;
            const { id } = succOrder;

            const paymentPayload = {
                order: {
                    id,
                    amount: total,
                    quantity: cartItems.length,
                },
                cardData: { accountId: user?.id, cardId: selectedCard },
                customerEmail: user?.email,
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/payment/create`,
                paymentPayload
            )

            if (res.data.success === false) throw new Error(res.data.error);

            const successPay = res.data.data;
            console.log(successPay);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-8 mt-20">
            <h1 className="text-2xl font-semibold text-gray-800">Carrito de compra</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-600">Su carrito de compra está vacío</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="h-24 w-24 flex-shrink-0">
                                {item.lotion?.images?.[0] ? (
                                    <Image
                                        width={500}
                                        height={500}
                                        src={item.lotion.images[0]}
                                        alt={item.lotion.name || "Producto"}
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-md">
                                        <span className="text-gray-500">Sin imagen</span>
                                    </div>
                                )}
                            </div>

                            <div className="ml-6 flex-1">
                                <h3 className="text-lg font-medium text-gray-800">{item.lotion?.name || "Producto"}</h3>
                                <p className="text-lg font-semibold text-gray-900">{formatToCOP(item.price)}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                        disabled={item.quantity <= 1}
                                    >
                                        <FiMinus className="w-5 h-5" />
                                    </button>

                                    <span className="w-8 text-center">{item.quantity}</span>

                                    <button
                                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => onRemoveItem?.(item.id)}
                                    className="p-2 text-red-500 hover:text-red-600"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <CardList
                        cards={cards}
                        onSelectCard={handleSelectCard}
                        onOpenForm={handleOpenForm}
                        PayInDoor={handleIsPayInDoor}
                    />
                    {openFormNewCard == true && <AddCardForm onSave={handleSaveCard} />}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">{formatToCOP(subtotal)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Insurance</span>
                            <span className="font-medium">{formatToCOP(insurance)}</span>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">{formatToCOP(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    onClick={RealizeOrden}
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;

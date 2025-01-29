"use client";

import { formatToCOP } from '@/handlers/FormatToCop';
import { OrderItem } from '@/types/account';
import Image from 'next/image';
import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

interface ShoppingCartProps {
    items?: OrderItem[];
    onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
    onRemoveItem?: (itemId: string) => void;
}

const ShoppingCart = ({ items = [], onUpdateQuantity, onRemoveItem }: ShoppingCartProps) => {
    const cartItems = Array.isArray(items) ? items : [];

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const insurance = 24.99;
    const total = subtotal + insurance;

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
        </div>
    );
};

export default ShoppingCart;

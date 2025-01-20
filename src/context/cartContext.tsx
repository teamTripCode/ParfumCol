"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountDto } from '@/types/account';
import { getStoredUser } from "../utils/token";

interface CartContextType {
    cartItemsCount: number;
    updateCartCount: (cartId: string) => Promise<void>;
    addToCart: (lotionId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [user, setUser] = useState<Omit<AccountDto, 'password'> | null>(null);

    const apiEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

    const getCartId = (): string | null => {
        if (user) {
            return user.cart?.id as string || null; // Suponiendo que el cartId está en el objeto del usuario
        }
        return null;
    };

    const updateCartCount = async (cartId: string) => {
        try {
            const response = await axios.get(`${apiEndpoint}/cart/${cartId}/count`);
            if (response.data.success) {
                setCartItemsCount(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const addToCart = async (lotionId: string, quantity: number) => {
        try {
            const cartId = getCartId(); // Obtenemos el cartId
            if (!cartId) {
                throw new Error('No cartId found for the user');
            }
            const response = await axios.post(`${apiEndpoint}/cart/${cartId}/add`, {
                lotionId,
                quantity
            });
            if (response.data.success) {
                await updateCartCount(cartId); // Pasamos el cartId
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    useEffect(() => {
        // Si el usuario está autenticado, obtenemos el cartId y actualizamos el count
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser(storedUser);
            const cartId = getCartId();
            if (cartId) {
                updateCartCount(cartId); // Llamamos a updateCartCount con el cartId
            }
        }
    }, [getCartId, updateCartCount]);

    return (
        <CartContext.Provider value={{ cartItemsCount, updateCartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
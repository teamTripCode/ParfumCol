"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AccountDto } from "@/types/account";
import { AuthResponse } from "@/types/account";
import { getStoredToken, storeToken, removeToken, storeUser, getStoredUser } from "../utils/token";

interface AuthContextType {
    user: AccountDto | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: AccountDto) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<AccountDto>) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AccountDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const apiEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
        router.push('/auth');
    }, [router]);

    const handleSuccessfulAuth = async (token: string, userData: AccountDto) => {
        try {
            storeToken(token);
            storeUser(userData);
            setUser(userData);

            // Esperar a que se establezcan las cookies
            await new Promise(resolve => setTimeout(resolve, 100));

            // Verificar que las cookies se establecieron correctamente
            const storedToken = getStoredToken();
            if (!storedToken) {
                throw new Error('Failed to store authentication data');
            }

            // Usar router.push para la navegación
            router.push('/profile');
        } catch (error) {
            console.error('Auth error:', error);
            removeToken();
            setUser(null);
            throw error;
        }
    };

    const refreshUser = useCallback(async () => {
        try {
            const token = getStoredToken();
            const storedUser = getStoredUser();

            if (!token || !storedUser?.id) {
                setUser(null);
                return;
            }

            const response = await axios.get<AuthResponse>(`${apiEndpoint}/accounts/me/${storedUser.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success && response.data.data) {
                setUser(response.data.data.user);
                storeUser(response.data.data.user);
            }
        } catch (error) {
            console.error("Error refreshing user:", error);
            logout();
        }
    }, [apiEndpoint, logout]);


    const register = async (userData: AccountDto) => {
        try {
            const response = await axios.post<AuthResponse>(`${apiEndpoint}/accounts`, userData);

            if (response.data.success && response.data.access_token && response.data.data) {
                await handleSuccessfulAuth(response.data.access_token, response.data.data.user);
            } else {
                throw new Error(response.data.error || "Error en el registro");
            }
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post<AuthResponse>(`${apiEndpoint}/accounts/login`, {
                email,
                password,
            });

            if (response.data.success && response.data.access_token && response.data.data) {
                await handleSuccessfulAuth(response.data.access_token, response.data.data.user);
            } else {
                throw new Error(response.data.error || "Error en el inicio de sesión");
            }
        } catch (error) {
            throw error;
        }
    };

    const updateProfile = async (data: Partial<AccountDto>) => {
        try {
            const token = getStoredToken();
            const response = await axios.patch<AuthResponse>(`${apiEndpoint}/account/${data.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success && response.data.data) {
                setUser(response.data.data.user);
                storeUser(response.data.data.user);
            }
        } catch (error) {
            console.error("Update profile error:", error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = getStoredToken();
                const storedUser = getStoredUser();

                if (token && storedUser) {
                    setUser(storedUser);
                    await refreshUser();
                } else {
                    removeToken();
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                removeToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [refreshUser]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user && !!getStoredToken(),
            isLoading,
            login,
            register,
            logout,
            updateProfile,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
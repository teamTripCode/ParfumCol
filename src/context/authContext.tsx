"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AccountDto } from "@/types/account";
import { AuthResponse } from "@/types/account";
import { getStoredToken, storeToken, removeToken, storeUser, getStoredUser } from "../utils/token";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "@/types/account";

interface AuthContextType {
    user: Omit<AccountDto, 'password'> | null;
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
    const [user, setUser] = useState<Omit<AccountDto, 'password'> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const apiEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
        router.push('/auth');
    }, [router]);

    const handleSuccessfulAuth = async (token: string) => {
        try {
            // 1. Decodificar el token
            const decoded = jwtDecode<JwtPayload>(token);
            const { accountId } = decoded;

            // 2. Obtener datos del usuario primero
            const response = await axios.get<{
                success: boolean;
                data: Omit<AccountDto, 'password'>;
            }>(`${apiEndpoint}/accounts/me/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("dataFull: ", response.data)

            if (!response.data.success || !response.data.data) {
                throw new Error('Failed to fetch user data');
            }

            // 3. Almacenar token y usuario de forma síncrona
            storeToken(token);
            storeUser(response.data.data);

            // 4. Actualizar estado
            setUser(response.data.data);

            // 5. Verificar que todo se almacenó correctamente
            const storedToken = getStoredToken();
            const storedUser = getStoredUser();

            if (!storedToken || !storedUser) {
                throw new Error('Failed to store authentication data');
            }

            // 6. Redireccionar sin delay
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

            // console.log("refresh: ", response.data)

            if (response.data.success && response.data.data) {
                const data: Omit<AccountDto, 'password'> = {
                    id: response.data.data.id || '',
                    name: response.data.data.name || '',
                    lastName: response.data.data.lastName || '',
                    email: response.data.data.email || '',
                    country: response.data.data.country || '',
                    code_country: response.data.data.code_country || '',
                    city: response.data.data.city || '',
                    phone: response.data.data.phone || '',
                    home_address: response.data.data.home_address || '',
                    cart: response.data.data.cart || undefined,
                };
                setUser(data);
                storeUser(data);
            }
        } catch (error) {
            console.error("Error refreshing user:", error);
            logout();
        }
    }, [apiEndpoint, logout]);


    const register = async (userData: AccountDto) => {
        try {
            const response = await axios.post<AuthResponse>(`${apiEndpoint}/accounts`, userData);

            if (response.data.success && response.data.accessToken && response.data.data) {
                await handleSuccessfulAuth(response.data.accessToken);
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

            console.log(response)

            if (response.data.success && response.data.accessToken) {
                await handleSuccessfulAuth(response.data.accessToken);
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
                setUser(response.data.data);
                storeUser(response.data.data);
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
import { AccountDto } from "@/types/account";
import Cookies from 'js-cookie';

export const TOKEN_KEY = '@parfumcol/token';
export const USER_KEY = '@parfumcol/user';

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: '/',
  sameSite: 'Lax',  // Note la mayúscula en 'Lax'
  expires: 7,
  // secure: process.env.NODE_ENV === 'production'  // Opcional
};

export const getStoredToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const storeToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
};

export const storeUser = (user: AccountDto): void => {
  Cookies.set(USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);
};

export const getStoredUser = (): AccountDto | null => {
  try {
    const userStr = Cookies.get(USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
  Cookies.remove(USER_KEY, { path: '/' });
};
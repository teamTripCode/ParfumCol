import { AccountDto } from "@/types/account";

export const TOKEN_KEY = '@parfumcol/token';
export const USER_KEY = '@parfumcol/user';

export const storeToken = (token: string): void => {
  if (!token) {
    throw new Error('Token is required');
  }
  try {
    // Solo usar document.cookie con el formato correcto
    document.cookie = `@parfumcol/token=${token}; path=/; max-age=86400; samesite=lax`;
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    throw error;
  }
};

export const storeUser = (user: Omit<AccountDto, 'password'>): void => {
  if (!user || !user.id) {
    throw new Error('Invalid user data');
  }
  try {
    const userString = JSON.stringify(user);
    // Solo usar document.cookie con el formato correcto
    document.cookie = `@parfumcol/user=${userString}; path=/; max-age=86400; samesite=lax`;
    console.log('User stored successfully');
  } catch (error) {
    console.error('Error storing user:', error);
    throw error;
  }
};

export const getStoredToken = (): string | null => {
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('@parfumcol/token='));
    return tokenCookie ? tokenCookie.split('=')[1].trim() : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const getStoredUser = (): Omit<AccountDto, 'password'> | null => {
  try {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('@parfumcol/user='));
    if (!userCookie) return null;

    const userStr = userCookie.split('=').slice(1).join('=').trim();
    const user = JSON.parse(userStr);

    if (!user.id) {
      throw new Error('Invalid user data structure');
    }
    return user;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

export const removeToken = (): void => {
  try {
    document.cookie = `@parfumcol/token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    document.cookie = `@parfumcol/user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};
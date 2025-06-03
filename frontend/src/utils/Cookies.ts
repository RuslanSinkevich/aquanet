import Cookies from "js-cookie";
import { IUser } from "models/Users/user.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCookie = (name: string, value: any) => {
  // Используйте Cookies.set для установки значения в куки
  Cookies.set(name, JSON.stringify(value));
};

export const delCookie = (name: string) => {
  Cookies.remove(name);
};

export const getCookie = <T>(name: string): T | undefined => {
  const cookieValue = Cookies.get(name);
  return cookieValue ? (JSON.parse(cookieValue) as T) : undefined;
};

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export const setAuthCookie = (token: string, user: IUser | null) => {
  try {
    if (token) {
      Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 день
    }
    if (user) {
      Cookies.set(USER_KEY, JSON.stringify(user), { expires: 1 });
    }
  } catch (error) {
    console.error('Error setting auth cookies:', error);
  }
};

export const getAuthToken = (): string | null => {
  try {
    return Cookies.get(TOKEN_KEY) || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getAuthUser = (): IUser | null => {
  try {
    const userStr = Cookies.get(USER_KEY);
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    if (!user || typeof user !== 'object') return null;
    
    return user as IUser;
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
};

export const clearAuthCookies = () => {
  try {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
  } catch (error) {
    console.error('Error clearing auth cookies:', error);
  }
};

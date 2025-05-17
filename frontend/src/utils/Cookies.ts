import Cookies from "js-cookie";

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

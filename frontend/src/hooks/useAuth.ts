import { useAppSelector } from "./Redux";

export function useAuth() {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  return { token, user, isLoggedIn: Boolean(token && user) };
}

import { store } from '../store/store';
import { UserRole } from '../common/enums/user-role.enum';
import { setAuthCookie, clearAuthCookies } from '../utils/Cookies';
import { IUser } from '../models/Users/user.model';

export class AuthService {
  static isAuthenticated(): boolean {
    const state = store.getState();
    return !!state.auth.token && !!state.auth.user;
  }

  static getUserRole(): UserRole | null {
    const state = store.getState();
    if (!state.auth.user) return null;
    return state.auth.user.role;
  }

  static hasRole(requiredRole: UserRole): boolean {
    const userRole = this.getUserRole();
    if (userRole === null) return false;
    return userRole <= requiredRole; // Используем <= чтобы роли с меньшим номером имели больше прав
  }

  static setUserData(token: string, user: IUser): void {
    setAuthCookie(token, user);
  }

  static clearUserData(): void {
    clearAuthCookies();
  }
} 
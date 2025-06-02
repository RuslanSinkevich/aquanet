import { store } from '../store/store';
import { UserRole } from '../common/enums/user-role.enum';

export class AuthService {
  static isAuthenticated(): boolean {
    const state = store.getState();
    return !!state.auth.token;
  }

  static getUserRole(): UserRole | null {
    const state = store.getState();
    return state.auth.user?.role ?? null;
  }

  static hasRole(requiredRole: UserRole): boolean {
    const userRole = this.getUserRole();
    if (userRole === null) return false;
    return userRole <= requiredRole; // Используем <= чтобы роли с меньшим номером имели больше прав
  }

  static setUserData(token: string, role: UserRole): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role.toString());
  }

  static clearUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
} 
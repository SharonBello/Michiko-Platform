export type UserRole = 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  schoolId: string;
  createdAt: string;
}

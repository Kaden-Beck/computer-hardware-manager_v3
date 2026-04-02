export interface AppUser {
  uuid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  provider: 'google.com';
  lastSignIn: string; // ISO date string
  createdAt: string; // ISO date string
  revoked: boolean;
  isCurrentUser?: boolean;
}

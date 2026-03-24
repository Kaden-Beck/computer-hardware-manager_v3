// Placeholder to build out the static page for manage users. Likely to change depending on Firestore implementation.

export interface AppUser {
  uuid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  provider: 'google.com' | 'password';
  lastSignIn: string; // ISO date string
  createdAt: string; // ISO date string
  revoked: boolean;
  isCurrentUser?: boolean;
}

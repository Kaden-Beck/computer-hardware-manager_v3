import type { ZodEmail } from "zod";

export interface AppUser {
  uuid: string;
  displayName: string;
  email: ZodEmail;
  photoURL?: string;
  provider: 'google.com';
  lastSignIn: Date; // ISO date string
  createdAt: Date; // ISO date string
  revoked: boolean;
  isCurrentUser?: boolean;
}

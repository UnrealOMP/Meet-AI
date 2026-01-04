// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// convenience exports
export const { signIn, signUp, useSession, signOut } = authClient;

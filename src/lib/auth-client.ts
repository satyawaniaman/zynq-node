"use client";

import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

function getBaseURL() {
  // In browser, use current domain
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  
  // For SSR, try environment variables
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback for development
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [
    emailOTPClient()
  ],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { EmailVerificationRequired } from "./email-verification-required";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, isEmailVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        aria-live="polite"
      >
        <PuffLoader size={150} color="black" />
      </div>
    );
  }

  // Don't render anything if no user
  if (!user) {
    return null;
  }

  // Show email verification required if user exists but email is not verified
  if (user && !isEmailVerified) {
    return <EmailVerificationRequired user={user} />;
  }

  // Only render children if user is authenticated and email is verified
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

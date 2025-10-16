"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function RedirectIfAuthenticated({
  children,
  redirectTo = "/dashboard",
}: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        aria-live="polite"
      >
        <PuffLoader size={150} color="black" />
      </div>
    );
  }

  // Don't render children if authenticated
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

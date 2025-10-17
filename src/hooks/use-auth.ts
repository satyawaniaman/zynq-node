import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const session = authClient.useSession();

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Check if user exists and email is verified
  const isAuthenticated = !!(
    session.data?.user && 
    session.data.user.emailVerified
  );

  return {
    user: session.data?.user || null,
    session: session.data,
    isLoading: session.isPending,
    isAuthenticated,
    isEmailVerified: session.data?.user?.emailVerified || false,
    signOut,
  };
}

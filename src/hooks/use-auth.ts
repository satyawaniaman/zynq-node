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

  return {
    user: session.data?.user || null,
    session: session.data,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    signOut,
  };
}

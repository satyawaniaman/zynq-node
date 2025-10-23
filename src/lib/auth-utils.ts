import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const isAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/login");
  }
  return session;
};

export const redirectIfAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session && session.user) {
    redirect("/dashboard");
  }
};

import { LoginForm } from "@/app/features/auth/components/login-form";
import { redirectIfAuthenticated } from "@/lib/auth-utils";

export default async function LoginPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated();
  
  return (
    <LoginForm/>
  );
}

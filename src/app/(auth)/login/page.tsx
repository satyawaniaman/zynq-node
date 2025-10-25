import { LoginForm } from "@/app/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

export default async function LoginPage() {
  // Redirect to dashboard if already authenticated
  await requireUnauth();
  
  return (
    <LoginForm/>
  );
}

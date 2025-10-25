import { RegisterForm } from '@/app/features/auth/components/register-form';
import { requireAuth } from "@/lib/auth-utils";

async function SignupPage() {
  // Redirect to dashboard if already authenticated
  await requireAuth();
  
  return (
    <RegisterForm/>
  );
}

export default SignupPage;
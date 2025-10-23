import { RegisterForm } from '@/app/features/auth/components/register-form';
import { redirectIfAuthenticated } from "@/lib/auth-utils";

async function SignupPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated();
  
  return (
    <RegisterForm/>
  );
}

export default SignupPage;
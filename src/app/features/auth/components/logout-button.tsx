"use client";
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    router.push('/login');
                }
            }

        })
    }
  return (
    <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton

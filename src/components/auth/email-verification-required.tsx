"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { OTPVerification } from "./otp-verification";
import { useRouter } from "next/navigation";

interface EmailVerificationRequiredProps {
  user: {
    email: string;
    name?: string;
  };
}

export function EmailVerificationRequired({ user }: EmailVerificationRequiredProps) {
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      await authClient.emailOtp.sendVerificationOtp({
        email: user.email,
        type: "email-verification",
      });
      setShowOTPVerification(true);
    } catch (error) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleVerificationSuccess = () => {
    // Refresh the page to update the session
    window.location.reload();
  };

  if (showOTPVerification) {
    return (
      <div className="min-h-screen bg-black w-full relative">
        {/* Midnight Radial Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: ` 
              radial-gradient(circle at 50% 50%, 
                rgba(226, 232, 240, 0.2) 0%, 
                rgba(226, 232, 240, 0.1) 25%, 
                rgba(226, 232, 240, 0.05) 35%, 
                transparent 50% 
              ) 
            `,
          }}
        />
        <section className="flex min-h-screen px-4 py-16 md:py-32 relative z-10">
          <div className="bg-black/20 backdrop-blur-sm m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border border-white/10 p-6 shadow-2xl">
            <OTPVerification
              email={user.email}
              onBack={() => setShowOTPVerification(false)}
              onSuccess={handleVerificationSuccess}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black w-full relative">
      {/* Midnight Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: ` 
            radial-gradient(circle at 50% 50%, 
              rgba(226, 232, 240, 0.2) 0%, 
              rgba(226, 232, 240, 0.1) 25%, 
              rgba(226, 232, 240, 0.05) 35%, 
              transparent 50% 
            ) 
          `,
        }}
      />
      <section className="flex min-h-screen px-4 py-16 md:py-32 relative z-10">
        <div className="bg-black/20 backdrop-blur-sm m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Email verification required icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Email Verification Required
            </h1>
            <p className="text-gray-300 mb-4">
              Hi {user.name || "there"}! Your account was created successfully, but you need to verify your email address to continue.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Email: <span className="font-medium text-white">{user.email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>

            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10 text-white"
            >
              Sign Out
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              For security reasons, you must verify your email address before accessing your account.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
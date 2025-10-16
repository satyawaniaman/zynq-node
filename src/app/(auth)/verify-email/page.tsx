"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setError("No verification token provided");
        return;
      }

      try {
        const result = await authClient.verifyEmail({
          query: {
            token: token,
          },
        });

        if (result.error) {
          setStatus("error");
          setError(result.error.message || "Verification failed");
        } else {
          setStatus("success");
        }
      } catch (_err) {
        setStatus("error");
        setError("An unexpected error occurred during verification");
      }
    };

    verifyEmail();
  }, [token]);

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
        <div className="bg-black/20 backdrop-blur-sm m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border border-white/10 p-6 shadow-2xl text-center">
          {status === "loading" && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Verifying Email
              </h1>
              <p className="text-gray-300">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Success checkmark icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-300 mb-4">
                Your email address has been successfully verified.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                You can now sign in to your account and access all features.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Error icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-300 mb-4">{error}</p>
              <p className="text-sm text-gray-400 mb-6">
                The verification link may have expired or is invalid. Please try
                signing up again.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {status === "success" && (
              <Button
                asChild
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
              >
                <Link href="/login">Sign In to Your Account</Link>
              </Button>
            )}

            {status === "error" && (
              <Button
                asChild
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
              >
                <Link href="/signup">Try Again</Link>
              </Button>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Need help?{" "}
                <Link
                  href="/login"
                  className="text-blue-300 hover:text-blue-200 underline"
                >
                  Back to Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black w-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
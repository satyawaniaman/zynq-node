"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        // Check if the error is related to email verification
        if (
          result.error.message?.includes("email") &&
          result.error.message?.includes("verify")
        ) {
          setError(
            "Please verify your email address before signing in. Check your inbox for a verification link.",
          );
        } else {
          setError(result.error.message || "Sign in failed");
        }
      } else {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      }
    } catch (_err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (_err) {
      setError("Google sign in failed");
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (_err) {
      setError("GitHub sign in failed");
      setIsLoading(false);
    }
  };
  return (
    <RedirectIfAuthenticated>
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
          <form
            onSubmit={handleEmailSignIn}
            className="bg-black/20 backdrop-blur-sm m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border border-white/10 p-0.5 shadow-2xl"
          >
            <div className="p-8 pb-6">
              <div>
                <h1 className="mb-1 mt-4 text-xl font-semibold text-gray-200">
                  Sign In to Zynq Node
                </h1>
                <p className="text-sm text-gray-200">
                  Welcome back! Sign in to continue
                </p>
                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    <title>Google Logo</title>
                    <path
                      fill="#4285f4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34a853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#fbbc05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                      fill="#eb4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                  <span>Google</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <title>GitHub Logo</title>
                    <path
                      fill="currentColor"
                      d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                    ></path>
                  </svg>
                  <span>GitHub</span>
                </Button>
              </div>

              <hr className="my-4 border-dashed border-white/20" />

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="block text-sm text-gray-200"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pwd" className="text-sm text-gray-200">
                      Password
                    </Label>
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="text-blue-300 hover:text-blue-200"
                    >
                      <Link href="#" className="text-sm">
                        Forgot your Password ?
                      </Link>
                    </Button>
                  </div>
                  <Input
                    type="password"
                    required
                    name="pwd"
                    id="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full border-white/20 hover:bg-white/10"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </div>

            <div className="border-t border-white/20 p-6 pt-4">
              <p className="text-center text-sm text-gray-300">
                Don't have an account?
                <Button
                  asChild
                  variant="link"
                  className="px-2 text-blue-300 hover:text-blue-200"
                >
                  <Link href="/signup">Create account</Link>
                </Button>
              </p>
            </div>
          </form>
        </section>
      </div>
    </RedirectIfAuthenticated>
  );
}

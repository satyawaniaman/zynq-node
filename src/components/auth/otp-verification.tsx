"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface OTPVerificationProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function OTPVerification({ email, onBack, onSuccess }: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (result.error) {
        setError(result.error.message || "Invalid verification code");
      } else {
        onSuccess();
      }
    } catch (error) {
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      setResendCooldown(60);
    } catch (error) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Email verification icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-300 mb-4">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-white">{email}</span>
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Please enter the code below to verify your email address. The code will expire in 5 minutes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError("");
            }}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot 
                index={0} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
              <InputOTPSlot 
                index={1} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
              <InputOTPSlot 
                index={2} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
              <InputOTPSlot 
                index={3} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
              <InputOTPSlot 
                index={4} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
              <InputOTPSlot 
                index={5} 
                className="w-12 h-12 text-lg font-semibold bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50" 
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-md p-3">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleResendOTP}
              disabled={isResending}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10 text-white"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </Button>

            <Button
              onClick={onBack}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10 text-white"
            >
              Back to Sign Up
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already verified?{" "}
              <Link
                href="/login"
                className="text-blue-300 hover:text-blue-200 underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
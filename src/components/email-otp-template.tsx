import * as React from "react";

interface EmailOTPTemplateProps {
  otp: string;
  userEmail: string;
}

export function EmailOTPTemplate({
  otp,
  userEmail,
}: EmailOTPTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              color: "#1f2937",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
            }}
          >
            Verify Your Email Address
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              margin: "0",
            }}
          >
            Enter the verification code below to complete your registration.
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <p
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "1.5",
              margin: "0 0 20px 0",
            }}
          >
            Hi there,
          </p>
          <p
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "1.5",
              margin: "0 0 20px 0",
            }}
          >
            Thank you for signing up with <strong>{userEmail}</strong>. To
            complete your registration and secure your account, please enter
            the verification code below.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#f3f4f6",
              padding: "20px 30px",
              borderRadius: "8px",
              border: "2px dashed #d1d5db",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1f2937",
              letterSpacing: "8px",
              fontFamily: "monospace",
            }}
          >
            {otp}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            This verification code will expire in 5 minutes for security reasons.
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
            marginTop: "30px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              lineHeight: "1.5",
              margin: "0",
            }}
          >
            If you didn't create an account, you can safely ignore this email.
            This verification code is only valid for 5 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
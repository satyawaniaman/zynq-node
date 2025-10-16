import * as React from "react";

interface EmailVerificationTemplateProps {
  verificationUrl: string;
  userEmail: string;
}

export function EmailVerificationTemplate({
  verificationUrl,
  userEmail,
}: EmailVerificationTemplateProps) {
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
            Welcome! Please verify your email address to complete your
            registration.
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
            complete your registration and secure your account, please verify
            your email address by clicking the button below.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <a
            href={verificationUrl}
            style={{
              display: "inline-block",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Verify Email Address
          </a>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0 0 10px 0",
            }}
          >
            If the button doesn't work, you can also copy and paste this link
            into your browser:
          </p>
          <p
            style={{
              color: "#3b82f6",
              fontSize: "14px",
              wordBreak: "break-all",
              margin: "0",
            }}
          >
            {verificationUrl}
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
            This verification link will expire in 24 hours. If you didn't create
            an account, you can safely ignore this email.
          </p>
        </div>
      </div>
    </div>
  );
}

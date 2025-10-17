import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/email-verification-template";
import { EmailOTPTemplate } from "@/components/email-otp-template";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  react?: React.ReactElement;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  react,
}: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Zynq Node <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
      html,
      react,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

// Send verification email using React template
export async function sendVerificationEmail(
  to: string,
  verificationUrl: string,
) {
  return sendEmail({
    to,
    subject: "Verify Your Email Address - Zynq Node",
    react: EmailVerificationTemplate({
      verificationUrl,
      userEmail: to,
    }),
  });
}

// Send OTP verification email using React template
export async function sendOTPVerificationEmail(
  to: string,
  otp: string,
) {
  return sendEmail({
    to,
    subject: "Your Verification Code - Zynq Node",
    react: EmailOTPTemplate({
      otp,
      userEmail: to,
    }),
  });
}

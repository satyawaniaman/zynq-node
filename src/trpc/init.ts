import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

// Better Auth session type - the getSession returns an object with session and user properties
type BetterAuthSession = {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

// Enhanced context type for better type safety
export type Context = {
  userId?: string;
  authSession?: BetterAuthSession | null;
};

export type ProtectedContext = Context & {
  authSession: BetterAuthSession;
  user: BetterAuthSession["user"];
  session: BetterAuthSession["session"];
};

export const createTRPCContext = cache(async (): Promise<Context> => {
  try {
    const authSession = await auth.api.getSession({
      headers: await headers(),
    });
    
    return {
      userId: authSession?.user?.id,
      authSession,
    };
  } catch (error) {
    console.error("Failed to get session in tRPC context:", error);
    return {
      userId: undefined,
      authSession: null,
    };
  }
});

// Initialize tRPC with context type
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Enhanced protected procedure with comprehensive security checks
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  try {
    // Get fresh session data for maximum security
    const authSession = await auth.api.getSession({
      headers: await headers(),
    });

    // Comprehensive session validation
    if (!authSession) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "Authentication required. Please sign in to continue." 
      });
    }

    if (!authSession.user) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "Invalid session. User data not found." 
      });
    }

    if (!authSession.user.id) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "Invalid user session. User ID not found." 
      });
    }

    if (!authSession.session) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "Invalid session data." 
      });
    }

    // Additional security: Check if user is active/verified if needed
    if (authSession.user.emailVerified === false) {
      throw new TRPCError({ 
        code: "FORBIDDEN", 
        message: "Email verification required. Please verify your email to continue." 
      });
    }

    // Check if session is expired
    if (authSession.session.expiresAt < new Date()) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "Session has expired. Please sign in again." 
      });
    }

    // Return enhanced context with proper typing
    return next({
      ctx: {
        ...ctx,
        authSession,
        user: authSession.user,
        session: authSession.session,
      },
    });
  } catch (error) {
    // Handle any unexpected errors during authentication
    if (error instanceof TRPCError) {
      throw error;
    }
    
    console.error("Unexpected error in protectedProcedure:", error);
    throw new TRPCError({ 
      code: "INTERNAL_SERVER_ERROR", 
      message: "Authentication service temporarily unavailable." 
    });
  }
});

// Optional: Admin-only procedure for role-based access
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  // Check if user has admin role (adjust based on your user schema)
  // For now, using email as admin check - you can extend user schema to add role field
  const isAdmin = ctx.user.email === "amansatyawani10@gmail.com";
  
  if (!isAdmin) {
    throw new TRPCError({ 
      code: "FORBIDDEN", 
      message: "Administrator access required." 
    });
  }

  return next({
    ctx: {
      ...ctx,
      isAdmin: true,
    },
  });
});

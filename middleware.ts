import { NextRequest, NextResponse } from "next/server";

// Lightweight session validation for edge runtime
async function validateSession(request: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");
    
    if (!sessionCookie) {
      return null;
    }

    // Make a lightweight API call to validate session
    const baseUrl = process.env.BETTER_AUTH_URL || request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return null;
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const authRoutes = ["/login", "/signup", "/verify-email"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  try {
    // Get session using lightweight validation
    const session = await validateSession(request);

    // If accessing a protected route
    if (isProtectedRoute) {
      // No session at all - redirect to login
      if (!session || !session.user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // User exists but email not verified - allow access (handled by ProtectedRoute component)
      // This allows the EmailVerificationRequired component to be shown
      if (!session.user.emailVerified) {
        return NextResponse.next();
      }

      // User is authenticated and verified - allow access
      return NextResponse.next();
    }

    // If accessing auth routes and user is already authenticated with verified email
    if (isAuthRoute && session?.user?.emailVerified) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // For all other routes, allow access
    return NextResponse.next();

  } catch (error) {
    console.error("Middleware error:", error);
    
    // If there's an error and it's a protected route, redirect to login
    if (isProtectedRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For non-protected routes, allow access even if there's an error
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
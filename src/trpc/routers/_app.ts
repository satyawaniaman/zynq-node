import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../init";

export const appRouter = createTRPCRouter({
  // Get current user data
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  // Get all users (admin only)
  getAllUsers: adminProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // Get user sessions (for current user)
  getUserSessions: protectedProcedure.query(({ ctx }) => {
    return prisma.session.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: {
        id: true,
        expiresAt: true,
        createdAt: true,
        ipAddress: true,
        userAgent: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

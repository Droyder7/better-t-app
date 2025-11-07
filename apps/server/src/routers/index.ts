import prisma from "prisma";
import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { todoRouter } from "./todo";

export const appRouter = {
  healthCheck: publicProcedure.handler(async () => {
    try {
      await prisma.$executeRaw`SELECT 1"`;
      return "OK";
    } catch (error) {
      console.error("Database connection failed:", error);
      return "Not OK";
    }
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.auth.user,
    };
  }),
  todo: todoRouter,
};
export type AppRouter = typeof appRouter;

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return "hello trpc";
  }),
});

export type AppRouter = typeof appRouter;

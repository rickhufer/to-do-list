import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

const prisma = new PrismaClient();

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getAllTodos: t.procedure.query(async () => {
    return await prisma.todo.findMany();
  }),

  createTodo: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        status: z.string().default("PENDING"),
      })
    )
    .mutation(async (opts) => {
      return await prisma.todo.create({
        data: {
          title: opts.input.title,
          status: opts.input.status,
        },
      });
    }),

  getTodoById: t.procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.todo.findUnique({
      where: {
        id: input,
      },
    });
  }),

  updateTodo: t.procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        status: z.enum(["PENDING", "COMPLETED"]),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.todo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          status: input.status,
        },
      });
    }),

  deleteTodo: t.procedure.input(z.number()).mutation(async ({ input }) => {
    return await prisma.todo.deleteMany({
      where: {
        id: input,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;

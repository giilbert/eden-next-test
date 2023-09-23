import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";

const prisma = new PrismaClient();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/todos", async () => {
    return await prisma.todo.findMany();
  })
  .delete("/todo/:id", async ({ params }) => {
    await prisma.todo.delete({
      where: {
        id: params.id,
      },
    });
  })
  .post(
    "/todo",
    async ({ body }) => {
      await prisma.todo.create({
        data: {
          title: body.title,
          content: body.content,
        },
      });
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.Optional(t.String()),
      }),
    }
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;

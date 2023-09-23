import { api } from "@/utils/eden";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { DeleteButton } from "./_components/delete-button";

export default async function Home() {
  const todos = await api.todos.get();

  async function deleteTodo(data: FormData) {
    "use server";

    const id = data.get("id");
    if (!id || typeof id !== "string") throw new Error("id is required");

    await api.todo[id].delete();
    revalidatePath("/");
  }

  return (
    <>
      <h1 className="text-4xl font-medium mb-2">Next + Elysia Todo App</h1>

      <hr className="my-4" />

      <div className="mb-4">
        <Link
          href="/create"
          className="text-purple-600 hover:underline text-lg"
        >
          Create Todo
        </Link>
      </div>

      {todos.error && (
        <p className="text-red-500">Error: {JSON.stringify(todos.error)}</p>
      )}

      {todos.data && todos.data.length === 0 && (
        <p className="text-neutral-500 text-lg">No todos..</p>
      )}
      {todos.data && (
        <ul className="list-disc">
          {todos.data.map((todo) => (
            <li key={todo.id} className="my-1">
              <div className="flex gap-2 border px-3 py-2 rounded">
                <div>
                  <h2 className="underline">{todo.title}</h2>
                  <p>{todo.content}</p>
                </div>
                <div className="ml-auto">
                  <form action={deleteTodo}>
                    <input type="hidden" name="id" value={todo.id} />
                    <DeleteButton />
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

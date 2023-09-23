import { api } from "@/utils/eden";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { SubmitButton } from "./_components/submit-button";
import { redirect } from "next/navigation";

export default function Create() {
  async function addTodo(data: FormData) {
    "use server";

    const title = data.get("title");
    const content = data.get("content");

    if (!title || typeof title !== "string")
      throw new Error("title is required");
    if (!content || typeof content !== "string")
      throw new Error("content is required");

    await api.todo.post({ title, content });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <>
      <Link href="/" className="text-purple-600 hover:underline mb-2">
        Go back
      </Link>
      <h1 className="text-2xl font-medium mb-2">Create Todo</h1>

      <form action={addTodo} className="mt-4 flex flex-col gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border px-3 py-2 rounded"
          autoComplete="off"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="border px-3 py-2 rounded h-64 resize-none"
          autoComplete="off"
          required
        />

        <SubmitButton />
      </form>
    </>
  );
}

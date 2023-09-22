import { api } from "@/utils/eden";

export default async function Home() {
  const message = await api.index.get();
  return <p>the message from eden is: {JSON.stringify(message)}</p>;
}

"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const SubmitButton: React.FC = () => {
  const { pending: isLoading } = useFormStatus();
  return (
    <button
      className="bg-purple-600 text-neutral-100 py-2 px-3 rounded enabled:hover:bg-purple-700 disabled:bg-purple-500"
      disabled={isLoading}
    >
      {!isLoading ? "Add Todo" : "Loading"}
    </button>
  );
};

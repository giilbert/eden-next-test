"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const DeleteButton: React.FC = () => {
  const { pending: isLoading } = useFormStatus();

  return (
    <button
      className="text-red-500 disabled:text-neutral-500"
      disabled={isLoading}
    >
      {!isLoading ? "Delete" : "Loading"}
    </button>
  );
};

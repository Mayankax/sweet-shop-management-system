import type { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}

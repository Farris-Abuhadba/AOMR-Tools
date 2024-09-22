"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">Sign In</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In with Google
      </button>
    </div>
  );
}

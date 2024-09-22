"use client"; // This is a client-side component

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
import { useEffect } from "react";

export default function GuideBuilder() {
  const { data: session, status } = useSession(); // Use status to track session state
  const router = useRouter(); // Initialize useRouter to handle redirection

  useEffect(() => {
    if (status === "unauthenticated") {
      // If the user is not authenticated, redirect to login page
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while session is being fetched
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-6">Welcome to GuideBuilder</h1>
        <p>You are authenticated as {session?.user?.email}</p>
      </div>
    );
  }

  return null; // Default return if there's no session and redirection is in progress
}

// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Voting Dashboard</h1>
        <p className="text-muted-foreground">
          A modern platform for creating and managing voting systems
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </main>
  );
}
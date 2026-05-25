// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

// Optional: Add PATCH handler if needed for newer NextAuth versions
export const PATCH = handlers.POST;
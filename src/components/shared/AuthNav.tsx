"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface SessionUser {
  id: string;
  email: string;
  createdAt: string;
  lastLoginAt?: string;
}

interface AuthNavProps {
  mobile?: boolean;
}

export default function AuthNav({ mobile = false }: AuthNavProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });

        const data = (await response.json()) as { user?: SessionUser | null };

        if (isMounted) {
          setUser(data.user || null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <div className={mobile ? "pt-2" : "hidden items-center gap-2 lg:flex"}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Checking session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={mobile ? "pt-2" : "hidden items-center gap-2 lg:flex"}>
        <Button asChild size="sm" className={mobile ? "w-full" : undefined}>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={mobile ? "space-y-3 pt-2" : "hidden items-center gap-3 lg:flex"}>
      <span
        className={
          mobile
            ? "block text-sm text-gray-600 dark:text-gray-300"
            : "max-w-[220px] truncate text-sm text-gray-600 dark:text-gray-300"
        }
      >
        {user.email}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => void handleLogout()}
        disabled={isLoggingOut}
        className={mobile ? "w-full" : undefined}
      >
        {isLoggingOut ? "Signing out..." : "Log Out"}
      </Button>
    </div>
  );
}

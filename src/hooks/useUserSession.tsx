import { useEffect, useState } from "react";
import type { UserSession } from "../types/types";

export default function useUserSession() {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem("user-login-finances");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user-login-finances", JSON.stringify(user));
    } else {
      localStorage.removeItem("user-login-finances");
    }
  }, [user]);

  const logout = () => setUser(null);

  return { user, setUser, logout };
}

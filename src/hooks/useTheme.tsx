import { useEffect, useState } from "react";

export default function useTheme() {
  const [isDark, setIsDark] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  return { isDark, setIsDark };
}

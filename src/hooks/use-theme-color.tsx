import { useEffect, useState } from "react";

export type ThemeColor = "green" | "blue" | "purple" | "orange" | "pink";

const colorThemes = {
  green: {
    light: { primary: "120 61% 34%", accent: "120 61% 34%", ring: "120 61% 34%" },
    dark: { primary: "120 61% 40%", accent: "120 61% 40%", ring: "120 61% 40%" }
  },
  blue: {
    light: { primary: "210 100% 45%", accent: "210 100% 45%", ring: "210 100% 45%" },
    dark: { primary: "210 100% 50%", accent: "210 100% 50%", ring: "210 100% 50%" }
  },
  purple: {
    light: { primary: "270 70% 45%", accent: "270 70% 45%", ring: "270 70% 45%" },
    dark: { primary: "270 70% 50%", accent: "270 70% 50%", ring: "270 70% 50%" }
  },
  orange: {
    light: { primary: "30 100% 45%", accent: "30 100% 45%", ring: "30 100% 45%" },
    dark: { primary: "30 100% 50%", accent: "30 100% 50%", ring: "30 100% 50%" }
  },
  pink: {
    light: { primary: "330 70% 50%", accent: "330 70% 50%", ring: "330 70% 50%" },
    dark: { primary: "330 70% 55%", accent: "330 70% 55%", ring: "330 70% 55%" }
  }
};

export function useThemeColor() {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    const stored = localStorage.getItem("theme-color");
    return (stored as ThemeColor) || "green";
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const theme = isDark ? colorThemes[themeColor].dark : colorThemes[themeColor].light;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--ring", theme.ring);
    
    // Also update sidebar tokens
    root.style.setProperty("--sidebar-primary", theme.primary);
    root.style.setProperty("--sidebar-ring", theme.ring);
  }, [themeColor]);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem("theme-color", color);
    
    // Trigger color update
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const theme = isDark ? colorThemes[color].dark : colorThemes[color].light;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--ring", theme.ring);
    root.style.setProperty("--sidebar-primary", theme.primary);
    root.style.setProperty("--sidebar-ring", theme.ring);
  };

  return { themeColor, setThemeColor };
}

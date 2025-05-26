import React from "react";
import { useTheme } from "./themeContext";
const themes = ['light', 'dark', 'custom-red'];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
};

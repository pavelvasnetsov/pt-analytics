import { useEffect, useState } from 'react';

const STORAGE_KEY = 'pt-analytics-theme';

function getStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme persistence is optional; the toggle must still work without storage.
  }
}

function applyTheme(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.body?.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = theme;
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = getStoredTheme();
  if (stored) {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      saveTheme(nextTheme);
      return nextTheme;
    });
  }

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme
  };
}

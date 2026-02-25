import { useState, useEffect } from 'react';

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="flex items-center gap-4 cursor-pointer w-full rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-text-muted dark:text-slate-400 transition-all"
        >
            <span className="text-sm font-medium text-text dark:text-gray-200"> Appearance</span>
            {darkMode === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}

export default DarkModeToggle;
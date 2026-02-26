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
            className="flex items-center p-4 gap-4 font-medium text-text cursor-pointer w-full dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5"
        >
            <span>Appearance</span>
            {darkMode === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}

export default DarkModeToggle;
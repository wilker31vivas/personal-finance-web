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
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-200 
                 hover:bg-gray-300 dark:hover:bg-gray-600 
                 transition-colors"
        >
            {darkMode === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}

export default DarkModeToggle;
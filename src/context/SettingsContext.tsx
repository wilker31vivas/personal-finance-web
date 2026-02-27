import { createContext, useState, useEffect, useContext } from "react";
import type { UserSession } from '../types/types'

type SettingsContexType = {
    user: UserSession | null,
    updateUserAvatar: (avatar: string) => void,
    updateUserName: (name: string) => void,
    userName: string,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    userAvatar: string,
    setUserAvatar: React.Dispatch<React.SetStateAction<string>>,
    logout: () => void,
    avatarsURL: string[],
    saveUser: (e: React.FormEvent<HTMLFormElement>) => void,
    setIsDark: React.Dispatch<React.SetStateAction<string>>,
    isDark: string
}

export const SettingsContext = createContext<SettingsContexType | null>(null)

export function SettingsContextProvider({ children }: { children: React.ReactNode }) {
    const [userAvatar, setUserAvatar] = useState("https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450")
    const [userName, setUserName] = useState("")
    const avatarsURL = [
        "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Brooklynn&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Alexander&backgroundColor=619eff&mood=happy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Aidan&backgroundColor=ffa6e6&mood=happy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Chase&backgroundColor=619eff&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Eden&backgroundColor=ffa6e6&mood=superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Eliza&backgroundColor=619eff&mood=hopeful",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Caleb&backgroundColor=ffa6e6&hair=shaggy&mood=hopeful",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Robert&mood=confused,happy,hopeful,neutral,superHappy",
        "https://api.dicebear.com/9.x/dylan/svg?seed=Ryan&mood=confused,happy,hopeful,neutral,superHappy",
    ]
    const [user, setUser] = useState<UserSession | null>(() => {
        try {
            const saved = localStorage.getItem("user-login-finances")
            return saved ? JSON.parse(saved) : null
        } catch {
            return null
        }
    })
    const [isDark, setIsDark] = useState(() => {
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
        if (isDark === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    const saveUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userName.trim() === "") return;

        setUser({
            userName,
            userAvatar
        });
    };

    const updateUserAvatar = (avatar: string) => {
        setUserAvatar(avatar)
        setUser(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                userAvatar: avatar
            };
        });
    }

    const updateUserName = (name: string) => {
        if (name.trim() === "") return;

        setUser(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                userName: name
            };
        });
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('user-login-finances', JSON.stringify(user))
        } else {
            localStorage.removeItem('user-login-finances')
        }
    }, [user])

    const logout = () => setUser(null)

    return (
        <SettingsContext.Provider value={{ user, updateUserAvatar, updateUserName, avatarsURL, saveUser, logout, userName, setUserName, userAvatar, setUserAvatar, isDark, setIsDark }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within AuthContextProvider");
    }
    return context;
}
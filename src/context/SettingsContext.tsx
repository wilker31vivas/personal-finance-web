import { createContext, useContext } from "react";
import type { UserSession } from '../types/types'
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useUserSession from "../hooks/useUserSession";
import useSettingsForm from "../hooks/useSettingsForm";

type SettingsContexType = {
    user: UserSession | null,
    setUser: React.Dispatch<React.SetStateAction<UserSession | null>>,
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
    const navigateTo = useNavigate()
    const { user, setUser, logout } = useUserSession()
    const { isDark, setIsDark } = useTheme()
    const {
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        avatarsURL,
        saveUser,
        updateUserAvatar,
        updateUserName,
    } = useSettingsForm({ setUser, navigateTo })

    return (
        <SettingsContext.Provider
            value={{
                user,
                setUser,
                updateUserAvatar,
                updateUserName,
                avatarsURL,
                saveUser,
                logout,
                userName,
                setUserName,
                userAvatar,
                setUserAvatar,
                isDark,
                setIsDark,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within SettingsContextProvider");
    }
    return context;
}

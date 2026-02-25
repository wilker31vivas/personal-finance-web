import { createContext, useState, useEffect, useContext } from "react";
import type { UserSession } from '../types/types'

type AuthContexType = {
    user: UserSession | null,
    setUser: (user: UserSession | null) => void,
    logout: () => void
}

export const AuthContex = createContext<AuthContexType | null>(null)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserSession | null>(() => {
        try {
            const saved = localStorage.getItem("user-login-finances")
            return saved ? JSON.parse(saved) : null
        } catch {
            return null
        }
    })
    useEffect(() => {
        if (user) {
            localStorage.setItem('user-login-finances', JSON.stringify(user))
        } else {
            localStorage.removeItem('user-login-finances')
        }
    }, [user])

    const logout = () => setUser(null)

    return (
        <AuthContex.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContex.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContex);
    if (!context) {
        throw new Error("useAuth must be used within AuthContextProvider");
    }
    return context;
}
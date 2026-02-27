import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Aside() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 p-2 rounded-lg shadow dark:shadow-slate-900/50 dark:text-gray-200"
            >
                ☰
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={` bg-surface dark:bg-surface-dark
                fixed top-0 left-0 h-screen w-64 border-r border-slate-200 dark:border-slate-700
                flex flex-col z-50 transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:z-auto
            `}
            >
                <div className="p-6 flex justify-between items-center">
                    <span className="text-xl font-bold tracking-tight text-blue-marguerite-600 dark:text-blue-marguerite-400">
                        Personal finances
                    </span>

                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavLink to='/' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300 font-semibold"
                            : "text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark/50"
                        }`
                    }>
                        <span className="font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to='/transactions' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300 font-semibold"
                            : "text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark/50"
                        }`
                    }>
                        <span className="font-medium">Transactions</span>
                    </NavLink>
                    <NavLink to='/categories' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300 font-semibold"
                            : "text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark/50"
                        }`
                    }>
                        <span className="font-medium">Categories</span>
                    </NavLink>
                    <NavLink to='/settings' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300 font-semibold"
                            : "text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark/50"
                        }`
                    }>
                        <span className="font-medium">Settings</span>
                    </NavLink>
                </nav>
            </aside>
        </>
    )
}

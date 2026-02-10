import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export default function Aside() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white border border-slate-200 p-2 rounded-lg shadow"
            >
                ☰
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={` bg-surface
                    fixed top-0 left-0 h-screen w-64 border-r border-slate-200
                    flex flex-col z-50 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:static md:z-auto
                `}
            >
                <div className="p-6 flex justify-between items-cente">
                    <span className="text-xl font-bold tracking-tight text-blue-marguerite-600">
                        Personal finances
                    </span>

                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden text-slate-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavLink to='/dashboard' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 text-blue-marguerite-700 font-semibold"
                            : "text-text-muted hover:bg-slate-100"
                        }`
                    }>
                        <span className="font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to='/transactions' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 text-blue-marguerite-700 font-semibold"
                            : "text-text-muted hover:bg-slate-100"
                        }`
                    }>
                        <span className="font-medium">Transactions</span>
                    </NavLink>
                    <NavLink to='/categories' className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? "bg-blue-marguerite-50 text-blue-marguerite-700 font-semibold"
                            : "text-text-muted hover:bg-slate-100"
                        }`
                    }>
                        <span className="font-medium">Categories</span>
                    </NavLink>
                    <NavLink to={'#'} className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-slate-100 rounded-xl transition-all" >
                        <span className="font-medium">Accounts</span>
                    </NavLink>
                    <NavLink to={"#"} className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-slate-100 rounded-xl transition-all" >
                        <span className="font-medium">Settings</span>
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-slate-100 text-text-muted transition-all">
                        <span className="font-medium">Appearance</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

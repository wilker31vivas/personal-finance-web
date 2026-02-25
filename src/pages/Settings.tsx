import DarkModeToggle from "../components/DarkModeToggle"


export default function Settings() {

    return (
        <div className="p-8 min-h-screen my-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col justify-between items-center gap-4 mb-8 sm:flex-row">
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                            Settings
                        </h1>
                        <p className="text-text-muted dark:text-slate-400 mt-1">Manage your settings</p>
                    </div>
                </div>
            </div>

            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-md p-6 mb-6">
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-medium text-text dark:text-gray-200">PIN</p>
                    <p className="text-sm font-medium text-text dark:text-gray-200">Idioma</p>
                    <DarkModeToggle></DarkModeToggle>
                    <p className="text-sm font-medium text-text dark:text-gray-200">Divisa</p>
                    <p className="text-sm font-medium text-danger">Borrar cuenta</p>

                </div>
            </div>
        </div>
    )
}

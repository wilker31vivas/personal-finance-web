import { useState } from "react";
import { ModalProfile, ModalDelete } from "../components/Modal";
import { useSettings } from "../context/SettingsContext";

function DarkModeToggle() {
    const { isDark, setIsDark } = useSettings()

    const toggleDarkMode = () => {
        setIsDark(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="flex items-center justify-between p-6 dark:hover:bg-white/5 hover:bg-blue-marguerite-50/50 transition-all duration-200 group">
            <div className="flex items-center gap-4">
                <div>
                    <p className="font-semibold text-text dark:text-gray-200 group-hover:text-blue-marguerite-600 transition-colors">Dark Mode</p>
                    <p className="text-sm text-text-muted">Adjust the appearance</p>
                </div>
            </div>
            <button
                onClick={() => toggleDarkMode()}
                className={`cursor-pointer relative w-14 h-7 rounded-full transition-colors duration-300 ${isDark === 'dark' ? 'bg-blue-marguerite-500' : 'bg-gray-300'
                    }`}
            >
                <div
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isDark === 'dark' ? 'translate-x-7' : 'translate-x-0'
                        }`}
                ></div>
            </button>
        </div>
    );
}

export default function Settings() {
    const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false)
    const [isModalNameOpen, setIsModalNameOpen] = useState(false)
    const [isModalNameDelete, setIsModalDelete] = useState(false)


    const settingsOptions = [
        {
            id: 1,
            title: "Change name",
            description: "Update your name profile",
            iconBg: "from-blue-marguerite-100 to-blue-marguerite-200",
            iconColor: "text-blue-marguerite-600",
            onClick: () => setIsModalNameOpen(true)
        },
        {
            id: 2,
            title: "Change photo",
            description: "Update your photo profile",
            iconBg: "from-blue-marguerite-100 to-blue-marguerite-200",
            iconColor: "text-blue-marguerite-600",
            onClick: () => setIsModalPhotoOpen(true)
        },
    ];

    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            console.log("Delete account");
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center sm:text-left mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                        Settings
                    </h1>
                    <p className="text-text-muted dark:text-slate-400 mt-1">Manage your account preferences</p>
                </div>

                {/* Account Settings Section */}
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3 px-2">
                        Account Settings
                    </h2>
                    <div className="flex flex-col bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden shadow-md">
                        {settingsOptions.map((option, index) => (
                            <button
                                key={option.id}
                                onClick={option.onClick}
                                className={`cursor-pointer w-full flex items-center justify-between p-6 transition-all duration-200 group hover:bg-blue-marguerite-50/50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5 ${index !== settingsOptions.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-left">
                                        <p className="font-semibold text-text dark:text-gray-200 group-hover:text-blue-marguerite-600 transition-colors">
                                            {option.title}
                                        </p>
                                        <p className="text-sm text-text-muted">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-xl text-text  dark:text-surface font-medium group-hover:text-blue-marguerite-500 group-hover:translate-x-1 transition-all duration-300">
                                    {">"}
                                </div>
                            </button>
                        ))}

                        {/* Dark Mode Toggle */}
                        <DarkModeToggle />
                    </div>
                </div>

                {/* Danger Zone */}
                <div>
                    <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3 px-2">
                        Danger Zone
                    </h2>
                    <div className="bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg">
                        <button
                            onClick={() => setIsModalDelete(true)}
                            className="cursor-pointer w-full flex items-center justify-between p-6 hover:bg-blue-marguerite-50/50 dark:hover:bg-white/5 transition-colors duration-200 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-left">
                                    <p className="font-semibold text-red-600">
                                        Delete account and data
                                    </p>
                                    <p className="text-sm text-danger">
                                        Permanently remove your account
                                    </p>
                                </div>
                            </div>
                            <div className="text-xl text-danger font-medium  group-hover:translate-x-1 transition-all duration-300">
                                {">"}
                            </div>
                        </button>
                    </div>
                </div>

                <ModalDelete isOpen={isModalNameDelete} onClose={() => setIsModalDelete(false)} typeModal="account"></ModalDelete>
                <ModalProfile isOpen={isModalPhotoOpen} onClose={() => setIsModalPhotoOpen(false)} typeModal="photo"></ModalProfile>
                <ModalProfile isOpen={isModalNameOpen} onClose={() => setIsModalNameOpen(false)} typeModal="name"></ModalProfile>
            </div>
        </div>
    )
}

import { useState } from "react"
import { useSettings } from '../context/SettingsContext'
import { ModalProfile } from '../components/Modal'

export default function Login() {
    const { userAvatar, userName, saveUser, setUserName } = useSettings()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = [
        {
            text: "Easily record and edit your transactions"
        },
        {
            text: "Organize by custom categories"
        },
        {
            text: "View your expenses on an interactive dashboard"
        }
    ];

    return (
        <div className="min-h-screen text-slate-900 grid sm:grid-cols-2 ">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-marguerite-600 to-purple-700 flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-marguerite-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative max-w-xl text-white z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                        Understand where your money goes
                    </h1>

                    <p className="text-xl sm:text-2xl text-blue-marguerite-100 mb-12 leading-relaxed">
                        Record your daily expenses, organize everything into categories, and visualize your money with clear graphs.
                    </p>

                    <ul className="space-y-5">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-4 group"
                            >
                                <span className="text-lg text-blue-marguerite-50 leading-relaxed">
                                    {feature.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
                <div className="flex flex-col gap-3 p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                                Create Account
                            </h2>
                        </div>
                        <p className="text-text-muted text-lg">
                            Join us and start managing your finances
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-marguerite-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

                                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:ring-blue-marguerite-300 transition-all duration-300">
                                    <img
                                        src={userAvatar}
                                        alt="User avatar"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="text-center">
                                                <p className="text-xs text-white font-semibold">Upload</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 rounded-full p-2.5 shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white">
                            </div>
                        </div>
                    </div>

                    <form onSubmit={saveUser} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="text-sm font-semibold text-text dark:text-text-muted mb-2 flex items-center gap-2"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                required
                                placeholder="Choose a username"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-text placeholder:text-gray-400 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all outline-none"
                            />
                        </div>

                        <button
                            className="cursor-pointer group w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-marguerite-500 to-purple-600 hover:from-blue-marguerite-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                        >
                            <span>Create Account</span>
                        </button>
                    </form>

                </div>
            </div>
            <ModalProfile isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} typeModal="photo"></ModalProfile>
        </div>
    );
}
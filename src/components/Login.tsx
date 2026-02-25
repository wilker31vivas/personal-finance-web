import { useState } from "react"
import {useAuth} from '../context/AuthContext'

export default function Login() {
    const { setUser } = useAuth()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userAvatar, setUserAvatar] = useState("https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450")
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

    const saveUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userName.trim() === "") return
        setUser({
            userName,
            password
        })
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 33, label: "Weak", color: "bg-red-500" };
        if (password.length < 10) return { strength: 66, label: "Medium", color: "bg-orange-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength();
    const passwordsMatch = password && confirmPassword && password === confirmPassword;


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-marguerite-50 via-purple-50 to-blue-marguerite-100 flex items-center justify-center p-4">
            <div className="">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600"></div>

                    <div className="flex flex-col gap-3 p-6 sm:p-8">
                        <div className="flex flex-col text-center gap-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                                Create Account
                            </h1>
                            <p className="text-text-muted">
                                Join us and start managing your finances
                            </p>
                        </div>

                        <div className="flex justify-center ">
                            <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                                {/* Avatar container */}
                                <div className="relative">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-marguerite-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

                                    {/* Avatar image */}
                                    <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:ring-blue-marguerite-300 transition-all duration-300">
                                        <img
                                            src={userAvatar}
                                            alt="User avatar"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="text-center">
                                                    <p className="text-xs text-white font-semibold">Upload</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit badge */}
                                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 rounded-full p-2.5 shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white">
                                </div>
                            </div>
                        </div>

                        <form onSubmit={saveUser} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-semibold text-text mb-2 flex items-center gap-2"
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

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-text mb-2 flex items-center gap-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholder="Create a strong password"
                                        className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 rounded-xl font-medium text-text placeholder:text-gray-400 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-marguerite-500 transition-colors"
                                    >
                                        {showPassword ? '🔓' : '🔒'}
                                    </button>
                                </div>

                                {password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-text-muted">Password strength</span>
                                            <span className={`text-xs font-semibold ${passwordStrength.strength === 100 ? 'text-green-600' :
                                                passwordStrength.strength === 66 ? 'text-orange-600' :
                                                    'text-red-600'
                                                }`}>
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                style={{ width: `${passwordStrength.strength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-text mb-2 flex items-center gap-2"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm your password"
                                        className={`w-full px-4 py-3 pr-12 bg-white border-2 ${confirmPassword && (passwordsMatch ? 'border-green-500' : 'border-red-500')
                                            } ${!confirmPassword && 'border-gray-200'} rounded-xl font-medium text-text placeholder:text-gray-400 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-marguerite-500 transition-colors"
                                    >
                                        {showConfirmPassword ? '🔓' : '🔒'}

                                    </button>
                                </div>

                                {confirmPassword && (
                                    <div className="mt-2 flex items-center gap-2">
                                        {passwordsMatch ? (
                                            <>
                                                <span className="text-xs text-green-600 font-medium">Passwords match</span>
                                            </>
                                        ) : (
                                            <span className="text-xs text-red-600 font-medium">Passwords don't match</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                disabled={!passwordsMatch || password.length < 6}
                                className="group w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-marguerite-500 to-purple-600 hover:from-blue-marguerite-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                            >
                                <span>Create Account</span>
                            </button>
                        </form>

                    </div>
                </div>

            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-text mb-4">Choose Your Avatar</h3>
                        <p className="text-text-muted mb-6">Upload a profile picture or select from our collection</p>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {avatarsURL.map((avatar, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setUserAvatar(avatar);
                                        setIsModalOpen(false);
                                    }}
                                    className="cursor-pointer rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-marguerite-500 transition-all hover:scale-110"
                                >
                                    <img src={avatar} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full px-6 py-3 bg-blue-marguerite-500 hover:bg-blue-marguerite-600 text-white font-semibold rounded-xl transition-colors"

                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
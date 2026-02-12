
export default function NotFound() {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="max-w-2xl w-full px-4">
                <div className="relative overflow-hidden bg-white dark:bg-surface-dark rounded-3xl shadow-2xl dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-700">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-marguerite-300 dark:bg-blue-marguerite-600 rounded-full opacity-10 dark:opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full opacity-10 dark:opacity-5 blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                        <div className="mb-6">
                            <div className="relative">
                                <h1 className="text-9xl font-bold text-slate-300 dark:text-slate-600 select-none">
                                    404
                                </h1>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl">🔍</span>
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-text dark:text-gray-100 mb-4">
                                Page Not Found
                            </h2>
                            <p className="text-lg text-text-muted dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                            <button
                                onClick={handleGoHome}
                                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 dark:from-blue-marguerite-600 dark:to-blue-marguerite-700 dark:hover:from-blue-marguerite-700 dark:hover:to-blue-marguerite-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl dark:shadow-blue-marguerite-900/50 transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center"
                            >
                                <span>Go to Home</span>
                            </button>

                            <button
                                onClick={handleGoBack}
                                className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-marguerite-300 dark:hover:border-blue-marguerite-600 text-text dark:text-gray-200 font-bold rounded-xl shadow-md hover:shadow-lg dark:shadow-slate-900/50 transition-all duration-300 w-full sm:w-auto justify-center"
                            >
                                <span>Go Back</span>
                            </button>
                        </div>
                    </div>

                    <div className="h-2 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600 dark:from-blue-marguerite-600 dark:via-purple-700 dark:to-blue-marguerite-700"></div>
                </div>
            </div>
        </div>
    );
}
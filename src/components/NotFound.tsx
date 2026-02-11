
export default function NotFound() {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl border border-gray-200">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-marguerite-300 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                        {/* 404 Text */}
                        <div className="mb-6">
                            <div className="relative">
                                <h1 className="text-9xl font-bold text-slate-200 select-none">
                                    404
                                </h1>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl">🔍</span>
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                                Page Not Found
                            </h2>
                            <p className="text-lg text-text-muted max-w-md mx-auto leading-relaxed">
                                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                            <button
                                onClick={handleGoHome}
                                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center"
                            >
                                <span>Go to Home</span>
                            </button>

                            <button
                                onClick={handleGoBack}
                                className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-marguerite-300 text-text font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto justify-center"
                            >
                                <span>Go Back</span>
                            </button>
                        </div>


                    </div>

                    {/* Bottom accent line */}
                    <div className="h-2 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600"></div>
                </div>
            </div>
        </div>
    );
}
export function LoadingFallback() {
   return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-text dark:text-white mb-2">
                    Loading...
                </h2>
                <p className="text-text-muted">
                    Please wait while we prepare everything
                </p>

                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-blue-marguerite-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-marguerite-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-marguerite-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
}
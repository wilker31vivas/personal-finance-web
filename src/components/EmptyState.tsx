type EmptyStateProps = {
    onReset?: () => void;
    title: string
    description: string
    titleOnReset?: string
    children?: React.ReactNode
};

export default function EmptyState({ onReset, title, description, titleOnReset, children }: EmptyStateProps) {
    return (
        <div className="max-w-2xl mx-auto relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-white to-blue-marguerite-50 dark:from-surface-dark dark:to-blue-marguerite-950/30 border-2 border-dashed border-blue-marguerite-200 dark:border-blue-marguerite-800 rounded-3xl shadow-lg dark:shadow-slate-900/50">
            <div className="relative px-8 py-12 text-center">
                {children}
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 mb-3">
                    {title}
                </h2>
                <p className="text-base text-text-muted dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
                    {description}
                </p>

                {onReset && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            onClick={onReset}
                            className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 dark:from-blue-marguerite-600 dark:to-blue-marguerite-700 dark:hover:from-blue-marguerite-700 dark:hover:to-blue-marguerite-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl dark:shadow-blue-marguerite-900/50 transition-all duration-300 active:scale-95"
                        >
                            <span>{titleOnReset}</span>
                        </button>
                    </div>
                )}
            </div>
            <div className="h-1.5 bg-gradient-to-r from-blue-marguerite-400 via-purple-500 to-blue-marguerite-600 dark:from-blue-marguerite-600 dark:via-purple-700 dark:to-blue-marguerite-700"></div>
        </div>
    );
}
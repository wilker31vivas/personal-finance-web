import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header'
import ChartsCards from '../components/ChartsCards'
import { FilterByYear, FilterByMonth, FilterButton } from '../components/Filters'
import { useDashboard, } from '../context/DashboardContext';
import { ErrorState } from '../components/Message'
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

function FilterSection() {
    const { filters, updateFilter, resetFilters } = useDashboard()

    return (
        <div className="flex flex-col text-center gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div className='text-center sm:text-left'>
                <h1 className="text-3xl sm:text-4xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-text-muted dark:text-slate-400 mt-1">
                    Overview of your financial data
                </p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 text-center sm:text-left text-text-muted">
                <FilterByMonth
                    filters={filters}
                    updateFilter={updateFilter}
                />
                <FilterByYear
                    filters={filters}
                    updateFilter={updateFilter}
                />
                <FilterButton resetFilters={resetFilters} />
            </div>
        </div>
    )
}

export default function Dashboard() {
    const { resetFilters, error, loading, fetchDashboardData, balanceData } = useDashboard()

    const totalIncome = balanceData?.transactionsAmount?.current?.income ?? 0
    const totalExpenses = balanceData?.transactionsAmount?.current?.expense ?? 0
    const noMovements = totalIncome === 0 && totalExpenses === 0;

    return (
        <main className="min-h-screen" role="main">
            <Header />
            <div className="mx-auto flex flex-col max-w-7xl p-8 gap-6  " aria-label="Dashboard content">

                <FilterSection />

                {error ? (
                    <ErrorState title={error} onRetry={fetchDashboardData} />
                ) : loading ? (
                    <Loader description="Loading dashboard..." />
                ) : (
                    <>
                        <BalanceCard />
                        {noMovements ? (
                            <EmptyState titleOnReset='Clear Filters' onReset={resetFilters} title='No Data Available' description='There are no recorded movements during this period. Try selecting a different month or year to view your financial data.' />
                        ) : <ChartsCards />}
                    </>
                )}
            </div>
        </main>
    )
}



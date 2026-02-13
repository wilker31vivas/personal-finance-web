import { formatCurrency } from '../utils/formatCurrency'
import { useDashboard } from '../context/DashboardContext';

export default function BalanceCard() {
    const { balanceData } = useDashboard()

    const { current } = balanceData.transactionsAmount
    const { income, expense, balance } = current

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard title="Total incomes" amount={income} change={balanceData.change.income} bgColor="bg-success" titleColor="text-surface"></StatCard>
            <StatCard title="Total expenses" amount={expense} change={balanceData.change.expense} bgColor="bg-danger" titleColor="text-surface"></StatCard>
            <StatCard title="Balance" amount={balance} change={balanceData.change.balance} titleColor='text-slate-500 dark:text-slate-400' bgColor="bg-surface dark:bg-surface-dark" textColor={balance !== null && balance >= 0 ? 'text-success' : 'text-danger'}></StatCard>
        </div>
    )
}

interface BalanceCardItemProps {
    title: string;
    amount: number | null;
    bgColor: string;
    change: number | null;
    textColor?: string;
    titleColor?: string
}

function StatCard({ title, amount, change, bgColor, textColor, titleColor }: BalanceCardItemProps) {
    return (
        <div className={`${bgColor} ${titleColor} flex flex-col gap-2 p-6 w-full rounded-2xl shadow-sm border-slate-200`}>
            <h2 className="text-sm font-medium">{title}</h2>
            <p className={`text-2xl sm:text-3xl font-bold ${textColor}`}>
                {formatCurrency(amount)}
            </p>
            {change !== null && change !== 0 && (
                <p className={`text-sm font-medium `}>
                    {change > 0 ? '▲' : '▼'} {Math.abs(change)}% compared to previous month
                </p>
            )}
        </div>
    )
}
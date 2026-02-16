import { getOptionCategories, getOptionExpensesAndIncome, getOptionTopFiveCategories } from '../utils/optionsCharts'
import { useDashboard } from '../context/DashboardContext'
import ReactECharts from 'echarts-for-react'
import EmptyState from './EmptyState'
import { useEffect, useState } from 'react'


export default function ChartsCards() {
    const { balanceData, topCategories, isMobile, isTablet, allCategories, chartHeight, transactions } = useDashboard()
    const [isDark, setIsDark] = useState(false)

    const totalIncome = balanceData?.transactionsAmount?.current?.income ?? 0
    const totalExpenses = balanceData?.transactionsAmount?.current?.expense ?? 0

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'))
        }

        checkDarkMode()

        const observer = new MutationObserver(checkDarkMode)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="space-y-6">
            <ChartCard getOption={getOptionExpensesAndIncome(transactions, isDark)} chartHeight={chartHeight} />

            {totalExpenses === 0 && totalIncome > 0 ? (
                <EmptyState title='No expenses recorded' description='Your transactions this period were all income. When you record an expense, you will see here which categories you are spending the most in.' />
            ) :
                <div className='grid lg:grid-cols-2 gap-6'>
                    <ChartCard getOption={getOptionTopFiveCategories(topCategories, isMobile, isTablet, isDark)} chartHeight={chartHeight} />
                    <ChartCard getOption={getOptionCategories(allCategories, isDark)} chartHeight={chartHeight} />
                </div>
            }
        </div>
    )
}

export function ChartCard({ getOption, chartHeight }: {
    getOption: any;
    chartHeight: any;
}) {
    return (
        <div
            className={`
                group relative rounded-3xl transition-all duration-300
                hover:shadow-2xl hover:-translate-y-1 
                dark:hover:shadow-2xl dark:hover:shadow-blue-500/10
            `}
        >

            <div className="rounded-2xl bg-surface dark:bg-surface-dark backdrop-blur-sm p-3 border-2 border-dashed border-blue-marguerite-200 dark:border-blue-marguerite-700/50">
                <ReactECharts
                    option={getOption}
                    style={{
                        height: chartHeight,
                        width: '100%',
                        minHeight: '280px'
                    }}
                    autoResize
                    notMerge
                    lazyUpdate
                />
            </div>
        </div>
    )
}
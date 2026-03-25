import type { Transaction } from "../types/types"
import { formatCurrency } from '../utils/formatCurrency'
import { useTransactions } from '../context/TransactionsContext';


type TransactionCardProps = {
    transaction: Transaction,
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const { setFormData, setIsModalDeleteOpen, setIsModalEditOpen } = useTransactions()
    
    return (
        <tr className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-marguerite-600 dark:text-blue-marguerite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-text dark:text-gray-200">
                        {new Date(transaction.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6">
                <p className="text-sm font-medium text-text dark:text-gray-200">{transaction.description}</p>
            </td>
            <td className="py-4 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300">
                    {transaction.category}
                </span>
            </td>
            <td className="py-4 px-6">
                <p className={`text-base font-bold ${transaction.type === 'income' ? 'text-success dark:text-green-400' : 'text-danger dark:text-red-400'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
            </td>
            <td className="py-4 px-6">
                <div className='flex gap-2 justify-start items-center'>
                    <button
                        onClick={() => {
                            setIsModalEditOpen(true);
                            setFormData(transaction)
                        }}
                        className="cursor-pointer group/btn flex items-center gap-2 px-4 py-2.5 bg-blue-marguerite-50 dark:bg-blue-marguerite-950/30 hover:bg-blue-marguerite-500 dark:hover:bg-blue-marguerite-600 text-blue-marguerite-700 dark:text-blue-marguerite-300 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-blue-marguerite-200 dark:border-blue-marguerite-800 hover:border-blue-marguerite-500 dark:hover:border-blue-marguerite-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            setIsModalDeleteOpen(true);
                            setFormData(transaction)

                        }}
                        className="cursor-pointer group/btn flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-500 dark:hover:bg-red-600 text-red-700 dark:text-red-400 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-red-200 dark:border-red-900 hover:border-red-500 dark:hover:border-red-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}
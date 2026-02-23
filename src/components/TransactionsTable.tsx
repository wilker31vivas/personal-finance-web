import Loader from './Loader'
import { formatCurrency } from '../utils/formatCurrency'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';
import EmptyState from './EmptyState'
import { useMemo, useCallback, useState } from 'react';
import getPagination from '../utils/getPagination'
import type { Transaction } from '../types/types'
import { ModalEdit, ModalDelete } from './Modal'

const INITIAL_VALUE: Transaction = {
    id: undefined,
    description: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: ''
}

export default function TransactionsTable() {
    const { loading, transactionPages, setFilters, pageCurrent, setPageCurrent } = useTransactions()
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [formData, setFormData] = useState<Transaction>(INITIAL_VALUE);

    const totalPages = transactionPages.length
    const pagesToShow = useMemo(() => {
        return getPagination(pageCurrent + 1, totalPages)
    }, [pageCurrent, totalPages])

    const showingTransactions = useMemo(() => {
        if (!transactionPages[pageCurrent]) return { start: 0, end: 0 }

        const previousTotal = transactionPages
            .slice(0, pageCurrent)
            .reduce((total, page) => total + page.length, 0)

        return {
            start: previousTotal + 1,
            end: previousTotal + transactionPages[pageCurrent].length
        }
    }, [transactionPages, pageCurrent])

    const canGoPrev = pageCurrent > 0
    const canGoNext = pageCurrent < transactionPages.length - 1 && transactionPages[pageCurrent + 1]?.length > 0


    const handlePage = useCallback((index: number) => {
        setPageCurrent(index)
    }, [setPageCurrent])

    const totalTransactions = useMemo(() => {
        return transactionPages.reduce((total, page) => total + page.length, 0)
    }, [transactionPages])


    return (
        <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm dark:shadow-slate-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Transactions table">
                    <thead className="border-b border-blue-marguerite-200 dark:border-blue-marguerite-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-20">
                                    <Loader description="Loading transactions..."></Loader>
                                </td>
                            </tr>
                        ) : transactionPages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-10">
                                    <EmptyState title="No transactions found" description="We couldn't find any transactions with the applied filters" onReset={() => setFilters(INITIAL_FILTERS)} titleOnReset='Clear Filters'>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-blue-marguerite-400 dark:text-blue-marguerite-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </EmptyState>
                                </td>
                            </tr>
                        ) : (
                            transactionPages[pageCurrent]?.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-marguerite-600 dark:text-blue-marguerite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text dark:text-gray-200">
                                                {new Date(item.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-medium text-text dark:text-gray-200">{item.description}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 text-blue-marguerite-700 dark:text-blue-marguerite-300">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className={`text-base font-bold ${item.type === 'income' ? 'text-success dark:text-green-400' : 'text-danger dark:text-red-400'}`}>
                                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                        </p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className='flex gap-2 justify-start items-center'>
                                            <button
                                                onClick={() => {
                                                    setIsModalEditOpen(true);
                                                    setFormData({
                                                        id: item.id,
                                                        description: item.description,
                                                        amount: item.amount,
                                                        type: item.type,
                                                        category: item.category,
                                                        date: item.date
                                                    })
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
                                                    setFormData({
                                                        id: item.id,
                                                        description: item.description,
                                                        amount: item.amount,
                                                        type: item.type,
                                                        category: item.category,
                                                        date: item.date
                                                    })
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
                            ))
                        )}
                    </tbody>
                </table>

                {totalPages > 0 && (
                    <div className='px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between'>
                        <span className='text-sm text-slate-500 dark:text-slate-400'>
                            Showing {showingTransactions.start} to {showingTransactions.end} of {totalTransactions} transactions
                        </span>
                        <div className='flex gap-2'>
                            <button
                                aria-label="Previous page"
                                onClick={() => handlePage(pageCurrent - 1)}
                                disabled={!canGoPrev}
                                className="cursor-pointer p-3 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                ←
                            </button>
                            {pagesToShow.map((page, index) => {
                                if (page === "...") {
                                    return (
                                        <span key={`dots-${index}`} className="px-2 text-slate-400 dark:text-slate-500 flex items-center">
                                            ...
                                        </span>
                                    )
                                }
                                const pageIndex = Number(page) - 1
                                const isActive = pageIndex === pageCurrent

                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePage(pageIndex)}
                                        className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-lg transition-colors
                                        ${isActive
                                                ? 'bg-blue-marguerite-600 dark:bg-blue-marguerite-700 text-white'
                                                : 'hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            })}
                            <button
                                aria-label="Next page"
                                onClick={() => handlePage(pageCurrent + 1)}
                                disabled={!canGoNext}
                                className="cursor-pointer p-3 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}

                <ModalEdit
                    isOpen={isModalEditOpen}
                    onClose={() => setIsModalEditOpen(false)}
                    formData={formData}
                    setFormData={setFormData}
                />
                <ModalDelete
                    isOpen={isModalDeleteOpen}
                    onClose={() => setIsModalDeleteOpen(false)}
                    transaction={formData}
                />
            </div>
        </div>
    )
}
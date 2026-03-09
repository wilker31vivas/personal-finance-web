import { useTransactions } from '../context/TransactionsContext';
import { RESULT_PER_PAGE } from '../hooks/usePagination'
import { useMemo } from 'react';
import getPagination from '../utils/getPagination'
import { Link, useSearchParams } from 'react-router-dom';

export default function Pagination() {
    const { transactions, currentPage, onPageChange, totalPages } = useTransactions()
    const pageIndex = currentPage - 1
    const [searchParams] = useSearchParams();

    const totalTransactions = transactions.length

    const showingTransactions = useMemo(() => {
        if (!transactions[pageIndex]) return { start: 0, end: 0 }


        const start = pageIndex * RESULT_PER_PAGE + 1
        const end = Math.min(start + RESULT_PER_PAGE - 1, totalTransactions)

        return { start, end }
    }, [transactions, currentPage])

    const pagesToShow = useMemo(() => {
        return getPagination(currentPage, totalPages)
    }, [currentPage, totalPages])

    const handlePrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage !== 1) {
            onPageChange(String(currentPage - 1))
        }
    }

    const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage !== totalPages) {
            onPageChange(String(currentPage + 1))
        }
    }

    const handleChangePage = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault()

        if (page !== currentPage) {
            onPageChange(String(page))
        }
    }

    const buildPageUrl = (page: string): string => {
        const params  = new URLSearchParams(searchParams)
        params.set('page', page)
        return `${params.toString()}`
    }

    return (
        <nav className='px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between'>
            <span className='text-sm text-slate-500 dark:text-slate-400'>
                Showing {showingTransactions.start} to {showingTransactions.end} of {totalTransactions} transactions
            </span>
            <div className='flex gap-2'>
                <Link
                    onClick={handlePrevClick}
                    to={buildPageUrl(String(currentPage - 1))}
                    aria-label="Previous page"
                    className={`cursor-pointer p-3 text-sm font-medium rounded-lg transition-colors dark:text-gray-200
                                              `}
                >
                    ←
                </Link>
                {pagesToShow.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={`dots-${index}`} className="px-2 text-slate-400 dark:text-slate-500 flex items-center">
                                ...
                            </span>
                        )
                    }
                    const pageNumber = Number(item)
                    const isActive = pageNumber === currentPage

                    return (
                        <Link
                            onClick={(e) => handleChangePage(e, Number(item))}
                            to={buildPageUrl(String(item))}
                            key={item}
                            className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-lg transition-colors
                                                    ${isActive
                                    ? 'bg-blue-marguerite-600 dark:bg-blue-marguerite-700 text-white'
                                    : 'hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-gray-200'
                                }`}
                        >
                            {item}
                        </Link>
                    )
                })}
                <Link
                    onClick={handleNextClick}
                    to={buildPageUrl(String(currentPage + 1))}
                    aria-label="Next page"
                    className={`cursor-pointer p-3 text-sm font-medium rounded-lg transition-colors dark:text-gray-200`}
                >
                    →
                </Link>
            </div>
        </nav>
    )
}
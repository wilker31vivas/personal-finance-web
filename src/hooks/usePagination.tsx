import { useState, useMemo, useCallback } from "react";
import type { Transaction } from "../types/types"

export const RESULT_PER_PAGE = 5

export default function usePagination(transactions: Transaction[]) {

    const [currentPage, setCurrentPage] = useState(()=>{
        const params = new URLSearchParams(window.location.search)
        const page = params.get("page")
        return page ? Number(page) : 1 
    })
    const totalPages = useMemo(
        () => Math.ceil(transactions.length / RESULT_PER_PAGE),
        [transactions]
    )
    const pagedResults = useMemo(
        () => transactions.slice(
            (currentPage - 1) * RESULT_PER_PAGE,
            currentPage * RESULT_PER_PAGE
        ),
        [transactions, currentPage]
    )

    const onPageChange = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    return {
        totalPages, pagedResults, onPageChange, currentPage
    }
}
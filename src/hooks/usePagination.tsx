import { useState, useMemo, useCallback } from "react";
import type { Transaction } from "../types/types"
import { useSearchParams } from 'react-router-dom';

export const RESULT_PER_PAGE = 5

export default function usePagination(transactions: Transaction[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page') ?? '1')

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

    const onPageChange = (page: string) => {
        const params = new URLSearchParams(searchParams);

        if(page !== "1") {
            params.set("page", page);
            setSearchParams(params);
        }
    }

    return {
        totalPages, pagedResults, onPageChange, currentPage
    }
}
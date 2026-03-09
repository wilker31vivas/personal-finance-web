import { useState, useEffect, useCallback, useMemo } from "react";
import { getTransactions, getCategories } from '../api/transactions'
import type { Transaction, Filters, Category } from "../types/types"
import { useSearchParams } from 'react-router-dom';

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }
//✅
export default function useTransactionsFetch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [categories, setCategories] = useState<Category[] | null>(null)
    const filters = useMemo(() => ({
        type: searchParams.get('type') || '',
        category: searchParams.get('category') || '',
        year: searchParams.get('year') || '',
        month: searchParams.get('month') || '',
    }), [searchParams])

    const loadData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const t = await getTransactions(filters)
            setTransactions(t);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading transactions')
        }
        finally {
            setLoading(false)
        }
    }, [filters])

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams)

        params.delete('category')
        params.delete('month')
        params.delete('type')
        params.delete('year')

        setSearchParams(params)
    }

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    }

    useEffect(() => {
        loadData()
    }, [filters])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories()
                setCategories(res)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error loading categories')
            }
        }

        fetchCategories()
    }, [])

    return {
        loading, error, transactions, loadData, resetFilters, updateFilter, categories, filters
    }
}
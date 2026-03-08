import { useState, useEffect, useCallback } from "react";
import { getTransactions, getCategories } from '../api/transactions'
import type { Transaction, Filters, Category } from "../types/types"

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

export default function useTransactions() {
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        return {
            type: params.get('type') || '',
            category: params.get('category') || '',
            year: params.get('year') || '',
            month: params.get('month') || '',
        }
    })
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [categories, setCategories] = useState<Category[] | null>(null)

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

    const resetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS)
    }, [])

    const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
    }, [])

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

    useEffect(() => {
        loadData()
    }, [filters])

    return {
        loading, error, transactions, loadData, resetFilters, updateFilter, categories, filters
    }
}
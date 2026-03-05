import { createContext, useState, useEffect, useContext } from "react";
import { getTransactions, getCategories } from '../api/transactions'
import type { Transaction, Filters, UpdateFilterType, Category } from "../types/types"

type TransactionsContextType = {
    transactionsByPage: Transaction[][]
    error: string | null
    loading: boolean
    filters: Filters
    updateFilter: UpdateFilterType
    resetFilters: () => void
    setFilters: (value: React.SetStateAction<Filters>) => void
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    categories: Category[] | null
    loadData(): Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const [transactionsByPage, setTransactionsByPage] = useState<Transaction[][]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
    const [currentPage, setCurrentPage] = useState(0)
    const [categories, setCategories] = useState<Category[] | null>(null)

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
        setCurrentPage(0)
    }

    // divide o array em array de 5 items cada
    function chunkArray(array: Transaction[], size: number) {
        const result = [];

        for (let i = 0; i < array.length; i += size) {
            const chunk = array.slice(i, i + size);
            result.push(chunk);
        }

        return result;
    }

    async function loadData() {
        setLoading(true)
        setError(null)
        try {
            const t = await getTransactions(filters)
            const tPages = chunkArray(t, 5)
            setTransactionsByPage(tPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading transactions')
        }
        finally {
            setLoading(false)
        }
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
                setError(`Error loading categories: ${err}`)
            }
        }

        fetchCategories()
    }, [])


    return (
        <TransactionsContext.Provider value={{
            transactionsByPage, error, loading, filters, updateFilter, resetFilters, setFilters, currentPage, setCurrentPage, categories, loadData
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    if (!context) {
        throw new Error("useTransactions must be used within TransactionsContextProvider");
    }
    return context;
}
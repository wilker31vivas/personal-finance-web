import { createContext, useState, useEffect, useContext } from "react";
import { getTransactions, getCategories } from '../api/transactions'
import type { Transaction, Filters, UpdateFilterType, Category } from "../types/types"

type TransactionsContextType = {
    transactions: Transaction[]
    error: string | null
    loading: boolean
    filters: Filters
    updateFilter: UpdateFilterType
    resetFilters: () => void
    currentPage: number
    onPageChange: (page: number) => void
    categories: Category[] | null
    loadData(): Promise<void>
    totalPages: number
    pagedResults: Transaction[]
    formData: Transaction
    setFormData: React.Dispatch<React.SetStateAction<Transaction>>
    isModalEditOpen: boolean
    isModalDeleteOpen: boolean
    setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const INITIAL_FILTERS: Filters = { month: "", year: "", type: "", category: "" }

const INITIAL_TRANSACTION: Transaction = {
    id: "",
    description: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: ''
}

export const RESULT_PER_PAGE = 5

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(transactions.length / RESULT_PER_PAGE)
    const pagedResults = transactions.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
    )

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [formData, setFormData] = useState<Transaction>(INITIAL_TRANSACTION);

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS)
    }

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value || "" }))
        setCurrentPage(1)
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    async function loadData() {
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
            transactions, error, loading,
            filters, updateFilter, resetFilters,
            currentPage, onPageChange,
            categories, loadData, totalPages,
            pagedResults, formData, setFormData,
            isModalDeleteOpen, setIsModalDeleteOpen,
            isModalEditOpen, setIsModalEditOpen
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
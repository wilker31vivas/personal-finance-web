import { createContext, useContext, useEffect } from "react";
import type { Transaction, Filters, UpdateFilterType, Category } from "../types/types"
import useTransactionsFetch from "../hooks/useTransactionsFetch";
import usePagination from "../hooks/usePagination";
import useTransactionForm from "../hooks/useTransactionsForm";
import useRouter from '../hooks/useRouter'

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
    loadData: () => Promise<void>
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

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const { transactions, loading, error, filters, updateFilter, resetFilters, categories, loadData } = useTransactionsFetch()
    const { pagedResults, totalPages, currentPage, onPageChange } = usePagination(transactions)
    const { isModalEditOpen, setIsModalEditOpen, isModalDeleteOpen, setIsModalDeleteOpen, formData, setFormData } = useTransactionForm()
    const {navigateTo} = useRouter()

    useEffect(() => {
        const params = new URLSearchParams()
        if (filters.category) params.append('category', filters.category)
        if (filters.month) params.append('month', filters.month)
        if (filters.type) params.append('type', filters.type)
        if (filters.year) params.append('year', filters.year)

        if (currentPage > 1) params.append("page", String(currentPage))

        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname

        navigateTo(newUrl)
    }, [filters, currentPage])

    return (
        <TransactionsContext.Provider value={{
            transactions, error, loading,
            filters, updateFilter, resetFilters,
            loadData, categories, currentPage,
            onPageChange, totalPages,
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
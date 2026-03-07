import { createContext, useContext } from "react";
import type { Transaction, Filters, UpdateFilterType, Category } from "../types/types"
import useTransactionsFetch from "../hooks/useTransactionsFetch";

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

// useTransactions()     fetch + filters
// usePagination()       currentPage, totalPages
// useTransactionForm()  formData, modales

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
    const { transactions, loading, error, filters, updateFilter, resetFilters, categories, loadData } = useTransactionsFetch()

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
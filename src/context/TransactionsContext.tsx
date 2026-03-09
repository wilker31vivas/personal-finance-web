import { createContext, useContext } from "react";
import type { Transaction, Filters, Category, FilterKey } from "../types/types"
import useTransactionsFetch from "../hooks/useTransactionsFetch";
import usePagination from "../hooks/usePagination";
import useTransactionForm from "../hooks/useTransactionsForm";

type TransactionsContextType = {
    transactions: Transaction[]
    error: string | null
    loading: boolean
    filters: Filters
    updateFilter: (key: FilterKey, value: string) => void
    resetFilters: () => void
    currentPage: number
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
    const { pagedResults, totalPages, currentPage } = usePagination(transactions)
    const { isModalEditOpen, setIsModalEditOpen, isModalDeleteOpen, setIsModalDeleteOpen, formData, setFormData } = useTransactionForm()

    return (
        <TransactionsContext.Provider value={{
            transactions, error, loading,
            filters, updateFilter, resetFilters,
            loadData, categories, currentPage,
            totalPages, pagedResults, formData, 
            setFormData,
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
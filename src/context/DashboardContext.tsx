import { createContext, useContext } from "react";
import type { DataOptions, Filters, Balance } from '../types/types';
import useResponsive from "../hooks/useResponsive";
import useFilters from "../hooks/useFilters";
import useDashboardData from "../hooks/useDashboardData";

type DashboardContextType = {
    filters: Filters
    updateFilter: (key: string, value: string) => void
    resetFilters: () => void
    balanceData: Balance
    topCategories: DataOptions[]
    allCategories: DataOptions[]
    isMobile: boolean
    isTablet: boolean
    chartHeight: number
    loading: boolean
    error: string | null
    fetchDashboardData(): Promise<void>
    transactions: DataOptions[]
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardContextProvider({ children }: { children: React.ReactNode }) {
    const { filters, resetFilters, updateFilter } = useFilters();
    const { isMobile, isTablet, chartHeight } = useResponsive();
    const {
        topCategories,
        allCategories,
        balanceData,
        transactions,
        loading,
        error,
        fetchDashboardData
    } = useDashboardData({ filters });

    return (
        <DashboardContext.Provider value={{
            filters, updateFilter, resetFilters,
            balanceData, topCategories, isMobile,
            isTablet, allCategories, chartHeight,
            error, loading, fetchDashboardData,
            transactions
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardContextProvider");
    }
    return context;
}
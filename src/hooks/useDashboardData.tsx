import { useState, useEffect } from "react";
import type { DataOptions, Filters, Balance, Transaction } from '../types/types';
import { getTopCategories, getAllCategories, getBalance, getTransactions } from '../api/transactions';

const INITIAL_CATEGORIES: DataOptions[] = [{ name: "", value: 0 }];

const INITIAL_BALANCE: Balance = {
    transactionsAmount: {
        current: { income: null, expense: null, balance: null },
        previous: { income: null, expense: null, balance: null }
    },
    change: { income: null, expense: null, balance: null }
};

type UseDashboardDataOptions = {
    filters: Filters;
};

export default function useDashboardData({ filters }: UseDashboardDataOptions) {
    const [topCategories, setTopCategories] = useState<DataOptions[]>(INITIAL_CATEGORIES);
    const [allCategories, setAllCategories] = useState<DataOptions[]>(INITIAL_CATEGORIES);
    const [balanceData, setBalanceData] = useState<Balance>(INITIAL_BALANCE);
    const [transactions, setTransactions] = useState<DataOptions[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false);

    function incomeAndExpenses(arr: Transaction[]) {
        const grouped: Record<string, number> = {};

        arr.forEach(item => {
            const date = new Date(item.date);

            const key = filters.month === ''
                ? `${date.getMonth() + 1}`
                : `${date.getDate()}`;

            const value = item.type === "expense"
                ? -item.amount
                : item.amount;

            grouped[key] = (grouped[key] || 0) + value;
        });

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value
        }));
    }

    async function fetchDashboardData() {
        setLoading(true);
        setError(null);

        try {
            const [top, all, balance, transactions] = await Promise.all([
                getTopCategories(filters),
                getAllCategories(filters),
                getBalance(filters),
                getTransactions(filters)
            ]);

            if (!cancelled) {
                setTopCategories(top);
                setAllCategories(all);
                setBalanceData(balance);
                setTransactions(incomeAndExpenses(transactions));
            }
        } catch (err) {
            if (!cancelled) {
                setError(err instanceof Error ? err.message : "Error loading dashboard data");
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        setCancelled(false);
        fetchDashboardData();

        return () => {
            setCancelled(true);
        };
    }, [filters]);

    return {
        topCategories,
        allCategories,
        balanceData,
        transactions,
        loading,
        error,
        fetchDashboardData
    };
}
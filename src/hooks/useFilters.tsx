import { useMemo } from "react";
import type { Filters } from "../types/types";
import { useSearchParams } from 'react-router-dom';

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();

export const INITIAL_FILTERS: Filters = { month: currentMonth.toString(), year: currentYear.toString() };

export default function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filters = useMemo<Filters>(() => ({
        year: searchParams.get('year') || '',
        month: searchParams.get('month') || '',
    }), [searchParams])


    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    };

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams)

        params.delete('month')
        params.delete('year')

        setSearchParams(params)
    }

    return { filters, updateFilter, resetFilters };
}
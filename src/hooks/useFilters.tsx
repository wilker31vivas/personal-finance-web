import { useState } from "react";
import type { Filters } from "../types/types";

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();

export const INITIAL_FILTERS: Filters = { month: currentMonth.toString(), year: currentYear.toString() };

export default function useFilters() {
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

    const updateFilter = <K extends keyof Filters>(
        key: K,
        value: Filters[K]
    ) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    return { filters, setFilters, updateFilter, INITIAL_FILTERS };
}
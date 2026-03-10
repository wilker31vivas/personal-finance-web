type NumberOrNull = number | null

export interface Balance {
    transactionsAmount: {
        current: {
            income: NumberOrNull,
            expense: NumberOrNull,
            balance: NumberOrNull
        },
        previous: {
            income: NumberOrNull,
            expense: NumberOrNull,
            balance: NumberOrNull
        }
    },
    change: {
        income: NumberOrNull,
        expense: NumberOrNull
        balance: NumberOrNull
    }
}

export type Transaction = {
    id?: string
    type: "income" | "expense"
    category: string
    description: string
    date: string
    amount: number
}

export type Category = {
    id?: string
    name: string
}

export interface DataOptions {
    value: number,
    name: string
}

export type Filters = {
    type?: string;
    category?: string;
    year?: string;
    month?: string;
}

export type FilterKey = keyof Filters

export type UserSession = {
    userName: string,
    userAvatar: string
}

export type UpdateFilterType = (key: keyof Filters, value: string) => void
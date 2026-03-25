import { useState } from "react";
import type { Transaction } from "../types/types"

const INITIAL_TRANSACTION: Transaction = {
    id: "",
    description: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: ''
}

export default function useTransactionForm() {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [formData, setFormData] = useState<Transaction>(INITIAL_TRANSACTION);


    return {
        isModalEditOpen, setIsModalEditOpen, isModalDeleteOpen, 
        setIsModalDeleteOpen, formData, setFormData
    }
}
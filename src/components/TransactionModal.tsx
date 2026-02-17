import { useState } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import { newTransaction } from '../api/transactions'
import type { Transaction } from '../types/types';

const getTodayLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const INITIAL_VALUE: Transaction = {
    description: '',
    amount: 0,
    type: 'expense',
    category: 'food',
    date: getTodayLocalDate()
}

interface TransactionModalProps {
    isOpen: boolean,
    onClose: () => void
}

export default function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const { categories, loadData } = useTransactions()
    const [formData, setFormData] = useState<Transaction>(INITIAL_VALUE);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        newTransaction(formData)
        loadData()
        onClose();
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount'
                ? (value === '' ? 0 : Number(value))
                : value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                        New Transaction
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                            placeholder="Enter description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount === 0 ? '' : formData.amount}
                            onChange={handleChange}
                            required
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full appearance-none px-4 py-3 pr-10 bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-700 rounded-xl text-text dark:text-gray-100 shadow-sm hover:shadow-md hover:border-blue-marguerite-300 dark:hover:border-blue-marguerite-600 focus:border-blue-marguerite-500 dark:focus:border-blue-marguerite-400 focus:ring-4 focus:ring-blue-marguerite-100 dark:focus:ring-blue-marguerite-900/50 transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {categories?.map((item, index) => (
                                <option value={item.name.toLocaleLowerCase()} key={index}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
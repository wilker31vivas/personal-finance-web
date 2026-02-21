import { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import { updateTransaction, createTransaction, deleteTransaction, deleteCategory } from '../api/transactions'
import type { Transaction, Category } from '../types/types';
import { WarningState } from './Message';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
    action(item: Transaction): Promise<void>
    title: 'Edit' | 'Create'
    formData: Transaction
    setFormData: React.Dispatch<React.SetStateAction<Transaction>>
}

interface ModalEditProps {
    isOpen: boolean,
    onClose: () => void
    formData: Transaction
    setFormData: React.Dispatch<React.SetStateAction<Transaction>>
}

interface ModalCreateAndDeleteProps {
    isOpen: boolean,
    onClose: () => void
    transaction?: Transaction
}

const getInitialTransaction = (): Transaction => {
    const getTodayLocalDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return {
        description: '',
        amount: 0,
        type: 'expense',
        category: 'Food',
        date: getTodayLocalDate()
    }
}

function Modal({ isOpen, onClose, action, title, formData, setFormData }: ModalProps) {
    const { categories, loadData } = useTransactions();
    const [error, setError] = useState<null | string>(null);

    const validate = (data: Transaction): string | null => {
        if (!data.description.trim()) return 'The description cannot be empty.';
        if (data.amount <= 0) return 'The amount must be greater than 0';
        return null;
    };

    const reset = () => {
        setError(null)
        onClose();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setError(null);
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount'
                ? (value === '' ? 0 : Number(value))
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationError = validate(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await action(formData);
            await loadData();
            reset()
        } catch (error) {
            setError('An error occurred while saving. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                        {title} Transaction
                    </h2>
                    <button
                        onClick={reset}
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
                            className="w-full appearance-none px-4 py-3 pr-10 bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-700 rounded-xl text-text dark:text-gray-100 shadow-sm hover:shadow-md hover:border-blue-marguerite-300 dark:hover:border-blue-marguerite-600 focus:border-blue-marguerite-500 dark:focus:border-blue-marguerite-400 focus:ring-4 focus:ring-blue-marguerite-100 dark:focus:ring-blue-marguerite-900/50 transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {categories?.map((item) => (
                                <option value={item.name} key={item.id}>
                                    {item.name}
                                </option>
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
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                        />
                    </div>

                    {error && <WarningState message={error}></WarningState>}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={reset}
                            className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function ModalEdit({ isOpen, onClose, formData, setFormData }: ModalEditProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} action={updateTransaction} title='Edit' formData={formData} setFormData={setFormData} ></Modal>
    )
}

export function ModalCreate({ isOpen, onClose }: ModalCreateAndDeleteProps) {

    const [formData, setFormData] = useState<Transaction>(getInitialTransaction());

    const handleClose = () => {
        setFormData(getInitialTransaction());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} action={createTransaction} title='Create' formData={formData} setFormData={setFormData}></Modal>
    )

}

export function ModalDelete({ isOpen, onClose, transaction }: ModalCreateAndDeleteProps) {
    const { loadData } = useTransactions();
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) setError(null);
    }, [isOpen]);

    const handleConfirm = async () => {
        try {
            if (transaction?.id) {
                setIsLoading(true);
                await deleteTransaction(transaction?.id);
                await loadData();
                onClose();
            }
        } catch {
            setError('An error occurred while deleting. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-sm transform transition-all">

                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                        Delete Transaction
                    </h2>
                    <button onClick={handleCancel} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="Close modal">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex justify-center">
                        <div className="w-18 h-18 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-center text-text dark:text-slate-300 text-md">
                        Are you sure you want to delete the transaction{' '}
                        <span className="font-semibold text-text dark:text-white">"{transaction?.description}"</span>?
                        This action cannot be undone.
                    </p>

                    {error && <WarningState message={error} />}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export function ModalDeleteCategory({ fetchCategoriesdData, isOpen, onClose, category }) {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) setError(null);
    }, [isOpen]);

    const handleConfirm = async () => {
        try {
            if (category?.id) {
                setIsLoading(true);
                await deleteCategory(category?.id);
                await fetchCategoriesdData();
                onClose();
            }
        } catch {
            setError('An error occurred while deleting. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-sm transform transition-all">

                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                        Delete Category
                    </h2>
                    <button onClick={handleCancel} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="Close modal">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex justify-center">
                        <div className="w-18 h-18 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-center text-text dark:text-slate-300 text-md">
                        Are you sure you want to delete the category{' '}
                        <span className="font-semibold text-text dark:text-white">"{category?.name}"</span>?
                        This action cannot be undone.
                    </p>

                    {error && <WarningState message={error} />}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { deleteTransaction, deleteCategory, updateCategory, createCategory, getCategories, updateTransaction, createTransaction } from '../api/transactions'
import type { Transaction, Category } from '../types/types';
import { WarningState } from './Message';
import { useSettings } from '../context/SettingsContext'

interface ModalTransactionsProps {
    isOpen: boolean,
    onClose: () => void
    title: 'Edit' | 'Create'
    formData: Transaction
    setFormData: React.Dispatch<React.SetStateAction<Transaction>>
    updateData: () => Promise<void>
}

type ModalCategoryProps = {
    isOpen: boolean,
    onClose: () => void,
    title: 'Edit' | 'Create'
    formData: Category
    setFormData: React.Dispatch<React.SetStateAction<Category>>
    updateData: () => Promise<void>
}

type ModalDeleteProps = {
    isOpen: boolean,
    onClose: () => void,
    item: {
        id?: string
        name?: string
        description?: string
    }
    typeModal: 'transaction' | 'category'
    loadData: () => Promise<void>
}

type ModalProfileProps = {
    isOpen: boolean,
    onClose: () => void,
    typeModal: 'name' | 'photo'
}

export function ModalTransaction({ isOpen, onClose, title, formData, setFormData, updateData }: ModalTransactionsProps) {
    const [error, setError] = useState<null | string>(null);
    const [categories, setCategories] = useState<Category[] | null>(null)

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const validate = (data: Transaction): string | null => {
        if (!data.description.trim()) return 'The description cannot be empty.';
        if (data.amount <= 0) return 'The amount must be greater than 0';
        return null;
    };

    const fetchCategories = async () => {
        try {
            const res = await getCategories()
            setCategories(res)
        } catch (err) {
            setError(`Error loading categories: ${err}`)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

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
            if (title === 'Edit') {
                await updateTransaction(formData);
            } else if (title === 'Create') {
                await createTransaction(formData);
            }
            await updateData();
            reset()
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred while saving. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                        {title} Transaction
                    </h2>
                    <button
                        onClick={reset}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-marguerite-500 to-blue-marguerite-600 hover:from-blue-marguerite-600 hover:to-blue-marguerite-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function ModalCategory({ isOpen, onClose, title, formData, setFormData, updateData }: ModalCategoryProps) {
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const validate = (data: Category): string | null => {
        if (!data.name.trim()) return 'The name cannot be empty.';
        return null;
    };

    const reset = () => {
        setError(null)
        onClose();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            name: value

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
            if (title === 'Edit') {
                await updateCategory(formData);
            } else if (title === 'Create') {
                await createCategory(formData);
            }
            await updateData();
            reset()
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred while saving. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}  className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-text bg-gradient-to-r from-blue-marguerite-600 to-purple-600 bg-clip-text text-transparent">
                        {title} Category
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
                        <label htmlFor="name" className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-marguerite-500 focus:border-transparent outline-none transition-all text-text dark:text-white"
                            placeholder="Enter description..."
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

export function ModalDelete({ isOpen, onClose, item, loadData, typeModal }: ModalDeleteProps) {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleConfirm = async () => {
        if (!item?.id) return;
        setIsLoading(true);

        try {
            if (typeModal === 'transaction') {
                await deleteTransaction(item.id);
            } else {
                await deleteCategory(item.id);
            }
            await loadData();
            onClose();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred while deleting. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setError(null);
        onClose();
    };

    useEffect(() => {
        if (isOpen) setError(null);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-sm transform transition-all">

                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                        Delete {typeModal === 'transaction' ? "Transaction" : 'Category'}
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
                        Are you sure you want to delete the {typeModal === 'transaction' ? "Transaction" : 'Category'} {' '}
                        <span className="font-semibold text-text dark:text-white">"{typeModal === 'transaction' ? item.description : item.name}"</span>?
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

export function ModalProfile({ isOpen, onClose, typeModal }: ModalProfileProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold text-text mb-4">{typeModal === 'name' ? 'Edit your name' : 'Choose Your Avatar'}</h3>
                {typeModal === 'name' ?
                    <NameModal onClose={onClose} /> : <AvatarModal onClose={onClose} />
                }
            </div>
        </div>
    )
}

function NameModal({ onClose }: { onClose: () => void }) {
    const { updateUserName, userName, setUserName } = useSettings()

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateUserName(userName);
                onClose();
            }} className="space-y-4">
                <div>
                    <label
                        htmlFor="username"
                        className="text-sm font-semibold text-text mb-2 flex items-center gap-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        required
                        placeholder="Change the username"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-text placeholder:text-gray-400 focus:border-blue-marguerite-500 focus:ring-4 focus:ring-blue-marguerite-100 transition-all outline-none"
                    />
                </div>
                <div className='flex gap-4'>
                    <button type='submit'
                        className="group w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-marguerite-500 to-purple-600 hover:from-blue-marguerite-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    >
                        <span>Save name</span>
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-blue-marguerite-500 hover:bg-blue-marguerite-600 text-white font-semibold rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>

    )
}

function AvatarModal({ onClose }: { onClose: () => void }) {
    const { updateUserAvatar, avatarsURL } = useSettings()

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {avatarsURL.map((avatar, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            updateUserAvatar(avatar);
                            onClose();
                        }}
                        className="cursor-pointer rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-marguerite-500 transition-all hover:scale-110"
                    >
                        <img src={avatar} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-blue-marguerite-500 hover:bg-blue-marguerite-600 text-white font-semibold rounded-xl transition-colors"
            >
                Cancel
            </button>
        </>
    )
}
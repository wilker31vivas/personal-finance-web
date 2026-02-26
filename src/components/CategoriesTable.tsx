import Loader from "./Loader"
import EmptyState from "./EmptyState";
import type { Category } from "../types/types";
import { useState } from "react";
import { ModalDelete, ModalCategory } from '../components/Modal'
import { ErrorState } from "./Message";

type CategoriesTable = {
    error: string | null
    loading: boolean
    loadData(): Promise<void>
    categories: Category[]
}

export default function CategoriesTable({ error, loading, loadData, categories }: CategoriesTable) {
    const [category, setCategory] = useState<Category>({ id: "", name: '' });
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    if (error) return <ErrorState title={error} onRetry={loadData}></ErrorState>

    return (
        <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg dark:shadow-slate-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Categories table">
                    <thead>
                        <tr className="bg-blue-marguerite-50  dark:from-blue-marguerite-950/30 dark:to-purple-950/30 border-b-2 border-blue-marguerite-200 dark:border-blue-marguerite-800">
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">
                                Category Name
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan={2} className="py-8">
                                    <Loader description="Loading categories..." />
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="p-6">
                                    <EmptyState
                                        title="No categories yet"
                                        description="Start by creating your first category to organize your transactions."
                                        onReset={() => alert('category created')}
                                        titleOnReset="Create Category"
                                    />
                                </td>
                            </tr>
                        ) : (
                            categories.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-marguerite-50/50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-marguerite-600 dark:bg-blue-marguerite-400 opacity-70 group-hover:opacity-100 transition" />
                                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-marguerite-700 dark:group-hover:text-blue-marguerite-400 transition-colors duration-200">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end items-center">
                                            <button
                                                onClick={() => {
                                                    setCategory({ id: item.id, name: item.name });
                                                    setIsModalEditOpen(true)
                                                }}
                                                className="cursor-pointer group/btn flex items-center gap-2 px-4 py-2.5 bg-blue-marguerite-50 dark:bg-blue-marguerite-950/30 hover:bg-blue-marguerite-500 dark:hover:bg-blue-marguerite-600 text-blue-marguerite-700 dark:text-blue-marguerite-300 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-blue-marguerite-200 dark:border-blue-marguerite-800 hover:border-blue-marguerite-500 dark:hover:border-blue-marguerite-600"
                                                aria-label={`Edit ${item.name}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span className="text-sm">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCategory({ id: item.id, name: item.name });
                                                    setIsModalDeleteOpen(true)
                                                }}
                                                className="cursor-pointer group/btn flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-500 dark:hover:bg-red-600 text-red-700 dark:text-red-400 hover:text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border border-red-200 dark:border-red-900 hover:border-red-500 dark:hover:border-red-600"
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span className="text-sm">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ModalCategory isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} title="Edit" formData={category} setFormData={setCategory} updateData={loadData}></ModalCategory>
            <ModalDelete typeModal="category" loadData={loadData} isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} item={category}></ModalDelete>
        </div>
    );
}
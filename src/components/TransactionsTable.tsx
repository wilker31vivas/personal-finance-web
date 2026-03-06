import Loader from './Loader'
import { useTransactions, INITIAL_FILTERS } from '../context/TransactionsContext';
import EmptyState from './EmptyState'
import { ModalDelete, ModalTransaction } from './Modal'
import { deleteTransaction } from '../api/transactions'

import Pagination from './Pagination'
import TransactionCard from './TransactionCard'

function TableHead() {
    return (
        <thead className="border-b border-blue-marguerite-200 dark:border-blue-marguerite-800">
            <tr>
                <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-blue-marguerite-700 dark:text-blue-marguerite-300 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
    )
}

export default function TransactionsTable() {
    const { loading, pagedResults, setFilters,
        loadData, formData, setFormData,
        isModalDeleteOpen, setIsModalDeleteOpen,
        isModalEditOpen, setIsModalEditOpen } = useTransactions()

    return (
        <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm dark:shadow-slate-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left" aria-label="Transactions table">
                    <TableHead />
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-20">
                                    <Loader description="Loading transactions..."></Loader>
                                </td>
                            </tr>
                        ) : pagedResults.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-10">
                                    <EmptyState title="No transactions found" description="We couldn't find any transactions with the applied filters" onReset={() => setFilters(INITIAL_FILTERS)} titleOnReset='Clear Filters'>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-marguerite-100 dark:bg-blue-marguerite-900/30 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-blue-marguerite-400 dark:text-blue-marguerite-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </EmptyState>
                                </td>
                            </tr>
                        ) : (
                            pagedResults?.map((t) => (
                                <TransactionCard key={t.id} transaction={t}></TransactionCard>
                            ))
                        )}
                    </tbody>
                </table>

                <Pagination></Pagination>

                <ModalTransaction
                    updateData={loadData}
                    title='Edit'
                    isOpen={isModalEditOpen}
                    onClose={() => setIsModalEditOpen(false)}
                    formData={formData}
                    setFormData={setFormData}
                />
                <ModalDelete
                    isOpen={isModalDeleteOpen}
                    onClose={() => setIsModalDeleteOpen(false)}
                    title="Delete Transaction"
                    description="Are you sure you want to delete"
                    itemName={formData.description}
                    onConfirm={async () => {
                        if (formData.id) {
                            await deleteTransaction(formData.id);
                            await loadData();
                        }
                    }}
                />
            </div>
        </div>
    )
}
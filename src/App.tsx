import Dashboard from "./pages/Dashboard"
import { DashboardContextProvider } from "./context/DashboardContext"
import { TransactionsContextProvider } from "./context/TransactionsContext"
import Transactions from "./pages/Transactions"
import Categories from "./pages/Categories"
import Aside from "./components/Aside"
import { Route, Routes } from 'react-router-dom'
import NotFound from "./components/NotFound"

function App() {
  return (
    <div className='h-screen flex overflow-hidden bg-body text-slate-900 '>
      <Aside />
      <main className="flex-1 overflow-y-auto transition-colors duration-200">
        <Routes>
          <Route path="/" element={
            <DashboardContextProvider>
              <Dashboard />
            </DashboardContextProvider>}>
          </Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/transactions" element={
            <TransactionsContextProvider>
              <Transactions />
            </TransactionsContextProvider>}>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

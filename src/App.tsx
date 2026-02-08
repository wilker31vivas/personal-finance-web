import Dashboard from "./pages/Dashboard"
import { DashboardContextProvider } from "./context/DashboardContext"
import { TransactionsContextProvider } from "./context/TransactionsContext"
import Transactions from "./pages/Transactions"
import Categories from "./pages/Categories"
import Aside from "./components/Aside"

function App() {
  return (
    <div className='h-screen flex overflow-hidden bg-body text-slate-900 '>
      <Aside></Aside>
      <main className="flex-1 overflow-y-auto p-8 transition-colors duration-200">
        <Categories></Categories>
      </main>
      {/* <DashboardContextProvider>
        <Dashboard></Dashboard>
      </DashboardContextProvider> */}
      {/* <TransactionsContextProvider>
        <Transactions></Transactions>
      </TransactionsContextProvider> */}
    </div>
  )
}

export default App

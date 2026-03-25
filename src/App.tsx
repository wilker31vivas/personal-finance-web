import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { DashboardContextProvider } from "./context/DashboardContext"
import { TransactionsContextProvider } from "./context/TransactionsContext"
import { useSettings } from "./context/SettingsContext"
import { LoadingFallback } from './components/Fallback'
import Aside from "./components/Aside"
import ProtectedRoute from './components/ProtectedRoute'
import Footer from "./components/Footer"

const Dashboard = lazy(() => import("./pages/Dashboard"))
const Transactions = lazy(() => import("./pages/Transactions"))
const Categories = lazy(() => import("./pages/Categories"))
const Settings = lazy(() => import("./pages/Settings"))
const Login = lazy(() => import("./pages/Login"))
const NotFound = lazy(() => import("./pages/NotFound"))


function App() {
  const { user } = useSettings()

  return (
    <div className='h-screen flex overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 '>
      {user && <Aside />}
      <main className=" flex-1 overflow-y-auto transition-colors duration-200">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <DashboardContextProvider>
                  <Dashboard />
                </DashboardContextProvider>}>
              </Route>
              <Route path="/categories" element={<Categories />} />
              <Route path="/transactions" element={
                <TransactionsContextProvider>
                  <Transactions />
                </TransactionsContextProvider>}>
              </Route>
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
       <Footer />
      </main>
    </div>
  )
}

export default App

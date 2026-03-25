import { Navigate, Outlet } from "react-router-dom";
import { useSettings } from "../context/SettingsContext"

export default function ProtectedRoute() {
  const { user } = useSettings()    

    if(!user){
        return <Navigate to={"/login"} replace></Navigate>
    }

    return <Outlet />;
}
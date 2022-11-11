import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoute } from "../auth/routes/AuthRoute"
import { firebaseAuth } from "../firebase/config"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/checkingAuth"

export const AppRouter = () => {

  const {status} = useCheckAuth()

  if(status === 'checking'){
    return <CheckingAuth/>
  }
  
  return (
    <Routes>
      {
        status === 'authenticated' ? 
        <Route path='/*' element={<JournalRoutes/>}></Route>
        :
        <Route path='/auth/*' element={<AuthRoute/>}></Route>
      }

      <Route path='*' element={<Navigate to='auth/login'/>}></Route>
        {/* Login y Register */}
        {/* <Route path='/auth/*' element={<AuthRoute/>}></Route> */}
        {/* Dashboard */}
        {/* <Route path='/*' element={<JournalRoutes/>}></Route> */}

    </Routes>
  )
}

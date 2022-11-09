import { Route, Routes } from "react-router-dom"
import { AuthRoute } from "../auth/routes/AuthRoute"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y Register */}
        <Route path='/auth/*' element={<AuthRoute/>}></Route>
        {/* Dashboard */}
        <Route path='/*' element={<JournalRoutes/>}></Route>

    </Routes>
  )
}

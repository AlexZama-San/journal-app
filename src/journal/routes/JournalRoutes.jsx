import { Navigate, Route, Routes } from "react-router-dom"
import { JorunalPage } from "../pages/JorunalPage"

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <JorunalPage/>}></Route>
        <Route path="/*" element={<Navigate to="/"/>}></Route>
    </Routes>
  )
}

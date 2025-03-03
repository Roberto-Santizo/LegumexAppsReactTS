import { BrowserRouter, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AgricolaRoutes from "./routes/AgricolaRoutes";
import CalidadRoutes from "./routes/CalidadRoutes";
import ProduccionRoutes from "./routes/ProduccionRoutes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {PublicRoutes()}
                {AdminRoutes()}
                {AgricolaRoutes()}
                {CalidadRoutes()}
                {ProduccionRoutes()}
            </Routes>
        </BrowserRouter>
    )
}

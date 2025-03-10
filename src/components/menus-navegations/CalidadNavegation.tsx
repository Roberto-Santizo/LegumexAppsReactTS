import { FileSpreadsheet, ChartBarIncreasing, Truck, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

export default function CalidadNavegation() {
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();
    const getUserRoleByToken = useAppStore((state) => state.getUserRoleByToken);

    useEffect(() => {
        const handleGetUserRoleByToken = async () => {
            try {
                const userRole = await getUserRoleByToken();
                setRole(userRole);
            } catch (error) {
                toast.error("Hubo un error al cargar el contenido");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        handleGetUserRoleByToken();
    }, []);
    return (
        <>
            {(loading && !role) ? <Spinner /> : (
                <>
                    <NavLink
                        to={"/rmp"} className={({ isActive }) =>
                            `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                            }`
                        }
                    >
                        <FileSpreadsheet className="w-8" />
                        <p className="text-sm font-bold">Boleta RMP</p>
                    </NavLink>

                    {(role === 'admincalidad' || role === 'admin') && (
                        <>
                            <NavLink
                                to={"/productos"} className={({ isActive }) =>
                                    `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                                    }`
                                }
                            >
                                <ChartBarIncreasing className="w-8" />
                                <p className="text-sm font-bold">Productos y Variedades</p>
                            </NavLink>

                            <NavLink
                                to={"/productores"} className={({ isActive }) =>
                                    `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                                    }`
                                }
                            >
                                <User className="w-8" />
                                <p className="text-sm font-bold">Productores</p>
                            </NavLink>

                            <NavLink
                                to={"/transporte-boleta"} className={({ isActive }) =>
                                    `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                                    }`
                                }
                            >
                                <Truck className="w-8" />
                                <p className="text-sm font-bold">Inspeccion de transporte</p>
                            </NavLink>
                        </>
                    )}

                    {role === 'admin' && (
                        <NavLink
                            to={"/transportistas"} className={({ isActive }) =>
                                `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                                }`
                            }
                        >
                            <Users className="w-8" />
                            <p className="text-sm font-bold">Transportistas y Pilotos</p>
                        </NavLink>
                    )}

                </>
            )}


        </>
    )
}



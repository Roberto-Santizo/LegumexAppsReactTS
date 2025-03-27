import { NavLink } from "react-router-dom";
import { AlarmClockPlus, BookOpenCheck, ChartBarIncreasing, ChartLine, ShoppingCart, UserRoundCog, Users } from "lucide-react";

export default function ProduccionNavigation() {
  return (
    <>
      <NavLink
        to={"/planes-produccion"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <BookOpenCheck className="w-8" />
        <p className="text-sm font-bold">Plan Semanal Producción</p>
      </NavLink>

      <NavLink
        to={"/lineas-skus"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <ChartLine className="w-8" />
        <p className="text-sm font-bold">Lineas & SKUS</p>
      </NavLink>

      <NavLink
        to={"/skus"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <ChartBarIncreasing className="w-8" />
        <p className="text-sm font-bold">Sku's</p>
      </NavLink>

      <NavLink
        to={"/lineas"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <Users className="w-8" />
        <p className="text-sm font-bold">Lineas</p>
      </NavLink>

      <NavLink
        to={"/productos-sku"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <UserRoundCog className="w-8" />
        <p className="text-sm font-bold">Productos</p>
      </NavLink>


      <NavLink
        to={"/clientes"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <ShoppingCart className="w-8" />
        <p className="text-sm font-bold">Clientes</p>
      </NavLink>

      <NavLink
        to={"/tiempos-muertos"}
        className={({ isActive }) =>
          `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`
        }
      >
        <AlarmClockPlus className="w-8" />
        <p className="text-sm font-bold">Tiempos Muertos</p>
      </NavLink>
    </>
  );
}




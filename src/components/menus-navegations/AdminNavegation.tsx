import { NavLink } from "react-router-dom";
import { HomeIcon, UserCog, User, UserCheck } from "lucide-react";

export default function AdminNavegation() {
  return (
    <>
      <nav className="gap-2 py-2 flex flex-col w-full">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            }`
          }
        >
          <HomeIcon className="w-8" />
          <p className="text-sm font-bold">Dashboard</p>
        </NavLink>

        <NavLink
          to={"/usuarios"}
          className={({ isActive }) =>
            `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            }`
          }
        >
          <User className="w-8" />
          <p className="text-sm font-bold">Usuarios</p>
        </NavLink>

        <NavLink
          to={"/roles"}
          className={({ isActive }) =>
            `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            }`
          }
        >
          <UserCog className="w-8" />
          <p className="text-sm font-bold">Roles</p>
        </NavLink>

        <NavLink
          to={"/permisos"}
          className={({ isActive }) =>
            `flex items-center gap-2 flex-row rounded transition-colors w-full p-2 ${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            }`
          }
        >
          <UserCheck className="w-8" />
          <p className="text-sm font-bold">Permisos</p>
        </NavLink>
      </nav>
    </>
  );
}

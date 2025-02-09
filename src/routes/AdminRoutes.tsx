import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProtectedAdminRoutes from "../components/ProtectedAdminRoutes";
import Spinner from "../components/Spinner";
import ProtectedRoute from "../components/ProtectedRoutes";

const Dashboard = lazy(() => import("../components/Dashboard"));

//RUTAS DE USUARIOS
const CreateUser = lazy(() => import("../views/admin/users/CreateUser"));
const IndexUsers = lazy(() => import("../views/admin/users/IndexUsers"));
const EditUser = lazy(() => import("../views/admin/users/EditUser"));

//RUTAS DE PERMISOS
const IndexPermisos = lazy(
  () => import("../views/admin/permisos/IndexPermisos")
);
const CreatePermiso = lazy(
  () => import("../views/admin/permisos/CreatePermiso")
);

//RUTAS DE ROLES
const IndexRoles = lazy(() => import("../views/admin/roles/IndexRoles"));
const CreateRole = lazy(() => import("../views/admin/roles/CreateRole"));

export default function AdminRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
          index
        />

        <Route
          path="/usuarios"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <IndexUsers />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/usuarios/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <CreateUser />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/usuarios/editar/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <EditUser />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/roles"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <IndexRoles />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/roles/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <CreateRole />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/permisos"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <IndexPermisos />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />

        <Route
          path="/permisos/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAdminRoutes>
                <CreatePermiso />
              </ProtectedAdminRoutes>
            </Suspense>
          }
        />
      </Route>
    </>
  );
}

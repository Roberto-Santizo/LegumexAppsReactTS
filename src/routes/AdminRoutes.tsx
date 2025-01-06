import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import IndexUsers from "../views/admin/users/IndexUsers";
import CreateUser from "../views/admin/users/CreateUser";
import ProtectedRoute from "../components/ProtectedRoutes";
import IndexRoles from "../views/admin/roles/IndexRoles";
import Dashboard from "../components/Dashboard";

export default function AdminRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          index
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <IndexUsers />
            </ProtectedRoute>
          }
          index
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/usuarios/crear"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
          index
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <IndexRoles />
            </ProtectedRoute>
          }
          index
        />
      </Route>
    </>
  );
}

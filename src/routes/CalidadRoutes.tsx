import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Spinner from "../components/Spinner";
import ProtectedAgricolaRoutes from "../components/ProtectedAgricolaRoutes";

const routes = [
  { path: "/rmp", component: lazy(() => import("../views/calidad/rmp/IndexRMP")), roles: ['admin','pprod','pcampo','pcalidad'] },
  { path: "/rmp/crear", component: lazy(() => import("../views/calidad/rmp/Boleta_form1")), roles: ['admin','pcampo'] },
  { path: "/rmp/editar/:rm_reception_id", component: lazy(() => import("../views/calidad/rmp/EditRMP")), roles: ['admin','pprod','pcalidad'] },

  { path: "/productores", component: lazy(() => import("../views/calidad/productores/IndexProducers")), roles: ['admin','axucalidad'] },
  { path: "/productores/crear", component: lazy(() => import("../views/calidad/productores/CreateProducer")), roles: ['admin','axucalidad'] },


  { path: "/inspectores", component: lazy(() => import("../views/calidad/inspectores/IndexInspectores")), roles: ['admin','axucalidad'] },

  { path: "/productos", component: lazy(() => import("../views/calidad/productos/IndexProducts")), roles: ['admin','pcalidad'] },
  { path: "/productos/crear", component: lazy(() => import("../views/calidad/productos/CrearProduct")), roles: ['admin','pcalidad'] },
  { path: "/productos/:product_id/editar", component: lazy(() => import("../views/calidad/productos/EditProduct")), roles: ['admin','pcalidad'] },
  { path: "/productos/variedades", component: lazy(() => import("../views/calidad/variedades/IndexVariedades")), roles: ['admin','pcalidad'] },
  { path: "/productos/variedades/crear", component: lazy(() => import("../views/calidad/variedades/CrearVariedad")), roles: ['admin','pcalidad'] },
  // { path: "/productos", component: lazy(() => import("../views/calidad/productos/CrearProduct")), roles: ['admin','pcalidad'] },
  
  // { path: "/products-info/varieties", component: lazy(() => import("../views/calidad/products-info/Varieties")), roles: ['admin','axucalidad','pcampo'] },
  // { path: "/products-info/varietiesDefects", component: lazy(() => import("../views/calidad/products-info/VarietiesDefects")), roles: ['admin','axucalidad','pcampo'] },

  { path: "/transporte/boleta", component: lazy(() => import("../views/calidad/transporte/BoletaCamion")), roles: ['admin','pcalidad'] },
];

export default function CalidadRoutes() {
  return (
    <Route element={<Layout />}>
      {routes.map(({ path, component: Component, roles }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes roles={roles}>
                <Component />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      ))}
    </Route>

  );
}

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Spinner from "../components/Spinner";
import ProtectedAgricolaRoutes from "../components/ProtectedAgricolaRoutes";

//INSUMOS
const IndexInsumos = lazy(() => import("../views/agricola/insumos/IndexInsumos")) ;
const CrearInsumo = lazy(() => import("../views/agricola/insumos/CrearInsumo"));


//PLANES SEMANALES
const IndexPlanSemanal = lazy(() => import("../views/agricola/planes-semanales/IndexPlanSemanal"));
const CreatePlanSemanal  = lazy(() => import( "../views/agricola/planes-semanales/CreatePlanSemanal"));
const ShowPlanSemanal = lazy(() => import( "../views/agricola/planes-semanales/ShowPlanSemanal"));

//TAREAS
const IndexTareas = lazy(() => import("../views/agricola/tareas/IndexTareas"));
const CreateTarea = lazy(() => import("../views/agricola/tareas/CreateTarea"));
const EditTarea = lazy(() => import("../views/agricola/tareas/EditTarea"));
const CargaMasivaTareas = lazy(() => import( "../views/agricola/tareas/CargaMasivaTareas"));


//CDPS
const IndexCdps = lazy(() => import("../views/agricola/cdps/IndexCdps"));
const CreateCdp = lazy(() => import("../views/agricola/cdps/CreateCdp"));

//LOTES
const IndexLotes = lazy(() => import("../views/agricola/lotes/IndexLotes"));
const CreateLote = lazy(() => import("../views/agricola/lotes/CreateLote"));

//TAREAS LOTE
const IndexTareasLote = lazy(() => import( "../views/agricola/tareas-lote/IndexTareasLote"));
const AsignarTareaLote  = lazy(() => import("../views/agricola/tareas-lote/AsignarTareaLote"));
const InfoTareaLote  = lazy(() => import( "../views/agricola/tareas-lote/InfoTareaLote"));
const EditarTareaLote = lazy(() => import( "../views/agricola/tareas-lote/EditarTareaLote"));

//TAREAS COSECHA LOTE
const IndexTareasCosechaLote = lazy(() => import("../views/agricola/tareas-cosecha/IndexTareasCosechaLote"));
const AsignarTareaCosechaLote   = lazy(() => import("../views/agricola/tareas-cosecha/AsignarTareaCosechaLote"));
const TomarLibrasPersonal = lazy(() => import("../views/agricola/tareas-cosecha/TomarLibrasPersonal")) ;
const ResumenTareaCosechaLote = lazy(() => import( "../views/agricola/tareas-cosecha/ResumenTareaCosechaLote"));


export default function AgricolaRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route
          path="/planes-semanales"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexPlanSemanal />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CreatePlanSemanal />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/:finca/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <ShowPlanSemanal />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/tareas"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexTareas />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/tareas/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CreateTarea />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/tareas/carga-masiva"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CargaMasivaTareas />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/tareas/edit/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <EditTarea />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      {/* RUTAS DE CPS */}
      <Route element={<Layout />}>
        <Route
          path="/cdps"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexCdps />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/cdps/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CreateCdp />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      {/* RUTAS DE LOTES */}

      <Route element={<Layout />}>
        <Route
          path="/lotes"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexLotes />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/lotes/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CreateLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      {/* TAREAS LOTE */}
      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-lote/:weekly_plan_id/:lote_plantation_control_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexTareasLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-lote/asignar/:finca_id/:task_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <AsignarTareaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-lote/informacion/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <InfoTareaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-lote/editar/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <EditarTareaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      {/* TAREAS COSECHA LOTE */}
      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-cosecha-lote/:weekly_plan_id/:lote_plantation_control_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexTareasCosechaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-cosecha-lote/asignar/:task_crop_id/:finca_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <AsignarTareaCosechaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-cosecha-lote/toma-rendimiento/:task_crop_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <TomarLibrasPersonal />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/planes-semanales/tareas-cosecha-lote/resumen/:task_crop_id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <ResumenTareaCosechaLote />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      {/* Insumos */}

      <Route element={<Layout />}>
        <Route
          path="/insumos"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <IndexInsumos />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/insumos/crear"
          element={
            <Suspense fallback={<Spinner />}>
              <ProtectedAgricolaRoutes>
                <CrearInsumo />
              </ProtectedAgricolaRoutes>
            </Suspense>
          }
        />
      </Route>
    </>
  );
}

//HOOKS
import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { motion } from "framer-motion";

import { getPaginatedPlans } from "@/api/WeeklyPlansAPI";

//COMPONENTES
import { Link } from "react-router-dom";
import { CheckCircle, Download, PlusIcon, Sheet, XIcon } from "lucide-react";
import { toast } from "react-toastify";

import { downloadWeeklyPlanReport } from "@/api/WeeklyPlansAPI";

import ShowErrorAPI from "@/components/ShowErrorAPI";
import Spinner from "@/components/Spinner";
import { WeeklyPlan } from "@/types";
import Pagination from "@/components/Pagination";
import LoadingOverlay from "@/components/LoadingOverlay";
import { formatearQuetzales } from "../../../helpers";

export default function IndexPlanSemanal() {
  const [selectingReport, setSelectingReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDownloadReport, setLoadingDownloadReport] = useState<boolean>(false);
  const [loadingDownloadSingleReport, setLoadingSingleReport] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [plansId, setPlansId] = useState<WeeklyPlan["id"][]>([]);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [role, setRole] = useState<string>("");
  const getUserRoleByToken = useAppStore((state) => state.getUserRoleByToken);

  const handleGetUserRole = async () => {
    setLoading(true);
    try {
      const role = await getUserRoleByToken();
      setRole(role);
    } catch (error) {
      toast.error("Error al cargar el contenido");
      setError(false);
    } finally {
      setLoading(false);
    }
  };
  const handleGetPlans = async (page: number) => {
    setLoading(true);
    try {
      const plans = await getPaginatedPlans(page);
      setWeeklyPlans(plans.data);
      setPageCount(plans.meta.last_page);
      setCurrentPage(plans.meta.current_page);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    handleGetUserRole();
  }, [currentPage]);

  useEffect(() => {
    handleGetPlans(currentPage);
  }, [currentPage]);

  const handleDobleClick = (id: WeeklyPlan["id"]) => {
    setSelectingReport(true);

    setPlansId((prev) => {
      const updatedPlans = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];

      if (updatedPlans.length === 0) {
        setSelectingReport(false);
      }

      return updatedPlans;
    });
  };

  const handleDowloadReport = async () => {
    setLoadingDownloadReport(true);
    try {
      await downloadWeeklyPlanReport(plansId);
    } catch (error) {
      toast.error("Hubo un error al tratar de descargar el archivo");
    } finally {
      setLoadingDownloadReport(false);
      setSelectingReport(false);
      setPlansId([]);
    }
  };

  const handleDownloadSingleReport = async (data: string[]) => {
    setLoadingSingleReport(true);
    try {
      await downloadWeeklyPlanReport(data);
    } catch (error) {
      toast.error("Hubo un error al tratar de descargar el archivo");
    } finally {
      setLoadingSingleReport(false);
    }
  };

  return (
    <>
      {loadingDownloadSingleReport && <LoadingOverlay />}
      <h2 className="font-bold text-4xl">Planes Semanales</h2>

      {(role === "admin" || role === "adminagricola") && (
        <div className="flex flex-row justify-end gap-5 mb-5">
          <Link
            to="/planes-semanales/crear"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 uppercase flex justify-center items-center"
          >
            <PlusIcon className="w-8" />
            <p>Crear Plan Semanal</p>
          </Link>

          <Link
            to="/planes-semanales/tareas-lote/crear"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 uppercase flex justify-center items-center"
          >
            <PlusIcon className="w-8" />
            <p>Crear Actividad</p>
          </Link>
        </div>
      )}

      {selectingReport && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-end gap-5"
        >
          <button
            className="button bg-green-500 hover:bg-green-700 flex gap-2"
            onClick={() => handleDowloadReport()}
            disabled={loadingDownloadReport}
          >
            {loadingDownloadReport ? (
              <Spinner />
            ) : (
              <>
                <p>Descargar Reportes</p>
                <Download className="hover:text-gray-400 cursor-pointer" />
              </>
            )}
          </button>
          <div
            className="button bg-red-500 hover:bg-red-700 flex gap-2"
            onClick={() => {
              setSelectingReport(false);
              setPlansId([]);
            }}
          >
            <XIcon className="hover:text-red-500 cursor-pointer" />
            <p>Cancelar</p>
          </div>
        </motion.div>
      )}

      {!loading && error && <ShowErrorAPI />}
      {(loading && weeklyPlans.length === 0) ? <Spinner /> : (
        <>
          <table className="table mt-10">
            <thead>
              <tr className="thead-tr">
                {selectingReport && <th scope="col" className="thead-th"></th>}

                <th scope="col" className="thead-th">
                  Finca
                </th>
                <th scope="col" className="thead-th">
                  Semana
                </th>
                <th scope="col" className="thead-th">
                  Año
                </th>
                {/* <th scope="col" className="thead-th">
                  Fecha de Creación
                </th> */}
                {(role === "admin" || role === "adminagricola") && (
                  <>
                    <th scope="col" className="thead-th">
                      Control de Presupuesto
                    </th>
                    <th scope="col" className="thead-th">
                      Monto Extraordinario
                    </th>
                  </>
                )}

                <th scope="col" className="thead-th">
                  Control de Tareas
                </th>
                <th scope="col" className="thead-th">
                  Control de tareas Cosecha
                </th>
                <th scope="col" className="thead-th">
                  Tareas
                </th>
                <th scope="col" className="thead-th">
                  Reporte General
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {weeklyPlans.map((plan) => (
                <tr
                  className="tbody-tr"
                  key={plan.id}
                  onDoubleClick={() => handleDobleClick(plan.id)}
                >
                  {selectingReport && (
                    <td className="p-5">
                      {plansId.some((p) => p === plan.id) && (
                        <CheckCircle
                          className="text-green-600 cursor-pointer hover:text-green-800"
                          onClick={() => handleDobleClick(plan.id)}
                        />
                      )}
                    </td>
                  )}
                  <td className="tbody-td">{plan.finca}</td>
                  <td className="tbody-td">{plan.week}</td>
                  <td className="tbody-td">{plan.year}</td>
                  {/* <td className="tbody-td">{plan.created_at}</td> */}
                  {(role === "admin" || role === "adminagricola") && (
                    <>
                      <td className="tbody-td font-bold text-green-500">
                        {`${formatearQuetzales(plan.used_budget)}/${formatearQuetzales(plan.total_budget)}`}
                      </td>
                      <td className="tbody-td font-bold text-green-500">
                        {`${formatearQuetzales(plan.used_total_budget_ext)}/${formatearQuetzales(plan.total_budget_ext)}`}
                      </td>
                    </>
                  )}
                  <td className="tbody-td">
                    {`${plan.finished_total_tasks}/${plan.total_tasks}`}
                  </td>
                  <td className="tbody-td">{`${plan.finished_total_tasks_crops}/${plan.total_tasks_crop}`}</td>
                  <td className="tbody-td w-1/5">
                    <Link
                      to={`/planes-semanales/${plan.finca}/${plan.id}`}
                      className="button bg-indigo-500 hover:bg-indigo-600 w-auto"
                    >
                      Tareas del Plan
                    </Link>
                  </td>
                  <td className="tbody-td">
                    <button
                      onClick={() => handleDownloadSingleReport([plan.id])}
                    >
                      <Sheet className="hover:text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-10 flex justify-end">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}

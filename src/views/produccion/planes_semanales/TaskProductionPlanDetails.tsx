import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskProductionInProgressDetail } from "@/api/WeeklyProductionPlanAPI";
import GraphicsPlanSemanal, { graphDataType } from "./GraphicsPlanSemanal";
import { useEffect, useState } from "react";
import Spinner from "@/components/utilities-components/Spinner";
import ShowErrorAPI from "@/components/utilities-components/ShowErrorAPI";

export default function TaskProductionPlanDetails() {
  const params = useParams();
  const task_p_id = params.task_p_id!!;
  const [graphData, setGraphData] = useState<graphDataType>({} as graphDataType);

  const { data: task, isLoading, isError, } = useQuery({
    queryKey: ["getTaskProductionInProgressDetail", task_p_id],
    queryFn: () => getTaskProductionInProgressDetail(task_p_id),
    refetchInterval: 1000
  });

  useEffect(() => {
    if (task) {
      setGraphData({
        HPlan: task.data.HPlan,
        HLinea: task.data.HLinea,
        HRendimiento: task.data.HRendimiento,
        HTiemposMuertos: task.data.HTiemposMuertos
      })
    }
  }, [task])

  if (isLoading) return <Spinner />;
  if (isError) return <ShowErrorAPI />;
  if (task)
    return (
      <div>
        <h2 className="font-bold text-4xl">Infomación de Tarea </h2>
        <div className="mt-10 flex flex-col">
          <div>
            <p className="font-bold text-2xl">SKU: {task.data.sku}</p>
          </div>

          <div className="grid grid-cols-2 gap-5 p-5 shadow">
            <div>
              <h2 className="font-bold text-2xl uppercase mb-5">Información de rendimientos</h2>
              <div className="w-full p-2 h-64 overflow-y-scroll scrollbar-hide">

                <table className="table">
                  <thead>
                    <tr className="thead-tr">
                      <th className="thead-th">Fecha de Toma</th>
                      <th className="thead-th">Tarimas Producidas</th>
                      <th className="thead-th">Libras Bascula</th>
                      <th className="thead-th">Libras Producidas</th>
                      <th className="thead-th">Sobre Dosificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.data.performances.map(performance => (
                      <tr key={performance.id} className="tbody-tr">
                        <td className="tbody-td">{performance.take_date}</td>
                        <td className="tbody-td">{performance.tarimas_produced}</td>
                        <td className="tbody-td">{performance.lbs_bascula}</td>
                        <td className="tbody-td">{performance.lbs_teoricas}</td>
                        <td className="tbody-td">{performance.difference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-2xl uppercase mb-5">Información de tiempos muertos</h2>
              <div className="w-full p-2 h-64 overflow-y-scroll scrollbar-hide">
                <table className="table">
                  <thead>
                    <tr className="thead-tr">
                      <th className="thead-th">Tiempo Muerto</th>
                      <th className="thead-th">Fecha de Inicio</th>
                      <th className="thead-th">Fecha Final</th>
                      <th className="thead-th">Horas Totales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.data.timeouts.map(timeout => (
                      <tr key={timeout.id} className="tbody-tr">
                        <td className="tbody-td">{timeout.name}</td>
                        <td className="tbody-td">{timeout.start_date}</td>
                        <td className="tbody-td">{timeout.end_date ?? 'SIN CIERRE'}</td>
                        <td className="tbody-td">{timeout.total_hours ?? 'SIN HORAS'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full p-2 h-96 overflow-y-scroll scrollbar-hide">

          <table className="table mt-5">
            <thead>
              <tr className="thead-tr">
                <th className="thead-th">CODIGO</th>
                <th className="thead-th">NOMBRE</th>
                <th className="thead-th">POSICIÓN</th>
              </tr>
            </thead>
            <tbody>
              {task.data.employees.map((employee) => (
                <tr key={employee.code} className="tbody-tr">
                  <td className="tbody-td">{employee.code}</td>
                  <td className="tbody-td">{employee.name}</td>
                  <td className="tbody-td">{employee.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <GraphicsPlanSemanal graphData={graphData} />
        </div>
      </div>
    );
}



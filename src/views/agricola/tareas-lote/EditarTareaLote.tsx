import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { DraftTaskWeeklyPlan, TaskWeeklyPlan, WeeklyPlan } from "@/types";
import Error from "@/components/Error";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { getAllPlans } from "@/api/WeeklyPlansAPI";
import { editTask, getTask } from "@/api/TasksWeeklyPlanAPI";
import { useQueries, useMutation } from "@tanstack/react-query";

export default function EditarTareaLote() {
  const params = useParams();
  const id = params.id!!;
  const location = useLocation();
  const previousUrl = location.state?.previousUrl || "/planes-semanales";
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [task, setTask] = useState<TaskWeeklyPlan>({} as TaskWeeklyPlan);
  const [role, setRole] = useState<string>('');

  const navigate = useNavigate();
  const getUserRoleByToken = useAppStore((state) => state.getUserRoleByToken)


  const results = useQueries({
    queries: [
      { queryKey: ['getTask', id], queryFn: () => getTask(id) },
      { queryKey: ['getUserRoleByToken'], queryFn: getUserRoleByToken },
      { queryKey: ['getAllPlans'], queryFn: getAllPlans },
    ]
  });

  useEffect(() => {
    if (results[0].data) setTask(results[0].data);
    if (results[1].data) setRole(results[1].data);
    if (results[2].data) setPlans(results[2].data);
  }, [results]);

  const isLoading = results.some(result => result.isFetching);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string, data: DraftTaskWeeklyPlan }) => editTask(data, id),
    onError: () => {

    },
    onSuccess: () => {
      navigate(previousUrl);
      toast.success("Tarea Editada Correctamente");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DraftTaskWeeklyPlan>();

  useEffect(() => {
    if (task) {
      setValue("budget", task.budget);
      setValue("hours", task.hours);
      setValue("slots", task.slots);
      setValue("weekly_plan_id", task.weekly_plan_id);
    }
  }, [task]);

  const editTaskForm = async (data: DraftTaskWeeklyPlan) => mutate({ data, id });

  if (isLoading) return <Spinner />
  return (
    <>
      <h2 className="text-4xl font-bold">Editar Tarea</h2>
      <form
        className="mt-10 w-2/3 mx-auto shadow p-10 space-y-5"
        onSubmit={handleSubmit(editTaskForm)}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="budget">
            Presupuesto de la Tarea:
          </label>
          <input
            autoComplete="off"
            id="budget"
            type="number"
            placeholder={"Presupuesto de la Tarea"}
            className="border border-black p-3"
            {...register("budget", {
              required: "El presupuesto es obligatorio",
            })}
          />
          {errors.budget && (
            <Error>{errors.budget?.message?.toString()}</Error>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="hours">
            Horas Necesarias:
          </label>
          <input
            autoComplete="off"
            id="hours"
            type="number"
            placeholder={"Horas Necesarias"}
            className="border border-black p-3"
            {...register("hours", { required: "Las horas son obligatorias" })}
          />
          {errors.hours && <Error>{errors.hours?.message?.toString()}</Error>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="slots">
            Cupos:
          </label>
          <input
            autoComplete="off"
            id="slots"
            type="number"
            placeholder={"Horas Necesarias"}
            className="border border-black p-3"
            {...register("slots", { required: "Las horas son obligatorias" })}
          />
          {errors.slots && <Error>{errors.slots?.message?.toString()}</Error>}
        </div>


        <div className="flex flex-col gap-2">
          <label
            className="text-lg font-bold uppercase"
            htmlFor="weekly_plan_id"
          >
            Plan Semanal:
          </label>

          <select
            id="weekly_plan_id"
            className="border border-black p-3"
            {...register("weekly_plan_id", {
              required: "El rol es obligatorio",
            })}
          >
            <option value="">--SELECCIONE UNA OPCIÓN--</option>
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.finca} - {plan.week}
              </option>
            ))}
          </select>

          {errors.weekly_plan_id && (
            <Error>{errors.weekly_plan_id?.message?.toString()}</Error>
          )}
        </div>

        {(role === "admin" && task.end_date && task.start_date) && (
          <fieldset>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2 p-2">
                <label
                  className="text-lg font-bold uppercase"
                  htmlFor="start_date"
                >
                  Fecha de Inicio
                </label>

                <input
                  type="date"
                  {...register("start_date")}
                  className="border border-black p-2"
                />
                {errors.start_date && (
                  <Error>{errors.start_date?.message?.toString()}</Error>
                )}
              </div>

              <div className="flex flex-col gap-2 p-2">
                <label
                  className="text-lg font-bold uppercase"
                  htmlFor="start_time"
                >
                  Hora de Inicio
                </label>

                <input
                  type="time"
                  {...register("start_time")}
                  className="border border-black p-2"
                />
                {errors.start_time && (
                  <Error>{errors.start_time?.message?.toString()}</Error>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2 p-2">
                <label
                  className="text-lg font-bold uppercase"
                  htmlFor="end_date"
                >
                  Fecha de Cierre
                </label>

                <input
                  type="date"
                  {...register("end_date")}
                  className="border border-black p-2"
                />
                {errors.end_date && (
                  <Error>{errors.end_date?.message?.toString()}</Error>
                )}
              </div>

              <div className="flex flex-col gap-2 p-2">
                <label
                  className="text-lg font-bold uppercase"
                  htmlFor="end_time"
                >
                  Hora de Cierre
                </label>

                <input
                  type="time"
                  {...register("end_time")}
                  className="border border-black p-2"
                />
                {errors.end_time && (
                  <Error>{errors.end_time?.message?.toString()}</Error>
                )}
              </div>
            </div>
          </fieldset>
        )}

        <Button
          disabled={isPending}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <p className="font-bold text-lg">Guardar Cambios</p>
          )}
        </Button>
      </form>
    </>
  );
}

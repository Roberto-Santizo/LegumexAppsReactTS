import { createTaskProduction, TaskByDate } from "@/api/WeeklyProductionPlanAPI";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Spinner from "./Spinner";


type Props = {
    task: TaskByDate;
    setModalNewTask: Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
}

export type DraftTaskProduction = {
    tarimas: number;
    total_hours: number;
    operation_date: string;
    task_production_plan_id: string;
}

export default function ModalNuevaTareaProduccion({ task, setModalNewTask, modal }: Props) {
    const params = useParams();
    const plan_id = params.plan_id!!;

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createTaskProduction,
        onError: () => {
            toast.error('Hubo un error al crear la tarea');
        },
        onSuccess: () => {
            toast.success('Tarea creada correctamente');
            setModalNewTask(false);
        }
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<DraftTaskProduction>();

    const onSubmit = (data: DraftTaskProduction) => {
        data.task_production_plan_id = task.id;
        mutate(data);
        queryClient.invalidateQueries({ queryKey: ['getAllTasksForCalendar', plan_id] });
    }
    return (
        <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { setModalNewTask(false) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl sm:w-full sm:max-w-3xl">
                                <div className="flex justify-between items-center bg-indigo-600 px-6 py-4 text-white">
                                    <h3 className="text-xl font-bold uppercase">
                                        Creación de Tarea Producción {task.sku}
                                    </h3>
                                    <button
                                        className="text-white hover:text-gray-300"
                                        onClick={() => setModalNewTask(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form className="w-full mx-auto shadow p-10 space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-lg font-bold uppercase" htmlFor="total_hours">
                                            Horas:
                                        </label>
                                        <input
                                            autoComplete="off"
                                            id="total_hours"
                                            type="number"
                                            placeholder="Total de horas"
                                            className="border border-black p-3"
                                            {...register('total_hours', { required: 'El total de horas son necesarias' })}
                                        />
                                        {errors.total_hours?.message && <Error>{errors.total_hours.message.toString()}</Error>}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-lg font-bold uppercase" htmlFor="operation_date">
                                            Fecha de Operacion:
                                        </label>
                                        <input
                                            autoComplete="off"
                                            id="operation_date"
                                            type="date"
                                            className="border border-black p-3"
                                            {...register('operation_date', { required: 'La fecha de operación es necesaria' })}
                                        />
                                        {errors.operation_date?.message && <Error>{errors.operation_date.message.toString()}</Error>}
                                    </div>

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
                                            <p className="font-bold text-lg">Crear Tarea Producción</p>
                                        )}
                                    </Button>

                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

import { TaskByDate } from "@/api/WeeklyProductionPlanAPI";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import TaskLabel from "@/components/utilities-components/TaskLabel";

type Props = {
    task: TaskByDate;
    isDraggable: boolean;
}

export default function TaskProductionComponent({ task, isDraggable }: Props) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.priority,
        data: {
            type: "Task",
            task
        },
        disabled: !isDraggable
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div key={task.id} ref={setNodeRef} style={style} {...attributes} {...listeners} className={`grid grid-cols-6 shadow-xl p-10 text-xl ${!isDraggable ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="col-span-5 grid grid-cols-12">
                    <div className="col-start-2 col-span-11">
                        <TaskLabel label={"ID"} text={task.id} />
                        <TaskLabel label={"SKU"} text={task.sku} />
                        <TaskLabel label={"Linea"} text={task.line} />
                        <TaskLabel label={"Total Libras"} text={task.total_lbs.toString()} />
                        <TaskLabel label={"Horas Programadas"} text={task.hours?.toString() ?? ''} />
                        <TaskLabel label={"Fecha de Operación"} text={task.operation_date} />
                        {task.start_date && (
                            <TaskLabel label={"Fecha de Inicio"} text={task.start_date} />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`shadow-xl p-10 text-xl bg-white mb-3`} ref={setNodeRef} key={task.id} style={style}  {...attributes} {...listeners}>
            <div className="flex justify-between">
                <div className="flex-1">
                    <TaskLabel label={"ID"} text={task.id} />
                    <TaskLabel label={"SKU"} text={task.sku} />
                    <TaskLabel label={"Linea"} text={task.line} />
                    <TaskLabel label={"Total Libras"} text={task.total_lbs.toString()} />
                    <TaskLabel label={"Horas Programadas"} text={task.hours?.toString() ?? 'SIN RENDIMIENTO ASOCIADO'} />
                    <TaskLabel label={"Fecha de Operación"} text={task.operation_date} />
                    {task.start_date && (
                        <TaskLabel label={"Fecha de Inicio"} text={task.start_date} />
                    )}
                    {task.end_date && (
                        <p className="mt-5 w-1/2 button bg-green-500 text-center">Tarea Terminada</p>
                    )}
                    {(task.start_date && !task.end_date) && (
                        <p className="mt-5 w-1/2 button bg-orange-500 text-center">Tarea En Progreso</p>
                    )}
                </div>

                <div>
                    {(task.start_date && !task.end_date) && (
                        <Link to={`/planes-produccion/informacion/${task.id}`} target="_blank">
                            <Eye className="cursor-pointer hover:text-gray-500" />
                        </Link>
                    )}
                    {task.end_date && (
                        <Link to={`/planes-produccion/tarea-produccion/${task.id}`} target="_blank">
                            <Eye className="cursor-pointer hover:text-gray-500" />
                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}

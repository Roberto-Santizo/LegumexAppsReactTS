import { TaskOperationDate } from "@/api/WeeklyProductionPlanAPI";
import { BoxIcon, Calendar, File } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalChangeOperationDate from "../modals/ModalChangeOperationDate";
import ModalEntregaMaterialEmpaque from "../modals/ModalEntregaMaterialEmpaque";

type Props = {
    task: TaskOperationDate;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<TaskOperationDate['id']>>;
}

export default function TaskScheduled({ task, selectedId, setSelectedId }: Props) {
    const [modal, setModal] = useState<boolean>(false);
    const [modalEntrega, setModalEntrega] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 transition hover:shadow-lg">
            <div className="p-6 space-y-3 text-gray-700">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p><span className="font-semibold text-gray-900">SKU:</span> {task.sku}</p>
                        <p><span className="font-semibold text-gray-900">Producto:</span> {task.product}</p>
                        <p><span className="font-semibold text-gray-900">Línea:</span> {task.line}</p>
                        <p><span className="font-semibold text-gray-900">Total libras:</span> {task.total_lbs}</p>
                        <p><span className="font-semibold text-gray-900">Destino:</span> {task.destination}</p>
                    </div>
                    <div>
                        <span className={`inline-block rounded-full text-xs px-3 py-1 font-semibold ${task.color} bg-opacity-10 border ${task.color.replace("text-", "border-")}`}>
                            {task.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-2">
                {!task.finished && !task.working && task.status_id === '0' && (
                    <button
                        onClick={() => {
                            setSelectedId(task.id);
                            setModal(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:shadow-sm"
                    >
                        <Calendar className="w-4 h-4" />
                        Cambiar fecha de operación
                    </button>
                )}

                {task.status_id === '0' && (
                    <>
                        {task.recipe.length > 0 ? (
                            <button
                                onClick={() => {
                                    setModalEntrega(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:shadow-sm"
                            >
                                <BoxIcon className="w-4 h-4" />
                                Entregar Material de Empaque
                            </button>
                        ) : (
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:shadow-sm"
                                onClick={() => navigate('/material-empaque-transacciones/crear', { state: { task_production_plan_id: task.id, url: location.pathname + location.search } })}
                            >
                                <File className="w-4 h-4" />
                                Creación de Entrega Empaque
                            </button>
                        )}

                    </>
                )}
            </div>

            <ModalChangeOperationDate
                modal={modal}
                setModal={setModal}
                selectedId={selectedId}
            />

            {task.recipe?.length > 0 && (
                <ModalEntregaMaterialEmpaque
                    modal={modalEntrega}
                    setModal={setModalEntrega}
                    task={task}
                />
            )}

        </div>
    );
}

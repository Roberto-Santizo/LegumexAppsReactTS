import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { EmployeeProduction, getTaskProductionDetails, TaskProductionDetails } from "@/api/WeeklyProductionPlanAPI";
import { getComodines } from "@/api/WeeklyProductionPlanAPI";
import { formatDate } from "@/helpers";
import Spinner from "@/components/Spinner";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ColumnContainer from "@/components/ColumnContainer";
import { createPortal } from "react-dom";
import EmployeeDraggable from "@/components/EmployeeDraggable";
import ModalChangeEmployee from "@/components/ModalChangeEmployee";

export type Column = {
    id: string,
    title: string
}

const initialValues = [
    { id: '1', title: 'fijos' },
    { id: '2', title: 'comodines' },
]

export default function ShowTaskProductionDetails() {
    const params = useParams();
    const task_p_id = params.task_p_id!!;

    const [columns] = useState<Column[]>(initialValues);
    const [modal, setModal] = useState<boolean>(false);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeEmployee, setActiveEmployee] = useState<EmployeeProduction | null>(null);
    const [taskData, setTaskData] = useState<TaskProductionDetails>();
    const [employees, setEmployees] = useState<EmployeeProduction[]>([]);
    const [availableEmployees, setAvailableEmployees] = useState<EmployeeProduction[]>([]);

    const columnsId = useMemo(() => {
        return columns.map(column => column.id)
    }, [columns]);

    const results = useQueries({
        queries: [
            { queryKey: ['getTaskProductionDetails', task_p_id], queryFn: () => getTaskProductionDetails(task_p_id) },
            { queryKey: ['getComodines'], queryFn: getComodines },
        ]
    });

    useEffect(() => {
        if (results[0]?.data) {
            setTaskData(results[0].data);
        }
    }, [results[0]?.data]);

    useEffect(() => {
        if (results[0]?.data) {
            setEmployees(prev => [...prev, ...(results[0].data?.employees ?? [])]);
            setAvailableEmployees(prev => [...prev, ...(results[0].data?.employees ?? [])]);
        }
    }, [results[0]?.data]);

    useEffect(() => {
        if (results[1]?.data) {
            setEmployees(prev => [...prev, ...(results[1].data ?? [])]);
        }
    }, [results[1]?.data]);

    useEffect(() => {
        setAvailableEmployees(employees.filter(employee => employee.column_id === '1'));
    }, [employees]);


    const onDragEnd = (event: DragOverEvent) => {
        setActiveColumn(null);
        setActiveEmployee(null);

        const { active, over } = event;

        if (!over || !active) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveEmployee = active.data.current?.type === "Employee";
        const isOverEmployee = over.data.current?.type === "Employee";

        if (isOverEmployee && isActiveEmployee) {
            const newEmployees = () => {
                const activeIndex = employees.findIndex(emp => emp.id === activeId);
                const overIndex = employees.findIndex(emp => emp.id === overId);
                return arrayMove(employees, activeIndex, overIndex);
            }
            const updatedEmployees = newEmployees();
            setEmployees(updatedEmployees);
        }

        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveEmployee && isOverAColumn) {
            const activeIndex = employees.findIndex(emp => emp.id === activeId);
            setActiveEmployee(employees[activeIndex]);
            setModal(true);
        }
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
        }

        if (event.active.data.current?.type === "Employee") {
            setActiveEmployee(event.active.data.current.employee);
        }
    }

    // const onDragOver = (event: DragOverEvent) => {
    //     const { active, over } = event;

    //     if (!over || !active) return;

    //     const activeId = active.id;
    //     const overId = over.id;

    //     if (activeId === overId) return;

    //     const isActiveEmployee = active.data.current?.type === "Employee";
    //     const isOverEmployee = over.data.current?.type === "Employee";

    //     if (!isActiveEmployee) return;

    //     if (isActiveEmployee && isOverEmployee) {
    //         // setEmployees(employees => {
    //             const activeIndex = employees.findIndex(t => t.id === activeId);
    //             const overIndex = employees.findIndex(t => t.id === overId);

    //             if(employees[activeIndex].column_id != employees[overIndex].column_id){
    //                 setModal(true);
    //             }

    //              employees[activeIndex].column_id = employees[overIndex].column_id;


    //              return arrayMove(employees, activeIndex, overIndex);
    //         // });
    //     }

    //     const isOverAColumn = active.data.current?.type === "Column";

    //     if (isActiveEmployee && isOverAColumn) {
    //         setEmployees(employees => {
    //             const activeIndex = employees.findIndex(t => t.id === activeId);
    //             employees[activeIndex].column_id = overId as string;
    //             return arrayMove(employees, activeIndex, activeIndex);
    //         });
    //     }

    // }

    const isLoading = results.some(result => result.isLoading);
    if (isLoading) return <Spinner />

    return (
        <div className="space-y-10">
            <h1 className="font-bold text-4xl">Información</h1>
            <div className="p-5 shadow-xl">
                <div className="font-bold">Línea: <span className="font-normal ml-2">{taskData?.line ?? 'N/A'}</span></div>
                <div className="font-bold">Fecha de operación:<span className="font-normal ml-2">{taskData?.operation_date ? formatDate(taskData.operation_date) : 'N/A'}</span></div>
                <div className="font-bold">Total de tarimas:<span className="font-normal ml-2">{taskData?.total_tarimas ?? 0}</span></div>
                <div className="font-bold">SKU:<span className="font-normal ml-2">{taskData?.sku?.code ?? 'N/A'}</span></div>
                <div className="font-bold">Descripción:<span className="font-normal ml-2">{taskData?.sku?.name ?? 'N/A'}</span></div>
                <div className="font-bold">Empleados asignados:<span className="font-normal ml-2">{taskData?.employees?.length ?? 0}</span></div>
            </div>

            <div className="flex justify-between w-full mx-auto gap-5">
                <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
                    <SortableContext items={columnsId}>
                        {columns.map(column => (
                            <ColumnContainer key={column.id} column={column} employees={employees.filter(employee => employee.column_id === column.id)} />
                        ))}
                    </SortableContext>

                    {createPortal(
                        <DragOverlay>
                            {activeColumn && (
                                <ColumnContainer column={activeColumn} employees={employees.filter(employee => employee.column_id === activeColumn.id)} />
                            )}

                            {activeEmployee && (
                                <EmployeeDraggable employee={activeEmployee} />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>

            {(modal && activeEmployee) && (
                <ModalChangeEmployee modal={modal} setModal={setModal} employee={activeEmployee} availableEmployees={availableEmployees} setEmployees={setEmployees} />
            )}
        </div>
    );
}


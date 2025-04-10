import clienteAxios from "@/config/axios";
import { z } from 'zod';
import { SKUSchema } from "./SkusAPI";
import { DraftChangePosition } from "@/components/modals/ModalChangeEmployee";
import { DraftPerformance } from "@/components/modals/ModalTomaRendimientoProduccion";
import { DraftCloseTask } from "@/components/modals/ModalCierreTareaProduccion";
import { Linea, PositionSchema } from "./LineasAPI";
import { DraftNewTaskProduction } from "@/components/modals/ModalCrearTareaProduccion";
import { isAxiosError } from "axios";
import { ReportSchema } from "@/utils/reports-schema";
import { downloadBase64File } from "@/helpers";
import { DraftNote } from "@/components/modals/ModalNotasProblemas";
import { DraftTaskProductionEmployee } from "@/components/modals/ModalAddEmployee";
import { DraftChangeOperationDate } from "@/components/modals/ModalChangeOperationDate";

const WeeklyPlanProductionPlanSchema = z.object({
    id: z.string(),
    week: z.number(),
    year: z.number(),
    completed: z.boolean()
});

export type WeeklyPlanProductionPlan = z.infer<typeof WeeklyPlanProductionPlanSchema>

const PaginatedWeeklyProductionPlansSchema = z.object({
    data: z.array(WeeklyPlanProductionPlanSchema),
    meta: z.object({
        last_page: z.number(),
        current_page: z.number()
    })

});

export type PaginatedWeeklyProductionPlans = z.infer<typeof PaginatedWeeklyProductionPlansSchema>

export async function getPaginatedWeeklyProductionPlans(page: number): Promise<PaginatedWeeklyProductionPlans> {
    try {
        const url = `/api/weekly_production_plan?page=${page}`;
        const { data } = await clienteAxios(url);
        const result = PaginatedWeeklyProductionPlansSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const LineWeeklyPlanSchema = z.object({
    id: z.string(),
    line: z.string(),
    status: z.boolean(),
    total_employees: z.number(),
    assigned_employees: z.number()
});

export const LinesWeeklyPlanSchema = z.object({
    data: z.array(LineWeeklyPlanSchema)
});

export type LineWeeklyPlan = z.infer<typeof LineWeeklyPlanSchema>

export async function getWeeklyPlanDetails(id: WeeklyPlanProductionPlan['id']): Promise<LineWeeklyPlan[]> {
    try {
        const url = `/api/weekly_production_plan/${id}`;
        const { data } = await clienteAxios(url);
        const result = LinesWeeklyPlanSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const TaskProductionSchema = z.object({
    id: z.string(),
    line: z.string(),
    sku: z.string(),
    total_tarimas: z.number(),
    finished_tarimas: z.number(),
    operation_date: z.string(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    hours: z.number(),
    total_hours: z.number(),
    total_employees: z.number(),
    total_in_employees: z.number(),
    priority: z.number(),
    available: z.boolean(),
    paused: z.boolean()
});

export const TasksProductionSchema = z.object({
    data: z.array(TaskProductionSchema)
});

export type TaskProduction = z.infer<typeof TaskProductionSchema>

export async function getWeeklyPlanLineDetails(line_id: Linea['id'], weekly_production_plan_id: WeeklyPlanProductionPlan['id'], date: string): Promise<TaskProduction[]> {
    try {
        const url = `/api/weekly_production_plan/details/${weekly_production_plan_id}/${line_id}?date=${date}`;
        const { data } = await clienteAxios(url);
        console.log(date);
        const result = TasksProductionSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const EmployeeTaskProductionSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    position: z.string(),
    column_id: z.string(),
    active: z.number(),
});

export const TaskProductionDetailSchema = z.object({
    id: z.string(),
    line: z.string(),
    operation_date: z.string(),
    total_lbs: z.number(),
    sku: SKUSchema,
    flag: z.boolean(),
    employees: z.array(EmployeeTaskProductionSchema),
    positions: z.array(PositionSchema)
});

export type EmployeeProduction = z.infer<typeof EmployeeTaskProductionSchema>
export type TaskProductionDetails = z.infer<typeof TaskProductionDetailSchema>

export async function getTaskProductionDetails(id: TaskProduction['id']): Promise<TaskProductionDetails> {
    try {
        const url = `/api/task_production_plan/${id}`;
        const { data } = await clienteAxios(url);
        const result = TaskProductionDetailSchema.safeParse(data.data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const EmployeeComodinSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    position: z.string(),
    column_id: z.string(),
    active: z.number()
});

export const EmployeesComodinesSchema = z.object({
    data: z.array(EmployeeComodinSchema)
});

export type EmployeeComodin = z.infer<typeof EmployeeComodinSchema>

export async function getComodines(): Promise<EmployeeComodin[]> {
    try {
        const url = '/api/employees-comodines';
        const { data } = await clienteAxios(url);
        const result = EmployeesComodinesSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createProductionPlan(file: File[]) {
    try {
        const url = '/api/weekly_production_plan';
        const formData = new FormData();
        formData.append("file", file[0]);

        const { data } = await clienteAxios.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export async function createAssigmentsProductionTasks({ file, id }: { file: File[], id: LineWeeklyPlan['id'] }) {
    try {
        const url = `/api/weekly_production_plan/assign/${id}`;
        const formData = new FormData();
        formData.append("file", file[0]);

        const { data } = await clienteAxios.post<string>(url, formData);
        return data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export async function changePosition(data: DraftChangePosition) {
    try {
        const url = '/api/tasks_production_plan/change-assignment';
        await clienteAxios.post(url, data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function startTaskProduction(id: TaskProduction['id']) {
    try {
        const url = `/api/tasks_production_plan/${id}/start`;
        await clienteAxios.patch(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const TimeoutTaskProductionSchema = z.object({
    id: z.string(),
    name: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable(),
    total_hours: z.number().nullable()
});

export const PerformanceTaskProductionSchema = z.object({
    id: z.string(),
    take_date: z.string(),
    tarimas_produced: z.number().nullable(),
    lbs_bascula: z.number(),
    lbs_teoricas: z.number(),
    difference: z.number()
});


export const AssignedEmployeeTaskProductionSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    position: z.string()
});

export const TaskProductionInProgressSchema = z.object({
    data: z.object({
        line: z.string(),
        sku: z.string(),
        start_date: z.string(),
        HPlan: z.number(),
        HLinea: z.number(),
        HRendimiento: z.number(),
        HTiemposMuertos: z.number(),
        employees: z.array(AssignedEmployeeTaskProductionSchema),
        performances: z.array(PerformanceTaskProductionSchema),
        timeouts: z.array(TimeoutTaskProductionSchema)
    })
})

export type TaskProductionInProgress = z.infer<typeof TaskProductionInProgressSchema>


export async function getTaskProductionInProgressDetail(id: TaskProduction['id']): Promise<TaskProductionInProgress> {
    try {
        const url = `/api/tasks_production_plan/details/${id}`;
        const { data } = await clienteAxios(url);
        const result = TaskProductionInProgressSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function createTaskProductionPerformance(id: TaskProduction['id'], FormData: DraftPerformance) {
    try {
        const url = `/api/tasks_production_plan/${id}/performance`;
        const { data } = await clienteAxios.post<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export async function closeTaskProduction(id: TaskProduction['id'], FormData: DraftCloseTask) {
    try {
        const url = `/api/tasks_production_plan/${id}/end`;
        const { data } = await clienteAxios.patch<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export async function createNewTaskProduction(FormData: DraftNewTaskProduction) {
    try {
        const url = '/api/tasks_production_plan/new-task';
        const { data } = await clienteAxios.post<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg)
        }
    }
}


export async function changeTasksPriority(data: string[]) {
    try {
        const url = '/api/tasks_production_plan/change-priority';
        await clienteAxios.put(url, {
            data: data
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const TaskForCalendarSchema = z.object({
    id: z.string(),
    title: z.string(),
    start: z.string(),
    total_hours: z.number(),
    priority: z.string(),
    backgroundColor: z.string(),
    editable: z.boolean(),
    line_id: z.string()
});

export const TasksForCalendarSchema = z.object({
    data: z.array(TaskForCalendarSchema)
});

export type TaskForCalendar = z.infer<typeof TaskForCalendarSchema>;

export async function getAllTasksForCalendar(id: WeeklyPlanProductionPlan['id']): Promise<TaskForCalendar[]> {
    try {
        const url = `/api/weekly_production_plan/details/${id}`;
        const { data } = await clienteAxios(url);
        const result = TasksForCalendarSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateTaskProductionOperationDate({ id, FormData }: { id: TaskProduction['id'], FormData: DraftChangeOperationDate }) {
    try {
        const url = `/api/tasks_production_plan/change-operation-date/${id}`;
        await clienteAxios.patch(url, FormData);
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg)
        }
    }
}

export const TaskByDateSchema = z.object({
    id: z.string(),
    line: z.string(),
    sku: z.string(),
    total_lbs: z.number(),
    finished_tarimas: z.number(),
    operation_date: z.string(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    hours: z.number().nullable(),
    priority: z.number(),
    line_id: z.string(),
    isDraggable: z.boolean()
});

export const SummaryHoursByLineSchema = z.object({
    line: z.string(),
    total_hours: z.number(),
    id: z.string()
});

export const TasksByDateSchema = z.object({
    summary: z.array(SummaryHoursByLineSchema),
    data: z.array(TaskByDateSchema)
})

export type TaskByDate = z.infer<typeof TaskByDateSchema>;
export type InfoTasksByDate = z.infer<typeof TasksByDateSchema>;

export async function getTasksProductionByDate(id: WeeklyPlanProductionPlan['id'], date: string): Promise<InfoTasksByDate> {
    try {
        const url = `api/weekly_production_plan/details-by-date/${id}?date=${date}`;
        const { data } = await clienteAxios(url);
        const result = TasksByDateSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const TaskByLineSchema = z.object({
    id: z.string(),
    line: z.string(),
    sku: z.string(),
    product: z.string(),
    total_lbs: z.number(),
    operation_date: z.string(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    hours: z.number().nullable(),
    total_hours: z.number(),
    total_in_employees: z.number(),
    total_employees: z.number(),
    priority: z.number(),
    available: z.boolean(),
    paused: z.boolean(),
    is_minimum_requrire: z.boolean().nullable(),
    is_justified: z.boolean().nullable()
});

export const TasksByLineSchema = z.object({
    data: z.array(TaskByLineSchema)
});

export type TaskByLine = z.infer<typeof TaskByLineSchema>;

export async function getTasksByLineId(plan_id: WeeklyPlanProductionPlan['id'], line_id: Linea['id']): Promise<TaskByLine[]> {
    try {
        const url = `/api/weekly_production_plan/details/${plan_id}/${line_id}`;
        const { data } = await clienteAxios(url);
        const result = TasksByLineSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function downloadPlanillaProduction({ plan_id, line_id }: { plan_id: WeeklyPlanProductionPlan['id'], line_id: Linea['id'] }) {
    try {
        const url = `/api/report-production/${plan_id}/${line_id}`;
        const { data } = await clienteAxios.post(url);
        const result = ReportSchema.safeParse(data);
        if (result.success) {
            downloadBase64File(result.data.file, result.data.fileName)
        } else {
            throw new Error('Información no válida');
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export async function createTaskProductionNote(FormData: DraftNote) {
    try {
        const url = '/api/notes';
        const { data } = await clienteAxios.post<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.message);
        }
    }
}


export const HoursByDateSchema = z.object({
    date: z.string(),
    total_hours: z.number(),
    line_id: z.string()
});

export const HoursByDatesSchema = z.object({
    data: z.array(HoursByDateSchema)
})

export type HoursByDate = z.infer<typeof HoursByDateSchema>;

export async function getTotalHoursByDate(plan_id: WeeklyPlanProductionPlan['id']): Promise<HoursByDate[]> {
    try {
        const url = `/api/weekly_production_plan/hours-by-date/${plan_id}`;
        const { data } = await clienteAxios(url);
        const result = HoursByDatesSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createTaskProductionEmployee({ id, FormData }: { id: TaskProduction['id'], FormData: DraftTaskProductionEmployee }) {
    try {
        const url = `/api/tasks_production_plan/create-assignee/${id}`;
        const { data } = await clienteAxios.post<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.msg);
        }
    }
}

export const SummaryGraphHoursByTaskProductionSchema = z.object({
    HPlan: z.number(),
    HLinea: z.number(),
    HRendimiento: z.number(),
    HTiemposMuertos: z.number()
});

export const NoteTaskProductionSchema = z.object({
    reason: z.string(),
    action: z.string(),
    user: z.string(),
});

export const BitacoraTaskProductionEmployeeSchema = z.object({
    id: z.string(),
    original_name: z.string(),
    original_position: z.string()
});

export const TaskProductionEmployeeSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    position: z.string(),
    bitacoras: z.array(BitacoraTaskProductionEmployeeSchema)
});

export const HistoryOperationDateSchema = z.object({
    id: z.string(),
    user: z.string(),
    reason: z.string(),
    original_date: z.string(),
    new_date: z.string(),
    created_at: z.string()
});

export const FinishedTaskProductionDetailsSchema = z.object({
    id: z.string(),
    line: z.string(),
    sku: z.string(),
    sku_description: z.string(),
    client: z.string(),
    total_lbs: z.number(),
    total_lbs_produced: z.number(),
    total_lbs_bascula: z.number(),
    destination: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    max_value: z.number(),
    is_minimum_require: z.boolean(),
    summary: SummaryGraphHoursByTaskProductionSchema,
    note: NoteTaskProductionSchema.nullable(),
    timeouts: z.array(TimeoutTaskProductionSchema),
    employees: z.array(TaskProductionEmployeeSchema),
    history_operation_date: z.array(HistoryOperationDateSchema),
});

export type FinishedTaskProductionDetails = z.infer<typeof FinishedTaskProductionDetailsSchema>;
export type TaskProductionEmployee = z.infer<typeof TaskProductionEmployeeSchema>;
export type HistoryOperationDate = z.infer<typeof HistoryOperationDateSchema>;
export type NoteTaskProduction = z.infer<typeof NoteTaskProductionSchema>;

export async function getFinishedTaskProductionDetails(id: TaskProduction['id']): Promise<FinishedTaskProductionDetails> {
    try {
        const url = `/api/tasks_production_plan/finished/details/${id}`;
        const { data } = await clienteAxios(url);
        const result = FinishedTaskProductionDetailsSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no valida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

import clienteAxios from "@/config/axios";
import { ReportSchema } from "@/utils/reports-schema";
import { downloadBase64File } from "@/helpers";
import { FiltersPlanSemanalType } from "@/views/agricola/planes-semanales/IndexPlanSemanal";
import { z } from "zod";
import { TaskInsumoSchema } from "@/utils/taskWeeklyPlan-schema";
import { isAxiosError } from "axios";

export async function createPlan(file: File[]) {
    try {
        const url = '/api/plans';
        const formData = new FormData();
        formData.append("file", file[0]);

        const { data } = await clienteAxios.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.data.errors) {
                throw new Error(Object.values(error.response?.data?.errors || {}).flat().join('\n'));
            } else if (error.response?.data.msg) {
                throw new Error(error.response.data.msg);

            }
        }
    }
}

export const WeeklyPlanSchema = z.object({
    id: z.string(),
    year: z.number(),
    week: z.number(),
    finca: z.string(),
    finca_id: z.string(),
    created_at: z.string(),
    total_budget: z.number(),
    used_budget: z.number(),
    total_budget_ext: z.number(),
    used_total_budget_ext: z.number(),
    total_tasks: z.number(),
    finished_total_tasks: z.number(),
    total_tasks_crop: z.number(),
    finished_total_tasks_crops: z.number()

});

export const SummaryWeeklyPlanSchema = z.object({
    data: z.object({
        id: z.string(),
        finca: z.string(),
        week: z.number(),
        year: z.number(),
        summary_tasks: z.array(z.object({
            lote: z.string(),
            total_budget: z.number(),
            lote_plantation_control_id: z.string(),
            total_workers: z.number(),
            total_hours: z.number(),
            total_tasks: z.number(),
            finished_tasks: z.number()

        })),
        summary_crops: z.array(z.object({
            id: z.string(),
            lote_plantation_control_id: z.string(),
            lote: z.string()
        }))
    })

});

export const WeeklyPlansPaginateSchema = z.object({
    data: z.array(WeeklyPlanSchema),
    meta: z.object({
        last_page: z.number(),
        current_page: z.number()
    }).optional()
});

export const WeeklyPlansSchema = z.object({
    data: z.array(WeeklyPlanSchema),
});

export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>
export type WeeklyPlans = z.infer<typeof WeeklyPlansSchema>
export type WeeklyPlansPaginate = z.infer<typeof WeeklyPlansPaginateSchema>
export type SummaryWeeklyPlan = z.infer<typeof SummaryWeeklyPlanSchema>

export async function getWeeklyPlans({ page, filters, paginated }: { page: number, filters: FiltersPlanSemanalType, paginated: string }): Promise<WeeklyPlansPaginate> {
    try {
        const url = `/api/plans?paginated=${paginated}&page=${page}&finca_id=${filters.finca_id}&week=${filters.week}&year=${filters.year}`;
        const { data } = await clienteAxios(url);
        const result = WeeklyPlansPaginateSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error('Error datos no válidos');
        }
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export async function getPlanById(id: WeeklyPlan['id']): Promise<SummaryWeeklyPlan> {
    try {
        const url = `/api/plans/${id}`;
        const { data } = await clienteAxios(url);
        const result = SummaryWeeklyPlanSchema.safeParse(data);

        if (result.success) {
            return result.data
        } else {
            throw new Error('Los datos no son validos');
        }
    } catch (error) {
        throw error;
    }
}

export const TaskWeeklyPlanByDateSchema = z.object({
    id: z.string(),
    lote: z.string(),
    task: z.string(),
    operation_date: z.string(),
    status: z.boolean(),
    insumos: z.array(TaskInsumoSchema)
});

export const TasksWeeklyPlanByDateSchema = z.object({
    data: z.array(TaskWeeklyPlanByDateSchema)
});

export type TaskWeeklyPlanByDate = z.infer<typeof TaskWeeklyPlanByDateSchema>;

export async function getTasksByDate({ id, date, loteId, taskId }: { id: WeeklyPlan['id'], date: string, loteId: string, taskId: string }): Promise<TaskWeeklyPlanByDate[]> {
    try {
        const url = `/api/plans/tasks-planned-by-date/finca?weekly_plan=${id}&date=${date}&lote=${loteId}&task=${taskId}`;
        const { data } = await clienteAxios.get(url);
        const result = TasksWeeklyPlanByDateSchema.safeParse(data);
        if (result.success) {
            return result.data.data;
        } else {
            throw new Error("Información no válida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function downloadWeeklyPlanReport(weekly_plans_ids: WeeklyPlan['id'][]): Promise<void> {
    try {
        const url = '/api/report/plans';
        const { data } = await clienteAxios.post(url, {
            data: weekly_plans_ids
        });

        const result = ReportSchema.safeParse(data);
        if (result.success) {
            downloadBase64File(result.data.file, result.data.fileName)
        } else {
            throw new Error('Información no válida');
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.data.msg) {
                throw new Error(error.response.data.msg);
            } else if (error.response?.data.errors) {
                throw new Error(Object.values(error.response?.data?.errors || {}).flat().join('\n'));
            }
        }
    }
}

export async function downloadReportInsumos(weekly_plan_id: WeeklyPlan['id']): Promise<void> {
    try {
        const url = `/api/report/insumos/${weekly_plan_id}`;
        const { data } = await clienteAxios(url);
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

export async function downloadReportPlanilla(weekly_plan_id: WeeklyPlan['id']): Promise<void> {
    try {
        const url = `/api/report/planilla/${weekly_plan_id}`;
        const { data } = await clienteAxios(url);
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
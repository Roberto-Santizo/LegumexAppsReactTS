import clienteAxios from "@/config/axios";
import { DraftProducer } from "@/views/calidad/productores/CreateProducer";
import { isAxiosError } from "axios";
import { z } from "zod";

export async function createProducer(FormData: DraftProducer) {
    try {
        const url = '/api/producers';
        const { data } = await clienteAxios.post<string>(url, FormData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(Object.values(error.response?.data?.errors || {}).flat().join('\n'));
        }
    }
}

export const ProducerSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string()
});

export type Producer = z.infer<typeof ProducerSchema>

export const ProducersPaginateSchema = z.object({
    data: z.array(ProducerSchema),
    meta: z.object({
        last_page: z.number(),
        current_page: z.number()
    })
});

export type ProducersPaginate = z.infer<typeof ProducersPaginateSchema>


export async function getPaginatedProducers(page: number): Promise<ProducersPaginate> {
    try {
        const url = `/api/producers?page=${page}`;
        const { data } = await clienteAxios(url);
        const result = ProducersPaginateSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error("Información no válida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const ProducersSchema = z.object({
    data: z.array(ProducerSchema)
});

export async function getAllProducers(): Promise<Producer[]> {
    try {
        const url = '/api/producers-all';
        const { data } = await clienteAxios(url);
        const result = ProducersSchema.safeParse(data);
        if (result.success) {
            return result.data.data
        } else {
            throw new Error("Información no válida");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
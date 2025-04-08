import { z } from "zod";
import { CDP, loteCDPDetails } from "@/types";
import { LoteCDPDetailsSchema } from "@/utils/loteCDPDetails-schema";
import { CDPsSchema } from "@/utils/plantation-schema";
import { DraftLote } from "@/views/agricola/lotes/CreateLote";
import { isAxiosError } from "axios";
import { Finca } from "./FincasAPI";
import clienteAxios from "@/config/axios";

export async function createLote(draftlote: DraftLote) {
    try {
        const url = '/api/lotes';
        const { data } = await clienteAxios.post<string>(url, draftlote);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(Object.values(error.response?.data?.errors || {}).flat().join('\n'));
        }
    }
}

export const LoteSchema = z.object({
    id: z.string(),
    name: z.string(),
    finca: z.string(),
    cdp: z.string()
});

export type Lote = z.infer<typeof LoteSchema>

export const LotesPaginateSchema = z.object({
    data: z.array(LoteSchema),
    meta: z.object({
        last_page: z.number(),
        current_page: z.number()
    })
});

export type PaginatedLotes = z.infer<typeof LotesPaginateSchema>


export async function getPaginatedLotes(page: number): Promise<PaginatedLotes> {
    try {
        const url = `/api/lotes?page=${page}`;
        const { data } = await clienteAxios(url)
        const result = LotesPaginateSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error('Información no válida');
        }
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export const LotesSchema = z.object({
    data: z.array(LoteSchema)
});


export async function getAllLotes(): Promise<Lote[]> {
    try {
        const url = '/api/lotes-all';
        const { data } = await clienteAxios(url);
        const result = LotesSchema.safeParse(data);
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

export const LotesSchemaSelect = z.object({
    data: z.array(LoteSchema)
});

export async function getAllLotesByFincaId(id: Finca['id']): Promise<Lote[]> {
    try {
        const url = `/api/lotes/finca/${id}`;
        const { data } = await clienteAxios(url);
        const result = LotesSchemaSelect.safeParse(data);
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

export async function getAllCdpsByLoteId(id: Lote['id']): Promise<CDP[]> {
    try {
        const url = `/api/cdps/lote/${id}`;
        const { data } = await clienteAxios(url);
        const result = CDPsSchema.safeParse(data);
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

export async function getCDPInfoByCDPId(lote_plantation_control_id: CDP['id']): Promise<loteCDPDetails> {
    try {
        const url = '/api/cdp/info';
        const { data } = await clienteAxios(url, {
            params: { lote_plantation_control_id }
        })
        const result = LoteCDPDetailsSchema.safeParse(data);
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

export async function updateLotes(file: File[]) {
    try {
        const url = '/api/lotes-all/update';
        const formData = new FormData();
        formData.append("file", file[0]);
        const { data } = await clienteAxios.post<string>(url, formData);
        return data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw new Error(Object.values(error.response?.data?.errors || {}).flat().join('\n'));
        }
    }
}

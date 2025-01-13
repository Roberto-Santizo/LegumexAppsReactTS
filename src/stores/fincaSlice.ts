import { StateCreator } from "zustand"
import clienteAxios from "../config/axios";
import { Finca } from "../types";
import { Fincas } from "../utils/fincas-schema";

export type FincaSliceType = {
    fincas: Finca[];

    loadingFetchFincas: boolean;
    errorFetchFincas: boolean;

    fetchFincas: () => Promise<void>;
}

export const createFincaSlice: StateCreator<FincaSliceType> = (set) => ({
    fincas: [],
    loadingFetchFincas: false,
    errorFetchFincas: false,

    fetchFincas: async () => {
        set({loadingFetchFincas: true});

        try {
            const url = 'http://127.0.0.1:8000/api/fincas';
            const { data } = await clienteAxios(url,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('AUTH_TOKEN')}`
                }
            })
            const result = Fincas.safeParse(data);
            if(result.success){
                set({loadingFetchFincas: false, errorFetchFincas:false, fincas: result.data.data })
            }
        } catch (error) {
            set({loadingFetchFincas: false, errorFetchFincas:true })
        }
    }

})
import { getAllClients } from "@/api/ClientsAPI";
import { getAllLines } from "@/api/LineasAPI";
import { getAllSkus } from "@/api/SkusAPI";
import { useQueries, useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createLineaSku } from "@/api/LineasSkuAPI";
import Select from "react-select";
import Error from "@/components/Error";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export type DraftLineaSku = {
    sku_id: string;
    line_id: string;
    client_id: string;
    lbs_performance: number;
}

export default function CrearLineaSku() {
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createLineaSku,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                const errors = Object.values(error.response.data.errors).flat().join('\n');
                toast.error(errors);
            }
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/lineas-skus');
        }
    });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<DraftLineaSku>();

    const results = useQueries({
        queries: [
            { queryKey: ['getAllSkus'], queryFn: getAllSkus },
            { queryKey: ['getAllLines'], queryFn: getAllLines },
            { queryKey: ['getAllClients'], queryFn: getAllClients },
        ]
    });

    const onSubmit = (data: DraftLineaSku) => mutate(data);
    if (results) return (
        <div>
            <h2 className="font-bold text-4xl">Relacionar Linea a SKU</h2>

            <form className="mt-10 w-2/3 mx-auto space-y-5 p-10 shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="text-lg font-bold uppercase" htmlFor="sku_id">
                        SKU:
                    </label>
                    <Controller
                        name="sku_id"
                        control={control}
                        rules={{ required: "Seleccione un transportista" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={results[0].data}
                                id="sku_id"
                                placeholder={"--SELECCIONE UNA OPCION--"}
                                className="border border-black"
                                onChange={(selected) => field.onChange(selected?.value)}
                                value={results[0].data?.find(
                                    (option) => option.value === field.value
                                )}
                            />
                        )}
                    />
                    {errors.sku_id && <Error>{errors.sku_id?.message?.toString()}</Error>}
                </div>

                <div>
                    <label className="text-lg font-bold uppercase" htmlFor="line_id">
                        Linea:
                    </label>
                    <Controller
                        name="line_id"
                        control={control}
                        rules={{ required: "Seleccione una linea" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={results[1].data}
                                id="line_id"
                                placeholder={"--SELECCIONE UNA OPCION--"}
                                className="border border-black"
                                onChange={(selected) => field.onChange(selected?.value)}
                                value={results[1].data?.find(
                                    (option) => option.value === field.value
                                )}
                            />
                        )}
                    />
                    {errors.line_id && <Error>{errors.line_id?.message?.toString()}</Error>}
                </div>

                <div>
                    <label className="text-lg font-bold uppercase" htmlFor="client_id">
                        Cliente:
                    </label>
                    <Controller
                        name="client_id"
                        control={control}
                        rules={{ required: "Seleccione un cliente" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={results[2].data}
                                id="client_id"
                                placeholder={"--SELECCIONE UNA OPCION--"}
                                className="border border-black"
                                onChange={(selected) => field.onChange(selected?.value)}
                                value={results[2].data?.find(
                                    (option) => option.value === field.value
                                )}
                            />
                        )}
                    />
                    {errors.client_id && <Error>{errors.client_id?.message?.toString()}</Error>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold uppercase" htmlFor="lbs_performance">
                        Libras/Horas:
                    </label>
                    <input
                        autoComplete="off"
                        id="lbs_performance"
                        type="number"
                        placeholder={"Rendiento en lbs"}
                        className="border border-black p-3"
                        {...register("lbs_performance", {
                            required: "El rendimiento es requerido",
                            min: { value: 0, message: 'El valor debe de ser mayor a 0' }
                        })}
                    />
                    {errors.lbs_performance && <Error>{errors.lbs_performance?.message?.toString()}</Error>}
                </div>


                <button className="button bg-indigo-500 hover:bg-indigo-600 w-full">
                    Relacionar Linea
                </button>
            </form>
        </div>
    )
}

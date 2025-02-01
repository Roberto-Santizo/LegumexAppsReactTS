import { Button } from "@mui/material";
import { useState } from "react";
import { DraftInsumo } from "../../../types";
import Spinner from "../../../components/Spinner";
import { useForm } from "react-hook-form";
import Error from "../../../components/Error";
import { useAppStore } from "../../../stores/useAppStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CrearInsumo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const insumosErrors = useAppStore((state) => state.insumosErrors);
  const createInsumo = useAppStore((state) => state.createInsumo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftInsumo>();

  const handleCreateInsumo = async (data: DraftInsumo) => {
    setLoading(true);
    try {
      await createInsumo(data);
      toast.success("Insumo creado correctamente");
      navigate('/insumos');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-bold text-4xl">Crear Insumo</h2>

      <form
        className="mt-10 w-2/3 mx-auto shadow p-10 space-y-5"
        onSubmit={handleSubmit(handleCreateInsumo)}
      >
        {insumosErrors
          ? insumosErrors.map((error, index) => (
            <Error key={index}>{error}</Error>
          ))
          : null}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="name">
            Nombre del Insumo:
          </label>
          <input
            autoComplete="off"
            id="name"
            type="text"
            placeholder={"Nombre del insumo"}
            className="border border-black p-3"
            {...register("name", {
              required: "El nombre del insumo es obligatorio",
            })}
          />
          {errors.name && <Error>{errors.name?.message?.toString()}</Error>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="code">
            Codigo del Insumo:
          </label>
          <input
            autoComplete="off"
            id="code"
            type="text"
            placeholder={"Codigo del insumo"}
            className="border border-black p-3"
            {...register("code", {
              required: "El codigo del insumo es obligatorio",
            })}
          />
          {errors.code && <Error>{errors.code?.message?.toString()}</Error>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase" htmlFor="measure">
            Unidad de Medida:
          </label>
          <input
            autoComplete="off"
            id="measure"
            type="text"
            placeholder={"Unidad de medida del Insumo"}
            className="border border-black p-3"
            {...register("measure", {
              required: "La unidad de madida del insumo es obligatoria",
            })}
          />
          {errors.measure && (
            <Error>{errors.measure?.message?.toString()}</Error>
          )}
        </div>

        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <p className="font-bold text-lg">Crear Insumo</p>
          )}
        </Button>
      </form>
    </>
  );
}

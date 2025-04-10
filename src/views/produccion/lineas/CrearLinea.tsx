import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createLinea } from "@/api/LineasAPI";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/utilities-components/Spinner";
import Error from "@/components/utilities-components/Error";
import InputComponent from "@/components/form/InputComponent";
import InputSelectComponent from "@/components/form/InputSelectComponent";

export type DraftLinea = {
  code: string;
  total_persons: number;
  shift: string;
  name: string;
}

export default function CreateSKU() {
  const navigate = useNavigate();
  const shifts = [{ value: '1', label: 'AM' }, { value: '0', label: 'PM' }]

  const { mutate, isPending } = useMutation({
    mutationFn: createLinea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/lineas');
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftLinea>();

  const onSubmit = (data: DraftLinea) => mutate(data)

  return (
    <>
      <h2 className="text-4xl font-bold">Crear línea</h2>

      <div>
        <form
          className="mt-10 w-2/3 shadow-xl mx-auto p-10 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >

          <InputComponent<DraftLinea>
            label="Código de Linea"
            id="code"
            name="code"
            placeholder="Codificación de Linea"
            register={register}
            validation={{ required: 'El codigo de la linea es requerida' }}
            errors={errors}
            type={'text'}
          >
            {errors.code && <Error>{errors.code?.message?.toString()}</Error>}
          </InputComponent>


          <InputComponent<DraftLinea>
            label="Nombre de la linea"
            id="name"
            name="name"
            placeholder="Nombre de la linea"
            register={register}
            validation={{ required: 'El nombre de la linea es obligatoria' }}
            errors={errors}
            type={'text'}
          >
            {errors.name && <Error>{errors.name?.message?.toString()}</Error>}
          </InputComponent>


          <InputComponent<DraftLinea>
            label="Total de Personas"
            id="total_persons"
            name="total_persons"
            placeholder="Total de personas que conforman la linea"
            register={register}
            validation={{ required: 'El total de persona es obligatorio' }}
            errors={errors}
            type={'text'}
          >
            {errors.total_persons && <Error>{errors.total_persons?.message?.toString()}</Error>}
          </InputComponent>

          <InputSelectComponent<DraftLinea>
            label="Turno"
            id="shift"
            name="shift"
            options={shifts}
            register={register}
            validation={{ required: 'El turno es requerido' }}
            errors={errors}
          >
            {errors.shift && <Error>{errors.shift?.message?.toString()}</Error>}
          </InputSelectComponent>

          <button disabled={isPending} className="button w-full bg-indigo-500 hover:bg-indigo-600">
            {isPending ? <Spinner /> : <p>Crear Linea</p>}
          </button>
        </form>
      </div>
    </>
  );
}

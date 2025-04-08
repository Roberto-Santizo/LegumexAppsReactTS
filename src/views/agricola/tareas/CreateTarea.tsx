import { createTarea } from "@/api/TasksAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/utilities-components/Spinner";
import TareasForm from "./TareasForm";

export type DraftTarea = {
  name: string;
  code: string;
  description: string;
};

export default function CreateTarea() {

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/tareas');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftTarea>();

  const onSubmit = (data: DraftTarea) => { mutate(data) };

  return (
    <>
      <h2 className="text-4xl font-bold">Crear Tarea</h2>
      <form
        className="mt-10 w-2/3 mx-auto shadow p-10 space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >

        <TareasForm register={register} errors={errors} />

        <button className="button bg-indigo-500 hover:bg-indigo-600 w-full">
          {isPending ? <Spinner /> : <p>Crear Tarea</p>}
        </button>
      </form>
    </>
  );
}

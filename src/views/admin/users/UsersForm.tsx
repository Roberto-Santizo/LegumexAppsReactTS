import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DraftUser } from "views/admin/users/CreateUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getRoles, Role } from "@/api/RolesAPI";
import { getPermissions, Permission } from "@/api/PermissionsAPI";
import Error from "@/components/utilities-components/Error";
import Spinner from "@/components/utilities-components/Spinner";
import InputSelectComponent from "@/components/form/InputSelectComponent";
import InputPasswordComponent from "@/components/form/InputPasswordComponent";
import InputComponent from "@/components/form/InputComponent";

type Props = {
    register: UseFormRegister<DraftUser>;
    errors: FieldErrors<DraftUser>;
    setSelectedPermissions?: Dispatch<SetStateAction<string[]>>;
    isEditing?: boolean;
}

export default function UsersForm({ register, errors, setSelectedPermissions, isEditing = false }: Props) {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);

    const results = useQueries({
        queries: [
            { queryKey: ['getRoles'], queryFn: getRoles },
            { queryKey: ['getPermissions'], queryFn: getPermissions }
        ]
    });

    const isLoading = results.some(result => result.isLoading);

    useEffect(() => {
        if (results[0].data) setRoles(results[0].data)
        if (results[1].data) setPermissions(results[1].data)
    }, [results]);

    const roleOptions = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));
    const handleCheckboxChange = (permissionId: string) => {
        if (setSelectedPermissions) {
            setSelectedPermissions((prev) =>
                prev.includes(permissionId)
                    ? prev.filter((id) => id !== permissionId)
                    : [...prev, permissionId]
            );
        }
    };

    if (isLoading) return <Spinner />
    return (
        <>
            <InputComponent<DraftUser>
                label="Nombre"
                id="name"
                name="name"
                placeholder="Nombre del usuario"
                register={register}
                validation={{ required: "El nombre es obligatorio" }}
                errors={errors}
            >
                <Error>{errors.name?.message}</Error>
            </InputComponent>

            <InputComponent<DraftUser>
                label="Nombre de Usuario"
                id="username"
                name="username"
                placeholder="Nombre de Usuario"
                register={register}
                validation={{ required: "El username es obligatorio" }}
                errors={errors}
            >
                <Error>{errors.username?.message}</Error>
            </InputComponent>

            <InputComponent<DraftUser>
                label="Email (opcional)"
                id="email"
                name="email"
                placeholder="Correo Eléctronico"
                register={register}
                validation={{
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "El formato del email es inválido",
                    },
                }}
                errors={errors}
            >
                <Error>{errors.email?.message}</Error>
            </InputComponent>

            <InputPasswordComponent<DraftUser>
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Contraseña"
                register={register}
                validation={!isEditing ? { required: "La contraseña es obligatoria" } : {}}
                errors={errors}
            >
                <Error>{errors.password?.message}</Error>
            </InputPasswordComponent>

            <InputSelectComponent<DraftUser>
                label="Rol"
                id="roles"
                name="roles"
                options={roleOptions}
                register={register}
                validation={{ required: 'El rol es obligatorio' }}
                errors={errors}
            >
                <Error>{errors.roles?.message}</Error>
            </InputSelectComponent>

            <fieldset className="shadow p-5">
                <legend className="text-3xl font-bold">Permisos</legend>
                <div className="flex flex-col gap-5 my-5 w-full p-2 max-h-96 overflow-y-scroll scrollbar-hide">
                    <table className="table">
                        <thead>
                            <tr className="thead-tr">
                                <th className="thead-th">Permiso</th>
                                <th className="thead-th">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map(permission => (
                                <tr className="tbody-tr" key={permission.id}>
                                    <td className="tbody-td">
                                        {permission.name}
                                    </td>
                                    <td className="tbody-td">
                                        <input
                                            type="checkbox"
                                            id={permission.name}
                                            value={permission.id}
                                            {...register("permissions", {
                                                required: "Selecciona al menos un permiso",
                                            })}
                                            className="w-10 h-6"
                                            onChange={() => handleCheckboxChange?.(permission.id.toString())}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {errors.permissions && (
                    <Error>{errors.permissions.message?.toString()}</Error>
                )}
            </fieldset>
        </>
    )
}

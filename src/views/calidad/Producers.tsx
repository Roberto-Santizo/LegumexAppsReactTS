import { Button } from "@mui/material";

export default function Producers() {
  return (
    <>
      <h2 className="text-4xl font-bold">Registrar Productores</h2>

      <div>
        <form className="mt-10 w-2/3 mx-auto shadow p-10 space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold uppercase" htmlFor="name">
              Nombre:
            </label>
            <input
              autoComplete="off"
              id="name"
              type="text"
              placeholder="Nombre del productor"
              className="border border-black p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold uppercase" htmlFor="code">
              Código:
            </label>
            <input
              autoComplete="off"
              id="code"
              type="number"
              placeholder="Código del productor"
              className="border border-black p-3"
            />
          </div>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Crear Boleta
          </Button>
        </form>
      </div>
    </>
  );
}

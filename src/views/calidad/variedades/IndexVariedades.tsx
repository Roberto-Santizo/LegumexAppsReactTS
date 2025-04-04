import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { Variety } from "@/types";
import { PlusIcon } from "lucide-react";
import ShowErrorAPI from "@/components/ShowErrorAPI";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import { getPaginatedVarieties } from "@/api/VarietiesAPI";
import { useQuery } from "@tanstack/react-query";


export default function IndexVariedades() {
  const [variedades, setVariedades] = useState<Variety[]>([]);

  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['getPaginatedVarieties', currentPage],
    queryFn: () => getPaginatedVarieties(currentPage)
  });

  useEffect(() => {
    if (data) {
      setVariedades(data.data);
      setCurrentPage(data.meta.current_page);
      setPageCount(data.meta.last_page);
    }
  }, [data]);


  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (isLoading) return <Spinner />
  if (isError) return <ShowErrorAPI />
  return (
    <>
      <h2 className="font-bold text-3xl">Variedades</h2>

      <div className="flex flex-row justify-end gap-5">
        <Link
          to="/productos/variedades/crear"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 uppercase flex justify-center items-center"
        >
          <PlusIcon className="w-8" />
          <p>Crear Variedad</p>
        </Link>
      </div>

      <div className="p-2 mt-10">
        <table className="table">
          <thead>
            <tr className="thead-tr">
              <th scope="col" className="thead-th">ID</th>
              <th scope="col" className="thead-th">Variedad</th>
            </tr>
          </thead>
          <tbody>
            {variedades.map(variedad => (
              <tr key={variedad.id} className="tbody-tr">
                <td className="tbody-td">{variedad.id}</td>
                <td className="tbody-td">{variedad.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-10 flex justify-end">
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

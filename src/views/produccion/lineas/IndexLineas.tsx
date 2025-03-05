import { PlusIcon } from "lucide-react";
// import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";


export default function IndexLineas() {

  return (
    <>
      <h2 className="font-bold text-4xl">lineas</h2>

      <div className="flex flex-row justify-end gap-5 mb-5">
        <div className="flex flex-row justify-end gap-5">
          <Link
            to="/lineas/CrearLinea"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 uppercase flex justify-center items-center"
          >
            <PlusIcon className="w-8" />
            <p>crear lineas</p>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <table className="table">
          <thead>
            <tr className="thead-tr">
              <th scope="col" className="thead-th">codigo</th>
              <th scope="col" className="thead-th">total de personas</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {/* {producers.map(producer => ( */}
              <tr className="tbody-tr">
                <td className="tbody-td"></td>
                <td className="tbody-td"></td>
                <td className="tbody-td"></td>
              </tr>
            {/* ))} */}
          </tbody>
        </table>
        <div className="mb-10 flex justify-end">
          {/* <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          /> */}
        </div>
      </div> 
    </>
  )
}

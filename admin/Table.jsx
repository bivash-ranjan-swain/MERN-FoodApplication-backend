import { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTables = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/table/all"
      );

      setTables(response.data.tables);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTables();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8800/api/table/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      setTables((prev) => prev.filter((table) => table._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl">

        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl md:text-3xl font-bold">
            Table Bookings
          </h1>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Total : {tables.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Date</th>
                <th className="px-4 py-4 text-left">Time</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Phone</th>
                <th className="px-4 py-4 text-center">Persons</th>
                <th className="px-4 py-4 text-center">Booked On</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {tables.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 text-lg font-semibold"
                  >
                    No Table Booking Found
                  </td>
                </tr>
              ) : (
                tables.map((table, index) => (
                  <tr
                    key={table._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4">
                      {table.date}
                    </td>

                    <td className="px-4 py-4">
                      {table.time}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {table.name}
                    </td>

                    <td className="px-4 py-4">
                      {table.phone}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {table.totalPerson}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {new Date(table.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(table._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Table;
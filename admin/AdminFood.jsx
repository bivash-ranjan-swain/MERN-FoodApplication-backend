import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  const getAllFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/food/all",
        {
          withCredentials: true,
        }
      );

      setFoods(response.data.foods);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);


  const handelDeleteFood = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/api/food/delete/${id}`, { withCredentials: true })
      alert(response.data.message)
      getAllFoods();

    } catch (error) {
      console.log(error.message || error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Food List</h2>

        <button className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold" onClick={() => navigate("/admin/add")}>
          + Add Food
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Food Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Actual Price</th>
              <th className="px-4 py-3 text-center">Discount Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food, index) => (
              <tr
                key={food._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-semibold">
                  {food.name}
                </td>

                <td className="px-4 py-3 max-w-sm truncate">
                  {food.description}
                </td>

                <td className="px-4 py-3 text-center">
                  ₹{food.actualPrice}
                </td>

                <td className="px-4 py-3 text-center text-green-600 font-bold">
                  ₹{food.discoutPrice}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm" onClick={() => navigate(`/admin/update/${food._id}`)}>
                      Update
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm" onClick={() => handelDeleteFood(food._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFood;
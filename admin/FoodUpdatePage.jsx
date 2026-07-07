import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FoodUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actualPrice: "",
    discoutPrice: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Get Single Food
  const getSingleFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/food/get-single/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      const food = response.data.food;

      setFormData({
        name: food.name || "",
        description: food.description || "",
        actualPrice: food.actualPrice || "",
        discoutPrice: food.discoutPrice || "",
      });

      setPreview(food.image || "");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSingleFood();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("actualPrice", formData.actualPrice);
      data.append("discoutPrice", formData.discoutPrice);

      if (image) {
        data.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:8800/api/food/update/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      navigate("/admin/food");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Update Food
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold mb-2">
                Actual Price
              </label>

              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Discount Price
              </label>

              <input
                type="number"
                name="discoutPrice"
                value={formData.discoutPrice}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Food Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-lg p-3"
            />

            {preview && (
              <img
                src={preview}
                alt="Food"
                className="mt-5 h-48 w-48 rounded-lg object-cover border"
              />
            )}

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Food"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default FoodUpdatePage;
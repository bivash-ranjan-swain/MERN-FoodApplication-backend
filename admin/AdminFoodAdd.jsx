import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminFoodAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actualPrice: "",
    discoutPrice: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
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
      data.append("image", image);

      const response = await axios.post(
        "http://localhost:8800/api/food/create",
        data,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      setFormData({
        name: "",
        description: "",
        actualPrice: "",
        discoutPrice: "",
      });

      setImage(null);
      setPreview("");
      navigate("/admin/food")
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add New Food
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="font-semibold">
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Food Name"
              className="w-full border rounded-lg p-3 mt-2 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Food Description"
              className="w-full border rounded-lg p-3 mt-2 outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold">
                Actual Price
              </label>

              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                placeholder="Actual Price"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Discount Price
              </label>

              <input
                type="number"
                name="discoutPrice"
                value={formData.discoutPrice}
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

          </div>

          <div>

            <label className="font-semibold">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-lg p-3 mt-2"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-40 rounded-lg object-cover border"
              />
            )}

          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Add Food"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminFoodAdd;
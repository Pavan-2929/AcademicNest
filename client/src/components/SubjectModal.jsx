import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SubjectModal = ({ subjectToggle }) => {
  const [formData, setFormData] = useState({
    subjectName: "",
    semesterNumber: "",
    materials: [{ materialTitle: "", description: "", fileURL: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/subject/add",
        formData
      );
      subjectToggle(false);
      console.log(response);
      toast.success("Subject added successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-200 p-4 md:p-8 rounded-lg shadow-md w-full md:w-96 relative">
        <h2 className="text-2xl font-semibold mb-4">
          Add New Material{" "}
          <span
            className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={subjectToggle}
          >
            &#10005;
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="subjectName">
              Subject Name
            </label>
            <input
              id="subjectName"
              type="text"
              placeholder="Enter Subject Name"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="semesterNumber"
            >
              Semester Number
            </label>
            <input
              id="semesterNumber"
              type="number"
              placeholder="Enter Semester Number"
              name="semesterNumber"
              value={formData.semesterNumber}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-2 md:px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 mr-2"
              onClick={subjectToggle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 md:px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;

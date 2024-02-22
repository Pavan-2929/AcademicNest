import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Modal = ({ toggleModal }) => {
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();

  const handlePasscode = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = () => {
    try {
      if (passcode === "admin123") {
        toggleModal(false);
        navigate("/admin");
        toast.success("Passcode matched")
      } else {
        toast.error("Enter valid passcode")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Admin Authentication</h2>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter the passcode"
            onChange={handlePasscode}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

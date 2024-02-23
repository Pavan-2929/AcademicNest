import React, { useEffect, useState } from "react";
import axios from "axios";
import SubjectModal from "../../components/SubjectModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Admin = () => {
  const navigate = useNavigate();

  const [allSubjects, setAllSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subjectModal, setSubjectModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    materialTitle: "",
    description: "",
    fileURL: "",
  });
  let isToken;

  useEffect(() => {
    isToken = localStorage.getItem("token");
    if (!isToken) {
      navigate("/");
      return;
    }
    getAllSubjects();
  }, [isToken]);

  const getAllSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://academicnest-server.onrender.com/api/subject/get"
      );
      setAllSubjects(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const addMaterialHandler = async (subjectId) => {
    try {
      const response = await axios.post(
        `https://academicnest-server.onrender.com/api/subject/material/add/${subjectId}`,
        newMaterial
      );
      getAllSubjects();
      setNewMaterial({ materialTitle: "", description: "", fileURL: "" });
      setShowModal(false);
      toast.success("Material created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMaterial = async (materialTitle) => {
    try {
      await axios.delete(
        `https://academicnest-server.onrender.com/api/subject/material/delete/${materialTitle}`
      );
      getAllSubjects();
      toast.success("Material Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const subjectToggle = () => {
    setSubjectModal(!subjectModal);
    getAllSubjects();
  };

  const deleteSubject = async (id) => {
    try {
      const response = await axios.delete(
        `https://academicnest-server.onrender.com/api/subject/delete/${id}`
      );

      console.log(response);
      getAllSubjects();
      toast.success("Subject deleted successfullyi di");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold mb-8 border-gray-400 border-b-2 py-8 text-center">
        Admin Panel
      </h1>
      <div className="flex justify-center border-gray-400 border-b-2 mb-8">
        <button
          onClick={subjectToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-8"
        >
          Add New Subject
        </button>
      </div>
      {subjectModal && <SubjectModal subjectToggle={subjectToggle} />}
      {isLoading ? <Loader/> : allSubjects.map((subject) => (
        <div key={subject._id} className="mb-8 pb-8 border-gray-400 border-b-2">
          <div className="bg-gray-200 rounded-lg shadow-md p-6">
            <div className="md:flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{subject.subjectName}</h2>
              <div>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSelectedSubjectId(subject._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 mt-6 text-white font-semibold py-1 px-2 md:py-2 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                >
                  Add Material
                </button>
                <button
                  onClick={() => deleteSubject(subject._id)}
                  className="bg-red-500 hover:bg-red-600 mt-6 text-white font-semibold py-1 px-2 md:py-2 md:px-4 rounded focus:outline-none focus:ring-2 focus:red-blue-500 focus:ring-opacity-50"
                >
                  Delete Subject
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              Semester: {subject.semesterNumber}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subject.materials.map((material) => (
                <div
                  key={material._id}
                  className="bg-gray-300 rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {material.materialTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">{material.description}</p>
                  {material.fileURL ? (
                    <>
                      <a
                        href={material.fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                      >
                        View
                      </a>
                      <button
                        onClick={() => deleteMaterial(material.materialTitle)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <p className="text-red-500">Material Unavailable</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative border border-black">
            <span
              className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &#10005;
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addMaterialHandler(selectedSubjectId);
              }}
            >
              <input
                type="text"
                placeholder="Material Title"
                value={newMaterial.materialTitle}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    materialTitle: e.target.value,
                  })
                }
                required
                className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newMaterial.description}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    description: e.target.value,
                  })
                }
                required
                className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="File URL"
                value={newMaterial.fileURL}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, fileURL: e.target.value })
                }
                required
                className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

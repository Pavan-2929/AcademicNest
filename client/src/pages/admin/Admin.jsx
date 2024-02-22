import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)
  const [newMaterial, setNewMaterial] = useState({
    materialTitle: "",
    description: "",
    fileURL: "",
  });

  const getAllSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/subject/get");
      setAllSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  const addMaterialHandler = async (subjectId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/subject/material/add/${subjectId}`,
        newMaterial
      );
      const updatedSubject = response.data;
      setAllSubjects((prevSubjects) =>
        prevSubjects.map((subject) => {
          if (subject._id === updatedSubject._id) {
            return updatedSubject;
          }
          return subject;
        })
      );
      setNewMaterial({ materialTitle: "", description: "", fileURL: "" });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {allSubjects.map((subject) => (
        <div key={subject._id} className="mb-8">
          <div className="flex gap-6 items-center mb-4">
            <h2 className="text-xl font-semibold">{subject.subjectName}</h2>
            <button
              onClick={() => {setShowModal(true), setSelectedSubjectId(subject._id)}}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add Material
            </button>
          </div>
          <p className="text-gray-600 mb-2">
            Semester: {subject.semesterNumber}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subject.materials.map((material) => (
              <div
                key={material._id}
                className="bg-gray-200 rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {material.materialTitle}
                </h3>
                <p className="text-gray-600 mb-2">{material.description}</p>
                {material.fileURL ? (
                  <a
                    href={material.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Material
                  </a>
                ) : (
                  <p className="text-red-500">Material Unavailable</p>
                )}
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
                          className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2"
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
                          className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2"
                        />
                        <input
                          type="text"
                          placeholder="File URL"
                          value={newMaterial.fileURL}
                          onChange={(e) =>
                            setNewMaterial({
                              ...newMaterial,
                              fileURL: e.target.value,
                            })
                          }
                          required
                          className="block w-full mt-2 border border-gray-300 rounded-md px-4 py-2"
                        />
                        <div className="flex between mt-4">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            Add Material
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;

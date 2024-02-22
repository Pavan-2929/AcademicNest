import React, { useEffect, useState } from "react";
import axios from "axios";

const Semester1 = () => {
  const [allSubjects, setAllSubjects] = useState([]);

  const getSem1Data = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/subject/get/1`
      );
      setAllSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSem1Data();
  }, []);

  return (
    <div className="container mx-auto md:px-6 px-1">
      {allSubjects.map((subject) => (
        <div
          key={subject._id}
          className="my-14 bg-gray-200 shadow-md rounded-lg md:p-6 p-2"
        >
          <h2 className="text-2xl font-bold mb-4">{subject.subjectName}</h2>
          <p className="text-gray-600 mb-4">
            Semester: {subject.semesterNumber}
          </p>
          {subject.materials.map((material, index) => (
            <div
              key={index}
              className="sm:bg-gray-300 rounded-lg p-4 mb-4 shadow-md"
            >
              <p className="font-semibold text-lg text-gray-800 mb-2">
                {material.materialTitle}
              </p>
              <p className="text-gray-600 mb-4">{material.description}</p>
              <a
                href={material.fileURL}
                className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Semester1;

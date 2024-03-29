import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const Semester2 = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSem2Data = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://academicnest-server.onrender.com/api/subject/get/2`
      );
      setAllSubjects(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSem2Data();
  }, []);

  return (
    <div className="container mx-auto md:px-6 px-1">
      {isLoading ? <Loader/> : allSubjects.map((subject) => (
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

export default Semester2;

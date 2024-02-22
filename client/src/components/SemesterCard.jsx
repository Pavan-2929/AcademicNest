import React from "react";
import { NavLink } from "react-router-dom";

const SemesterCard = ({ semestersData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:mx-10">
      {semestersData.map((semester) => (
        <div
          key={semester._id}
          className="bg-gray-200 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            {semester.semesterName}
          </h2>
          <p className="text-gray-700 mb-4">{semester.description}</p>
          <div className="flex flex-wrap mb-4">
            {semester.subjects.length > 0 ? (
              semester.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-gray-700 rounded-full py-1 px-3 mr-2 mb-2"
                >
                  {subject}
                </span>
              ))
            ) : (
              <p className="text-red-500 font-semibold mt-2">
                No subjects available
              </p>
            )}
          </div>
          {semester.subjects.length > 0 && (
            <NavLink
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
              to={`/${semester.semesterName
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              Go Now
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
};

export default SemesterCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SemesterCard from "../components/SemesterCard";

const Material = () => {
  const [semestersData, setSemesterData] = useState([]);

  const fetchsemestersData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/semester/get");
      setSemesterData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchsemestersData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold">
          Find the Material according to your semesters
        </h1>
      </div>
      <SemesterCard semestersData={semestersData} />
    </div>
  );
};

export default Material;

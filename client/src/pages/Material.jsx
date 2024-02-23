import React, { useEffect, useState } from "react";
import axios from "axios";
import SemesterCard from "../components/SemesterCard";
import Loader from "../components/Loader";

const Material = () => {
  const [semestersData, setSemesterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchsemestersData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        "https://academicnest-server.onrender.com/api/semester/get"
      );
      setSemesterData(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
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
      {isLoading ? <Loader /> : <SemesterCard semestersData={semestersData} />}
    </div>
  );
};

export default Material;

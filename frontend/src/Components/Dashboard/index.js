


import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BeatLoader from "react-spinners/BeatLoader";
import { Grid } from "@mui/material";
import IntensityChart from "../IntensityChart";
import RegionChart from "../RegionChart";
import RelevanceBubbleChart from "../RelevanceBubbleChart";
import PieChart from "../PieChart";
import LikelihoodRadarChart from "../Likelihoodchart";
import CountryChart from "../CountryChart";
import TopicsPolarAreaChart from "../TopicsPolarAreaChart";
import Navbar from "../Navbar";
import { useTheme } from "../ThemeContext";
import Sidebar from "../Layout";

Chart.register(CategoryScale);

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const fetchDataFromApi = async () => {
      const API_URL = "http://localhost:8000";
      try {
        const response = await axios.get(`${API_URL}/data/api/data`);
        setData(response.data);
        setLoading(false)
        console.log(response.data)
        console.log()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <>
    <div
      style={{
        background: theme === "dark" ? "#2F3349" : "#fff",
        color: theme === "dark" ? "#fff" : "#2F3349",
        minHeight: "100vh",
      }}
    >
       <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
       {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <BeatLoader color={theme === "dark" ? "#fff" : "#2F3349"} loading={loading} />
          </div>
       )
       :
       (

       <div style={{ flex: 1, padding: '20px', marginLeft:'20px'}}>
      {data.length>0 && <IntensityChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <div className="flex-1 p-4 bg-white shadow-md rounded-lg">
          {data.length >0 && <RegionChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
        </div>
        <div className="flex-1 p-4 bg-white shadow-md rounded-lg">
          {data.length >0 && <TopicsPolarAreaChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
        </div>
      </div>
      {data.length>0 && <RelevanceBubbleChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
      <div style={{ flex: 1, padding: '20px', marginLeft:'20px'}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className="p-4 bg-white shadow-md rounded-lg">
            {data.length>0 && <PieChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="p-4 bg-white shadow-md rounded-lg">
            {data.length>0 && <LikelihoodRadarChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
          </div>
        </Grid>
      </Grid>
      </div>
      {data.length>0 && <CountryChart data={data} textColor={theme === "dark" ? "#fff" : "#2F3349"}/>}
      </div>
       )}
       
      

       <Sidebar/>
    </div>
   
    </>
  );
};

export default Main;

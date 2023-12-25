import React, { useState } from "react";
import Highcharts from "highcharts";
// import HighchartsReact from "react-highcharts/ReactHighcharts";
import HighchartsReact from 'highcharts-react-official';
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "./ThemeContext";
// import HighchartsChart from 'react-highcharts/ReactHighcharts';
const LikelihoodRadarChart = ({ data }) => {
  const { theme } = useTheme();
  console.log(data,"like")
  const uniqueCountry=[...new Set(data.map(entry=>entry.country))]
  const [selectedCountry,setSelectedCountry]=useState('All')
  const filteredData=data.filter((entry)=>{
    return selectedCountry==="All"||entry.country==selectedCountry
  })
  const maxItemsToShow = 5;

  const selectMenuProps = {
    PaperProps: {
      style: {
        maxHeight: maxItemsToShow * 48 + 8, // 48 is the default item height, 8 is for padding
      },
    },
  };
  const chartConfig = {
    chart: {
      polar: true,
      type: "area",
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff', 
    },
    title: {
      text: "Likelihood Chart",
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    xAxis: {
      categories: data.map((entry) => entry.country),
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: theme === 'dark' ? '#fff' : '#2F3349', 
        },
      },
    },
    yAxis: {
      title: {
        text: null,
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349', // Set y-axis title color
        },
      },
    },
    series: [
      {
        name: "Likelihood",
        data: filteredData.map((entry) => entry.likelihood),
        color: "#7F00FF", // Purple color
        fillColor: "rgba(79, 59, 169, 0.7)",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349', // Set y-axis title color
        },
      },
    ],
  };
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  return (
    <Box
      border={1} borderColor='#D3D3D3'
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={4}
      pb={4}
      bg="white"
      overflow="hidden"
      maxWidth="800px"
      mx="auto"
    >
    <Select value={selectedCountry} onChange={handleCountryChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value='All'>All Countries</MenuItem>
        {uniqueCountry.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h5" mb={4} ml={2} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }}>
        Likelihood Chart
      </Typography>

      <div style={{ height: "400px" }}>
      
      
      <HighchartsReact highcharts={Highcharts} options={chartConfig} />
 
        
      </div>
    </Box>
  );
};

export default LikelihoodRadarChart;

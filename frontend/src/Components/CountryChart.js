import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
// import HighchartsReact from "react-highcharts";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import HighchartsReact from 'highcharts-react-official';
import { useTheme as useCustomTheme } from "./ThemeContext";
import { grey } from "@mui/material/colors";

const CountryChart = ({ data }) => {
    console.log(data,"country")
    const muiTheme = useMuiTheme();
  const customTheme = useCustomTheme();
  const uniqueCountry=[...new Set(data.map(entry=>entry.country))]
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [chartOptions, setChartOptions] = useState(null);
  useEffect(() => {
    const countryData = data.filter(
      (entry) => entry.country === selectedCountry
    );

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map(
      (sector) => sectors[sector]
    );

    const chartBackgroundColor = muiTheme.palette.primary.main;

    const newChartOptions = {
      chart: {
        type: "bar",
        backgroundColor: customTheme.theme === 'dark' ? '#2F3349' : '#fff', 
      },
      title: {
        text: "Country Chart",
        style: {
            color: customTheme.theme === 'dark' ? '#fff' : '#2F3349',
          },
      },
      xAxis: {
        categories: sectorLabels,
        style: {
            // color: customTheme.theme === 'dark' ? '#fff' : '#1F1B24',
          },
      },
      yAxis: {
        title: {
          text: "Intensity",
        },
        style: {
            // color: customTheme.theme === 'dark' ? '#fff' : '#1F1B24',
          },
        stackLabels: {
          enabled: true,
        },
        gridLineColor: muiTheme.palette.grey[200],
      },
      plotOptions: {
        series: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
          },
          color: chartBackgroundColor,
        },
        style: {
            // color: customTheme.theme === 'dark' ? '#fff' : '#1F1B24',
          },
      },
      series: [
        {
          name: "Intensity",
          data: sectorIntensities,
        //   color: customTheme.theme === 'dark' ? '#fff' : '#1F1B24',
        },
      ],
    };

    setChartOptions(newChartOptions);
  }, [selectedCountry, data, muiTheme,customTheme]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const maxItemsToShow = 5;

  const selectMenuProps = {
    PaperProps: {
      style: {
        maxHeight: maxItemsToShow * 48 + 8, // 48 is the default item height, 8 is for padding
      },
    },
  };

  return (
    <Box p={3} shadow="md" border={1} borderColor='#D3D3D3' boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" borderRadius={20} bgcolor={customTheme.theme === 'dark' ? '#2F3349' : '#fff'} m={6} maxWidth="800px" mx="auto">
      <Box display="flex" flexDirection="column">
        <Typography variant="h5" mb={4} style={{ color: customTheme.theme === 'dark' ? '#fff' : '#2F3349' }}>
          Country Chart
        </Typography>
        <Select value={selectedCountry} onChange={handleCountryChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value='All'>All Countries</MenuItem>
        {uniqueCountry.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
        <Box height="500px" width="100%">
        

          {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions}/>}
       
        </Box>
      </Box>
    </Box>
  );
};

export default CountryChart;

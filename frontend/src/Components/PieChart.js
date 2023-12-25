import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { useTheme } from './ThemeContext';

const PieChart = ({ data }) => {
  const { theme } = useTheme();
  console.log(data, "pie");
  const uniqueYears = [...new Set(data.map((entry) => entry.start_year))];
  const uniqueRegions = [...new Set(data.map((entry) => entry.region))];
  const [selectedStartYear, setSelectedStartYear] = useState('All'); 
  const [selectedRegion, setSelectedRegion] = useState('All'); 
  const filteredData = data.filter(
    (entry) =>
      (selectedStartYear === 'All' || entry.start_year === selectedStartYear) &&
      (selectedRegion === 'All' || entry.region === selectedRegion)
  );

  // Step 4: Prepare data for the pie chart
  const sectors = {};

  filteredData.forEach((entry) => {
    if (!sectors[entry.sector]) {
      sectors[entry.sector] = 0;
    }
    sectors[entry.sector] += entry.intensity;
  });

  const getRandomColor = (index) => {
    const colors = [
      '#FF0080',
      '#00BFFF',
      '#FFD700',
      '#32CD32',
      '#FF4500',
      '#9400D3',
      // Add more colors as needed
    ];
    return colors[index % colors.length];
  };

  const chartConfig = {
    chart: {
      type: 'pie',
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff',
    },
    title: {
      text: 'Sector Chart',
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349', // Set y-axis title color
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349', // Set y-axis title color
      },
    },
    series: [
      {
        name: 'Intensity',
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349', // Set y-axis title color
        },
        colorByPoint: true,
        data: Object.entries(sectors).map(([sector, intensity], index) => ({
          name: sector,
          y: parseFloat(intensity), // Convert intensity to a number
          color: getRandomColor(index),
        })),
      },
    ],
  };

  // Step 5: Add handlers for filter changes
  const handleStartYearChange = (event) => {
    setSelectedStartYear(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
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
    <Box
      p={6}
      border={1}
      borderColor='#D3D3D3'
      borderRadius={20}
      boxShadow='0px 0px 10px rgba(0, 0, 0, 0.1)'
      mt={4}
      pb={4}
      bg='white'
      overflow='hidden'
      maxWidth='800px'
      mx='auto'
    >
      {/* Step 6: Add the filter UI */}
      <Select value={selectedStartYear} onChange={handleStartYearChange} style={{ marginBottom: '16px', marginRight:'16px'}} MenuProps={selectMenuProps}>
        <MenuItem value='All'>All Years</MenuItem>
        {uniqueYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <Select value={selectedRegion} onChange={handleRegionChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value='All'>All Regions</MenuItem>
        {uniqueRegions.map((region) => (
          <MenuItem key={region} value={region}>
            {region}
          </MenuItem>
        ))}
      </Select>

      <Typography variant='h5' mb={4} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }}>
        Sector Chart
      </Typography>

      <div style={{ height: '400px' }}>
        <HighchartsReact highcharts={Highcharts} options={chartConfig} />
      </div>
    </Box>
  );
};

export default PieChart;

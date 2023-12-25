import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { useTheme } from './ThemeContext';

HighchartsMore(Highcharts);

const RelevanceBubbleChart = ({ data }) => {
  const { theme } = useTheme();
  console.log(data, "rele");

  // Step 1: Extract unique years and regions
  const uniqueYears = [...new Set(data.map((item) => item.start_year))];
  const uniqueRegions = [...new Set(data.map((item) => item.region))];

  // Step 2: Add state for the filters
  const [selectedStartYear, setSelectedStartYear] = useState('All'); // Default to 'All'
  const [selectedRegion, setSelectedRegion] = useState('All'); // Default to 'All'

  // Step 3: Filter data based on the selected filters
  const filteredData = data.filter(
    (item) =>
      (selectedStartYear === 'All' || item.start_year === selectedStartYear) &&
      (selectedRegion === 'All' || item.region === selectedRegion)
  );

  // Step 4: Add handlers for filter changes
  const handleStartYearChange = (event) => {
    setSelectedStartYear(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const chartConfig = {
    chart: {
      type: 'bubble',
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff',
    },
    title: {
      text: 'Relevance Chart',
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    xAxis: {
      title: {
        text: 'Likelihood',
      },
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    yAxis: {
      title: {
        text: 'Impact',
      },
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    series: [
      {
        name: 'Relevance',
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349',
        },
        data: filteredData.map((item) => ({
          x: item.likelihood,
          y: parseFloat(item.impact),
          z: item.relevance * 5,
        })),
      },
      {
        name: 'Intensity',
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349',
        },
        data: filteredData.map((item) => ({
          x: item.likelihood,
          y: parseFloat(item.impact),
          z: item.intensity,
        })),
      },
    ],
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
      border={1}
      borderColor='#D3D3D3'
      margin={4}
      p={4}
      mt={8}
      borderRadius={8}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <div style={{ marginBottom: '16px' }}>
        <Select value={selectedStartYear} onChange={handleStartYearChange} style={{ marginRight: '16px' }} MenuProps={selectMenuProps}>
          <MenuItem value="All">All Years</MenuItem>
          {uniqueYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <Select value={selectedRegion} onChange={handleRegionChange} MenuProps={selectMenuProps}>
          <MenuItem value="All">All Regions</MenuItem>
          {uniqueRegions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Typography variant="h5" mb={4} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }}>
        Relevance Chart
      </Typography>
      <div style={{ height: '400px' }}>
        <HighchartsReact highcharts={Highcharts} options={chartConfig} />
      </div>
    </Box>
  );
};

export default RelevanceBubbleChart;

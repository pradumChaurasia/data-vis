import React, { useState } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from './ThemeContext';
const RegionChart = ({ data }) => {
    const { theme } = useTheme();
    console.log(data,"region")
    const uniqueRegions = [...new Set(data.map((item) => item.region))];
    const [selectedRegion, setSelectedRegion] = useState('All'); 

    const filteredData = selectedRegion === 'All'
      ? data
      : data.filter(item => item.region === selectedRegion);

    const handleRegionChange = (event) => {
      setSelectedRegion(event.target.value);
    };
  const regionCounts = {};
  filteredData.forEach((item) => {
    if (item.region in regionCounts) {
      regionCounts[item.region]++;
    } else {
      regionCounts[item.region] = 1;
    }
  });

  const chartConfig = {
    chart: {
      type: 'pie',
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff', 
    },
    title: {
      text: 'Region Distribution',
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    series: [
      {
        name: 'Region Distribution',
        data: Object.entries(regionCounts).map(([region, count]) => ({
          name: region,
          y: count,
        })),
        colors: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
        style: {
            color: theme === 'dark' ? '#fff' : '#2F3349', 
          },
        
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
    <Box  borderRadius={20}
    border={1} borderColor='#D3D3D3'
    pt={6}
    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    mt={4}
    pb={4}
    bg="white"
    overflow="hidden"
    maxWidth="800px"
    mx="auto">
    <Select value={selectedRegion} onChange={handleRegionChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value="All">All Regions</MenuItem>
        {uniqueRegions.map((region) => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
      <Typography variant="h5" mb={4} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }} MenuProps={selectMenuProps}>
        Region Distribution
      </Typography>
      
      <div style={{ height: '400px' }}>
      {/* <HighchartsChart callback={Highcharts}> */}

        <HighchartsReact highcharts={Highcharts} options={chartConfig}/>
      {/* </HighchartsChart> */}
      </div>
    </Box>
  );
};

export default RegionChart;

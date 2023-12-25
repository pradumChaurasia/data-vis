import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from './ThemeContext';

const IntensityChart = ({ data }) => {
  const { theme } = useTheme();
  console.log(data, "intensity0");
  const [selectedSector, setSelectedSector] = useState('All'); // Default to 'All'

  // Step 2: Get unique sectors for the filter dropdown
  const uniqueSectors = [...new Set(data.map((item) => item.sector))];

  // Step 3: Filter data based on the selected sector
  const filteredData = selectedSector === 'All'
    ? data
    : data.filter(item => item.sector === selectedSector);

  // Step 4: Add a handler for sector change
  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };
  const maxItemsToShow = 5;

  const selectMenuProps = {
    PaperProps: {
      style: {
        maxHeight: maxItemsToShow * 48 + 8, // 48 is the default item height, 8 is for padding
      },
    },
  };
  const intensityData = filteredData.map((item) => item.intensity);
  const years = filteredData.map((item) => item.start_year);
  const getColor = (value) => {
    const colors = [
      '#7F00FF', // Green
      '#F2B93B', // Yellow
      '#FF8000', // Orange
      '#FF453A', // Red
    ];
    const threshold = Math.max(...intensityData) / 4;
    if (value < threshold) {
      return colors[0];
    } else if (value < threshold * 2) {
      return colors[1];
    } else if (value < threshold * 3) {
      return colors[2];
    } else {
      return colors[3];
    }
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff', 
    },
    title: {
      text: 'Intensity Chart',
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349',
      },
    },
    xAxis: {
      categories: years,
      gridLineWidth: 0,
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
        text: 'Intensity',
        style: {
          color: theme === 'dark' ? '#fff' : '#2F3349',
        },
      },
      gridLineWidth: 0,
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: theme === 'dark' ? '#fff' : '#2F3349',
        },
        formatter: function () {
          return this.value + '%';
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          anchor: 'end',
          align: 'start',
          y: -20,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#2F3349',
          },
          formatter: function () {
            return this.y + '%';
          },
        },
        colorByPoint: true,
      },
    },
    series: [
      {
        name: 'Intensity',
        data: intensityData,
        colors: intensityData.map((value) => getColor(value)),
      },
    ],
  };

  return (
    <Box border={1} borderColor='#D3D3D3' style={{ margin: '50px', padding: '10px', fontFamily: 'Arial, sans-serif', borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Select value={selectedSector} onChange={handleSectorChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value="All">All Sectors</MenuItem>
        {uniqueSectors.map((sector) => (
          <MenuItem key={sector} value={sector}>{sector}</MenuItem>
        ))}
      </Select>

      <Typography variant="h5" mb={4} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }}>
        Intensity Chart
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

export default IntensityChart;

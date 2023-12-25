import React, { useState } from 'react';
import Highcharts from 'highcharts';

import { Box, MenuItem, Select, Typography } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from './ThemeContext';

const TopicsPolarAreaChart = ({ data }) => {
    const { theme } = useTheme();
    const [selectedTopic, setSelectedTopic] = useState('All'); 
  const uniqueTopics = [...new Set(data.map((item) => item.topic))];
  const filteredData = selectedTopic === 'All'
    ? data
    : data.filter(item => item.topic === selectedTopic);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };
  const topics = filteredData.map((item) => item.topic);

  const chartConfig = {
    chart: {
      polar: true,
      type: 'area',
      backgroundColor: theme === 'dark' ? '#2F3349' : '#fff', 
    },
    title: {
      text: 'Topics Chart',
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349', 
      },
    },
    xAxis: {
      categories: topics,
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349', 
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      style: {
        color: theme === 'dark' ? '#fff' : '#2F3349', 
      },
    },
    series: [
      {
        name: 'Relevance',
        data: filteredData.map((item) => item.relevance),
        color: 'rgba(75, 192, 192, 0.6)',
        fillColor: 'rgba(75, 192, 192, 0.6)',
        lineWidth: 1,
        marker: {
          enabled: false,
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
    <Select value={selectedTopic} onChange={handleTopicChange} style={{ marginBottom: '16px' }} MenuProps={selectMenuProps}>
        <MenuItem value="All">All Topics</MenuItem>
        {uniqueTopics.map((topic) => (
          <MenuItem key={topic} value={topic}>{topic}</MenuItem>
        ))}
      </Select>
      <Typography variant="h5" mb={4} style={{ color: theme === 'dark' ? '#fff' : '#2F3349' }} MenuProps={selectMenuProps}>
        Topics Chart
      </Typography>
      <div style={{ height: '400px' }}>
        <HighchartsReact highcharts={Highcharts} options={chartConfig} />
      </div>
    </Box>
  );
};

export default TopicsPolarAreaChart;

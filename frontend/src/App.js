import React from 'react';
import './App.css';
import Highcharts from 'highcharts';  // Import Highcharts
import HighchartsReact from 'react-highcharts';
import Dashboard from './Components/Dashboard';
import { ThemeProvider } from './Components/ThemeContext';


// Initialize Highcharts globally
HighchartsReact.Highcharts = Highcharts;

function App() {
  return (
    
    <div className="App">
    <ThemeProvider>

      <Dashboard />
    </ThemeProvider>
    </div>
   
  );
}

export default App;

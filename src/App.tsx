import React from 'react';
import './App.css';
import { InputForm } from './InputForm/InputForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';

function App() {
  return (
    <div className="App">
      <InputForm />
      <TimeSeriesPlot />
      <DataTable />
      <ColorSelector />
    </div>
  );
}

export default App;

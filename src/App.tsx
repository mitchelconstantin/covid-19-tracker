import React from 'react';
import './App.css';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';

function App() {
  return (
    <div className="App">
      <BaseForm />
      <TimeSeriesPlot />
      <DataTable />
      <ColorSelector />
    </div>
  );
}

export default App;

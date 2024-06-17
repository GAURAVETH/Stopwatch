import React from 'react';
import Stopwatch from './Components/Stopwatch/Stopwatch.jsx';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">24-Hour Stopwatch</h1>
      <Stopwatch />
    </div>
  );
}

export default App;
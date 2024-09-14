import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LP from './LP';
import RP from './RP';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LP />} />
          <Route path="/registration" element={<RP />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

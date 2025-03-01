import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VacancyList from './components/VacancyList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VacancyList />} />
      </Routes>
    </Router>
  );
};

export default App;
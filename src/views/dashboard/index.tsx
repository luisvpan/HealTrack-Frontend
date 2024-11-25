// DashboardPage.jsx
import React from 'react';
import SymptomsByGenderChart from './components/SymptomsByGenderChart';
import SymptomsByAgeGroupChart from './components/SymptomsByAgeGroupChart';
import SymptomsBySurgeryTypeChart from './components/SymptomsBySurgeryTypeChart';
import MostCommonSymptom from './components/MostCommonSymptom';
import SymptomPercentages from './components/SymptomPercentagesChart';
import SymptomsWithAgesChart from './components/SymptomsWithAgesChart';
import PatientStatusPercentagesChart from './components/PatientStatusPercentagesChart';
import HighestRatedQuestions from './components/HighestRatedQuestions';
import LowestRatedQuestions from './components/LowestRatedQuestions';
import AcceptancePercentagesChart from './components/AcceptancePercentagesChart';
import LeastCommonSymptom from './components/LeastCommonSymptom';
import './DashboardPage.css';

const DashboardPage = () => (
  <div className="dashboard-container">
    <h1>Dashboard</h1>
    <div className="chart-grid">
      <MostCommonSymptom />
      <LeastCommonSymptom />
    </div>
    <h1> </h1>
    <div className="chart-grid">
      <HighestRatedQuestions />
      <LowestRatedQuestions />
    </div>
    <h1> </h1>
    <div className="chart-grid">
      <SymptomsByGenderChart />
      <SymptomsByAgeGroupChart />
    </div>
    <h1> </h1>
    <div className="chart-grid">
    <SymptomsBySurgeryTypeChart />
    <SymptomsWithAgesChart />
    </div>
    <h1> </h1>
    <div className="chart-grid">
      <SymptomPercentages />
      <PatientStatusPercentagesChart />
    </div>
    <h1> </h1>
    <div className="chart-grid">
      <AcceptancePercentagesChart />
    </div>
  </div>
);

export default DashboardPage;

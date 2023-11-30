import './App.css'
import { useState } from "react";
import CustomerList from './components/customerlist';
import Etusivu from './components/Etusivu';
import TrainingList from './components/Traininglist';
import dayjs from 'dayjs';

function App() {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  


  return (
    <div className="app-container">
    <div className="tabs">
      <button onClick={() => handleTabChange("home")}>Home</button>
      <button onClick={() => handleTabChange("Customers")}>Customers</button>
      <button onClick={() => handleTabChange("Trainings")}>Trainings</button>
    </div>

    {selectedTab === "Home" && <Etusivu />}
    {selectedTab === "Customers" && <CustomerList />}
    {selectedTab === "Trainings" && <TrainingList />}
  </div>
  )
  
}

export default App

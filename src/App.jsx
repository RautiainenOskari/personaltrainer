import './App.css'
import { useState } from "react";
import CustomerList from './components/customerlist';
import Etusivu from './components/Etusivu';
import TrainingList from './components/Traininglist';
import TrainingCalendar from './components/TrainingCalendar';

function App() {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  


  return (
    <div className="app-container">
    <div className="tabs">
      <button onClick={() => handleTabChange("home")}>Home</button>
      <button onClick={() => handleTabChange("customers")}>Customers</button>
      <button onClick={() => handleTabChange("trainings")}>Trainings</button>
      <button onClick={() => handleTabChange("calendar")}>Calendar</button>
    </div>

    {selectedTab === "home" && <Etusivu />}
    {selectedTab === "customers" && <CustomerList />}
    {selectedTab === "trainings" && <TrainingList />}
    {selectedTab === "calendar" && <TrainingCalendar />}
  </div>
  )
  
}

export default App

import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ScenarioGuide from "@/pages/ScenarioGuide";
import StrategyAnalysis from "@/pages/StrategyAnalysis";
import Simulation from "@/pages/Simulation";
import KnowledgeBase from "@/pages/KnowledgeBase";
import PersonalCenter from "@/pages/PersonalCenter";
import About from "@/pages/About";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenario/:type" element={<ScenarioGuide />} />
        <Route path="/strategy" element={<StrategyAnalysis />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/knowledge" element={<KnowledgeBase />} />
      <Route path="/profile" element={<PersonalCenter />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </AuthContext.Provider>
  );
}

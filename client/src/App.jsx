import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ExploreSkills from "./pages/ExploreSkills";
import RequestSkillSwap from "./pages/RequestSkillSwap";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills" element={<ExploreSkills />} />
      <Route path="/request-swap" element={<RequestSkillSwap />} />
    </Routes>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Squad from "./pages/Squad";
import PlayerDetails from "./pages/PlayerDetails";
import Fixtures from "./pages/Fixtures";
import Gallery from "./pages/Gallery";
import Rankings from "./pages/Rankings";
import FanZone from "./pages/FanZone";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-dark text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/player/:id" element={<PlayerDetails />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/fanzone" element={<FanZone />} />
            <Route path="/results" element={<div>Results Page</div>} />
            <Route path="/news" element={<div>News Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

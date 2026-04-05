import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Lanterns from './components/Lanterns';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#4a0404] text-white font-sans selection:bg-yellow-400 selection:text-[#4a0404]">
        <Lanterns />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

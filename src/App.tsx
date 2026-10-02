import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import DehydratedVegetables from './pages/DehydratedVegetables';
import DehydratedFruits from './pages/DehydratedFruits';
import ValueAddedSnacks from './pages/ValueAddedSnacks';
import BulkFoodIngredients from './pages/BulkFoodIngredients';
import ExportSupply from './pages/ExportSupply';
import TowelsNapkins from './pages/TowelsNapkins';
import QualitySystem from './pages/QualitySystem';
import ExportProcess from './pages/ExportProcess';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dehydrated-vegetables" element={<DehydratedVegetables />} />
          <Route path="/dehydrated-fruits" element={<DehydratedFruits />} />
          <Route path="/value-added-snacks" element={<ValueAddedSnacks />} />
          <Route path="/bulk-food-ingredients" element={<BulkFoodIngredients />} />
          {/* <Route path="/export-supply" element={<ExportSupply />} /> */}
          <Route path="/towels-napkins" element={<TowelsNapkins />} />
          <Route path="/quality-system" element={<QualitySystem />} />
          <Route path="/export-process" element={<ExportProcess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './pages/Order';
import Home from './pages/Home';
import Items from './pages/Inventory/Items';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="inventory/items" element={<Items />} />
      </Routes>
    </Router>
  );
}

export default App;

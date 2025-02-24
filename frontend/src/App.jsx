

import './App.css'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Order from './pages/Order';
import Home from './pages/Home';
import Items from './pages/Inventory/Items';
import Signup from './pages/Signup'
import Inventory from './pages/Inventory/Inventory';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="inventory/items" element={<Items />} />
      </Routes>
    </>
  )

}

export default App;

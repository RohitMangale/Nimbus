import Login from '../pages/Login'
import { Routes, Route } from 'react-router-dom'
import Order from '../pages/Order';
import Home from '../pages/Home';
import Items from '../pages/Inventory/Items';
import Signup from '../pages/Signup'
import Inventory from '../pages/Inventory/Inventory';
import RoleProtectedRoute from '../routes/RoleProtectedRoute.jsx';
import DashBoard from '../pages/Inventory/DashBoard';
import UserDashboard from '../pages/UserDashboard';
import UnAuthorized from '../pages/UnAuthorized';
import PageNotFound from '../pages/PageNotFound';
import GuestRoute from '../routes/GuestRoute.jsx';

const Routerr = () => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />

    {/* Guest Routes: Only accessible when NOT logged in */} 
    <Route element={<GuestRoute redirectPath="/dashboard" />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>


    {/* Unauthorized page */}        
    <Route path="/unauthorized" element={<UnAuthorized />} />

    {/* Routes allowed to all authorized personnel */}
    <Route element={<RoleProtectedRoute allowedRoles={["employee", "admin", "manager", "technician", "staff"]} />}  >
      <Route path="/orders" element={<Order />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/items" element={<Items />} />
      <Route path="/userDashboard" element={<UserDashboard />} />          
    </Route>
    
    {/* Routes allowed to only admin and manager */}
    <Route  element={<RoleProtectedRoute allowedRoles={["admin", "manager"]} />} >
      <Route path="/dashboard" element={<DashBoard/>} />
    </Route>


    {/* Routes allowed to only admin */}
    <Route  element={<RoleProtectedRoute allowedRoles={["admin"]} />} >
    </Route>

    {/* Page not found */}
    <Route path="*" element={<PageNotFound/> } />
  </Routes>
  )
}

export default Routerr
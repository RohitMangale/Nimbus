import Login from '../pages/Login'
import { Routes, Route } from 'react-router-dom'
import Order from '../pages/Order';
import Home from '../pages/Home';
import Signup from '../pages/Signup'
import RoleProtectedRoute from '../routes/RoleProtectedRoute.jsx';
import UnAuthorized from '../pages/UnAuthorized';
import PageNotFound from '../pages/PageNotFound';
import GuestRoute from '../routes/GuestRoute.jsx';
import Navbar from '../components/Navbar.jsx';
import Dashboard from '../pages/Inventory/DashBoard';

const Routerr = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />

    {/* Guest Routes: Only accessible when NOT logged in */} 
    <Route element={<GuestRoute redirectPath="/dashboard" />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>

      {/* <Route path="/companyAuth" element={<CompanyAuth />} /> */}

    {/* Unauthorized page */}        
    <Route path="/unauthorized" element={<UnAuthorized />} />

    {/* Routes allowed to all authorized personnel */}
    <Route element={<RoleProtectedRoute allowedRoles={["employee", "admin", "manager", "technician", "staff"]} />}  >
      {/* <Route path="/orders" element={<Order />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />          
    </Route>
      {/* <Route path="/inventory" element={<Items />} /> */}
    
    {/* Routes allowed to only admin and manager */}
    <Route  element={<RoleProtectedRoute allowedRoles={["admin", "manager"]} />} >
      {/* <Route path="/dashboard" element={<DashBoard/>} /> */}
    </Route>


    {/* Routes allowed to only admin */}
    <Route  element={<RoleProtectedRoute allowedRoles={["admin"]} />} >
    </Route>

    {/* Page not found */}
    <Route path="*" element={<PageNotFound/> } />
  </Routes>
  </>
  )
}

export default Routerr
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
import MintPart from '../pages/MintPart.jsx'

import DynamicForm from '../components/TemplateForm.jsx';
import Notifications from '../components/Notifications.jsx';
import PartsByOwner from '../pages/PartsByOwner.jsx';
import PartPage from '../pages/PartPage.jsx';

const Routerr = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mint" element={<MintPart />} />
    <Route path="companywise" element={<PartsByOwner/>}/>
    <Route path="partdisplay" element={<PartPage/>}/>
    {/* Guest Routes: Only accessible when NOT logged in */} 
    <Route element={<GuestRoute redirectPath="/dashboard" />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>

      {/* <Route path="/companyAuth" element={<CompanyAuth />} /> */}

    {/* Unauthorized page */}        
    <Route path="/unauthorized" element={<UnAuthorized />} />

    {/* Routes allowed to all authorized personnel */}
    {/* <Route element={<RoleProtectedRoute allowedRoles={["employee", "admin", "manager", "technician", "staff"]} />}  > */}
      {/* <Route path="/orders" element={<Order />} /> */}

      {/* <Route path="/dashboard" element={<Dashboard />} />           */}
    {/* </Route> */}
      {/* <Route path="/inventory" element={<Items />} /> */}

    <Route>


      <Route path="/dashboard" element={<Dashboard />} />          
      <Route path="/notifications" element={<Notifications />} />          
    </Route>
      {/* <Route path="/inventory" element={<Items />} /> */}
      <Route path="/form/:templateKey" element={<DynamicForm />} /> 

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

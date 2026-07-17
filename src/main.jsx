import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'

import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Clients from './pages/Clients.jsx'
import Products from './pages/Products.jsx'
import Profile from './pages/Profile.jsx'

import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminAddProduct from './components/AdminAddProduct.jsx'
import AdminManageProducts from './components/AdminManageProduct.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import GetEnquiries from './components/GetEnquiries.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div className="text-gray-500 font-medium">Dashboard Overview Stats... (Coming Soon)</div>} />
          <Route path="overview" element={<div className="text-gray-500 font-medium">Dashboard Overview Stats... (Coming Soon)</div>} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="manage-products" element={<AdminManageProducts />} />
          <Route path="inquiries" element={<GetEnquiries />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
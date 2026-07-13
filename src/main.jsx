import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router'
import './index.css'

import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Clients from './pages/Clients.jsx'
import Products from './pages/Products.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
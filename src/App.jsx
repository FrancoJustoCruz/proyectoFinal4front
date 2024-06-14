import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Products from './pages/Products';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Incidencias from './pages/Incidencias';
import AddIncidencia from './pages/AddIncidencia';
import EditIncidencia from './pages/EditIncidencia';
import Categorias from './pages/Categorias'; 
import AddCategorias from './pages/AddCategorias'
import EditCategorias from './pages/EditCategorias'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/incidencias/add" element={<AddIncidencia />} />
          <Route path="/incidencias/edit/:id" element={<EditIncidencia />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/add" element={<AddCategorias />} />
          <Route path="/categorias/edit/:id" element={<EditCategorias />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
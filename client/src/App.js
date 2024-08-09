import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddProduct from './Components/AddProduct';
import Product from './Components/Product';
import Admindashboard from './Admin/Admindashboard';
import AllUsers from './Components/AllUsers';

function App() {
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={isAuthenticated ? <Admindashboard /> :  <Login/>}  />
          <Route
            path="/addProduct"
            element={isAuthenticated ? <AddProduct /> : (
              <>
                <AlertMessage />
                <Navigate to="/login" />
              </>
            )}
          />
          <Route
            path="/product"
            element={isAuthenticated ? <Product /> : (
              <>
                <AlertMessage />
                <Navigate to="/login" />
              </>
            )}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : (
              <>
                <AlertMessage />
                <Navigate to="/login" />
              </>
            )}
          />
          <Route
            path="/allUsers"
            element={isAuthenticated ? <AllUsers /> : (
              <>
                <AlertMessage />
                <Navigate to="/login" />
              </>
            )}
          />
          {/* Redirect to signup page for unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

const AlertMessage = () => {
  // Show alert message when redirecting to login page
  React.useEffect(() => {
    alert("You have to login first");
  }, []);

  return null;
};

export default App;

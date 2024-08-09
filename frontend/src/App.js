import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Index from './Components/Index';
import About from './Components/About';
import Section from './Components/Services';
import Pricing from './Components/Pricing';
import Stats from './Components/Stats';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import AddToCart from './Components/AddToCart';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Success from './Components/Success';
import Cancel from './Components/Cancel';


function App() {
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Hero /> */}
              <Header />
              <Index />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              {/* <Hero /> */}
              <Header />
              <About />
            </>
          }
        />
        <Route
          path="/section"
          element={
            <>
              <Header />
              <Section />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <>
              <Header />
              <Portfolio />
            </>
          }
        />
        <Route
          path="/stats"
          element={
            <>
              <Header />
              <Stats />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Header />
              <Pricing />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
            </>
          }
        />
        <Route
          path="/addToCart"
          element={
            isAuthenticated ? (
              <>
                <Header />
                <AddToCart />
              </>
            ) : (
              <>
                <AlertMessage />
                <Login />
              </>
            )
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Redirect to dashboard page for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
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

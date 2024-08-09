import React from 'react'
import { Link,useNavigate  } from 'react-router-dom';

function Header() {
  const navigate=useNavigate();
  const logout=async ()=>{
   sessionStorage.clear();
   navigate("/login")
  // window.location.reload()
  }
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
  <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
    <a
      href="index.html"
      className="logo d-flex align-items-center me-auto me-xl-0"
    >
      {/* Uncomment the line below if you also wish to use an image logo */}
      {/* <img src="assets/img/logo.png" alt=""> */}
      <h1 className="sitename">E-Commerce Webiste</h1>
      <span>.</span>
    </a>
    <nav id="navmenu" className="navmenu">
      <ul>
  
      <li><Link to="/dashboard">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/section">Services</Link></li>
      <li><Link to="/portfolio">Products</Link></li>
      <li><Link to="/pricing">Pricing</Link></li>
      <li><Link to="/contact">Contact</Link></li>       
      <li><Link to="/addToCart">Cart</Link></li>       
      {/* <li><Link to="/success">Success</Link></li>        */}
    
    </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list" />
    </nav>
    <a className="btn-getstarted"  onClick={logout}>
      Logout
    </a>
  </div>
</header>

  )
}

export default Header

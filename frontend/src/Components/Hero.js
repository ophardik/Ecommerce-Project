import React from 'react';
import heroimage from '../assets/img/hero-bg.jpg';  

function Hero() {
  return (
    <section id="hero" className="hero section">
      <img src={heroimage} alt="Hero background"  />
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <h2>
              Welcome to Our Website
            </h2>
            <p>
              We are a team of talented designers making websites with Bootstrap
            </p>
          </div>
          <div className="col-lg-5">
            <form
              action="#"
              className="sign-up-form d-flex"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter email address"
              />
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign up"  // Changed from defaultValue to value
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

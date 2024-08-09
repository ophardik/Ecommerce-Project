import React from 'react'
import serviceImage1 from '../assets/img/features-light-1.jpg'
import serviceImage2 from '../assets/img/features-light-2.jpg'
import serviceImage3 from '../assets/img/features-light-3.jpg'

function Services() {
  return (
    <>
    <div className="container section-title"></div>
    {/* Services Section */}
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" >
        <h2>Services</h2>
        <p>
          
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      {/* End Section Title */}
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 " >
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-briefcase" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi sint occaecati cupiditate non provident
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-6 " >
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-card-checklist" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Dolor Sitema
                  </a>
                </h4>
                <p className="description">
                  Minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat tarad limino ata
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-6 " >
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-bar-chart" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Sed ut perspiciatis
                  </a>
                </h4>
                <p className="description">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-6 ">
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-binoculars" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p className="description">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-6 ">
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-brightness-high" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Nemo Enim
                  </a>
                </h4>
                <p className="description">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-6 " >
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0">
                <i className="bi bi-calendar4-week" />
              </div>
              <div>
                <h4 className="title">
                  <a href="services-details.html" className="stretched-link">
                    Eiusmod Tempor
                  </a>
                </h4>
                <p className="description">
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi
                </p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
        </div>
      </div>
    </section>
    {/* /Services Section */}
    {/* Features Section */}
    <section id="features" className="features section">
      {/* Section Title */}
      <div className="container section-title" >
        <h2>Features</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      {/* End Section Title */}
      <div className="container">
        <div className="row gy-4 align-items-center features-item">
          <div
            className="col-lg-5 order-2 order-lg-1"
         
          >
            <h3>Corporis temporibus maiores provident</h3>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident.
            </p>
            <a href="#" className="btn btn-get-started">
              Get Started
            </a>
          </div>
          <div
            className="col-lg-7 order-1 order-lg-2 d-flex align-items-center"
          
          >
            <div className="image-stack">
              <img
                src={serviceImage1}
                alt=""
                className="stack-front"
              />
              <img
                src={serviceImage2}
                alt=""
                className="stack-back"
              />
            </div>
          </div>
        </div>
        {/* Features Item */}
        <div className="row gy-4 align-items-stretch justify-content-between features-item ">
          <div
            className="col-lg-6 d-flex align-items-center features-img-bg"
            
          >
            <img
              src={serviceImage3}
              className="img-fluid"
              alt=""
            />
          </div>
          <div
            className="col-lg-5 d-flex justify-content-center flex-column"
          
          >
            <h3>Sunt consequatur ad ut est nulla</h3>
            <p>
              Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia
              minima quod. Sunt saepe odit aut quia voluptatem hic voluptas dolor
              doloremque.
            </p>
            <ul>
              <li>
                <i className="bi bi-check" />{" "}
                <span>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </li>
              <li>
                <i className="bi bi-check" />
                <span>
                  {" "}
                  Duis aute irure dolor in reprehenderit in voluptate velit.
                </span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>
                  Facilis ut et voluptatem aperiam. Autem soluta ad fugiat
                </span>
                .
              </li>
            </ul>
            <a href="#" className="btn btn-get-started align-self-start">
              Get Started
            </a>
          </div>
        </div>
        {/* Features Item */}
      </div>
    </section>
   
    
  </>
  
  )
}

export default Services

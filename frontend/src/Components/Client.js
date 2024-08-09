import React from 'react'
import clientImage1 from '../assets/img/clients/client-1.png'
import clientImage2 from '../assets/img/clients/client-2.png'
import clientImage3 from '../assets/img/clients/client-3.png'
import clientImage4 from '../assets/img/clients/client-4.png'
import clientImage5 from '../assets/img/clients/client-5.png'
import clientImage6 from '../assets/img/clients/client-6.png'

function Client() {
  return (
    <div>
      <section id="clients" className="clients section">
  <div className="container" >
    <div className="row gy-4">
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage1}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage2}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage3}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage4}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage5}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
      <div className="col-xl-2 col-md-3 col-6 client-logo">
        <img
          src={clientImage6}
          className="img-fluid"
          alt=""
        />
      </div>
      {/* End Client Item */}
    </div>
  </div>
</section>

    </div>
  )
}

export default Client

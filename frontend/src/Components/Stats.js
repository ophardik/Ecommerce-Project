import React from 'react'
import statsImage from '../assets/img/stats-bg.jpg'

function Stats() {
  return (
   
      <>
  {/* Stats Section */}
  <section id="stats" className="stats section">
    <img src={statsImage} alt="" />
    <div
      className="container position-relative"
     
    >
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
             
              className="purecounter"
            />
            <p>232 </p>
            <p>Clients</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
             
              className="purecounter"
            />
            <p>521</p>
            <p>Projects</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
             
              className="purecounter"
            />
            <p>2568</p>
            <p>Hours Of Support</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
             
              className="purecounter"
            />
            <p>350</p>
            <p>Workers</p>
          </div>
        </div>
        {/* End Stats Item */}
      </div>
    </div>
  </section>
  {/* /Stats Section */}
</>

  
  )
}

export default Stats

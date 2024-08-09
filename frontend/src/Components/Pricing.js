import React from 'react'

function Pricing() {
  return (
    <>
            <div className="container section-title"> </div>

  <section id="pricing" className="pricing section">
    {/* Section Title */}
    <div className="container section-title" >
      <h2>Pricing</h2>
      <p>
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>
    </div>
    {/* End Section Title */}
    <div className="container" >
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="pricing-item">
            <h3>Free Plan</h3>
            <div className="icon">
              <i className="bi bi-box" />
            </div>
            <h4>
              <sup>$</sup>0<span> / month</span>
            </h4>
            <ul>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Quam adipiscing vitae proin</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nec feugiat nisl pretium</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nulla at volutpat diam uteera</span>
              </li>
              <li className="na">
                <i className="bi bi-x" />{" "}
                <span>Pharetra massa massa ultricies</span>
              </li>
              <li className="na">
                <i className="bi bi-x" />{" "}
                <span>Massa ultricies mi quis hendrerit</span>
              </li>
            </ul>
            <div className="text-center">
              <a href="/" className="buy-btn">
                Buy Now
              </a>
            </div>
          </div>
        </div>
        {/* End Pricing Item */}
        <div className="col-lg-4">
          <div className="pricing-item featured">
            <h3>Business Plan</h3>
            <div className="icon">
              <i className="bi bi-rocket" />
            </div>
            <h4>
              <sup>$</sup>29<span> / month</span>
            </h4>
            <ul>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Quam adipiscing vitae proin</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nec feugiat nisl pretium</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nulla at volutpat diam uteera</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Pharetra massa massa ultricies</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Massa ultricies mi quis hendrerit</span>
              </li>
            </ul>
            <div className="text-center">
              <a href="/" className="buy-btn">
                Buy Now
              </a>
            </div>
          </div>
        </div>
        {/* End Pricing Item */}
        <div className="col-lg-4">
          <div className="pricing-item">
            <h3>Developer Plan</h3>
            <div className="icon">
              <i className="bi bi-send" />
            </div>
            <h4>
              <sup>$</sup>49<span> / month</span>
            </h4>
            <ul>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Quam adipiscing vitae proin</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nec feugiat nisl pretium</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Nulla at volutpat diam uteera</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Pharetra massa massa ultricies</span>
              </li>
              <li>
                <i className="bi bi-check" />{" "}
                <span>Massa ultricies mi quis hendrerit</span>
              </li>
            </ul>
            <div className="text-center">
              <a href="/" className="buy-btn">
                Buy Now
              </a>
            </div>
          </div>
        </div>
        {/* End Pricing Item */}
      </div>
    </div>
  </section>
  {/* /Pricing Section */}
</>

  )
}

export default Pricing

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const data = new FormData(event.target); // Use event.target to get the form element
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');

    try {
      const response = await axios.post("http://localhost:8002/api/contactUs", { name, email, subject, message });
      console.log("Response sent", response);
      // Optionally, you can update the form state to clear the form or show a success message
    } catch (error) {
      console.error("Error sending message", error);
      // Optionally, handle the error by showing an error message to the user
    }
  };

  return (
    <>
      <div className="container section-title"></div>
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title">
          <h2>Contact Us</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="info-item">
                    <i className="bi bi-geo-alt" />
                    <h3>Address</h3>
                    <p>A108 Adam Street</p>
                    <p>New York, NY 535022</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="col-md-6">
                  <div className="info-item">
                    <i className="bi bi-telephone" />
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                    <p>+1 6678 254445 41</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="col-md-6">
                  <div className="info-item">
                    <i className="bi bi-envelope" />
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                    <p>contact@example.com</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="col-md-6">
                  <div className="info-item">
                    <i className="bi bi-clock" />
                    <h3>Open Hours</h3>
                    <p>Monday - Friday</p>
                    <p>9:00AM - 05:00PM</p>
                  </div>
                </div>
                {/* End Info Item */}
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      {/* /Contact Section */}
    </>
  );
}

export default Contact;

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to send! Try again.");
        setSubmitting(false);
      });
  };

  return (
    <section
      id="contact"
      className="py-5"
      style={{ minHeight: "100vh", backgroundColor: "#FBEFD3" }}
    >
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-down">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color:"#A37D4C"}}>Contact Us</h2>
          <p className="text-muted">Get in touch for reservations and inquiries</p>
        </div>

        <div className="row g-4 justify-content-center">

          {/* Contact Form */}
          <div className="col-12 col-lg-5" data-aos="fade-up" data-aos-delay="200">
            <div className="card shadow-sm p-4">
              <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Send us a Message</h4>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name *"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Message *"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={submitting}
                  style={{ backgroundColor: "#A37D4C", borderColor: "#A37D4C" }}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

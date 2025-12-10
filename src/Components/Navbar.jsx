import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LogoImage from "../assets/logo-removebg-preview.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const [header, setHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect mobile width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setHeader(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      const yOffset = -70;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Style values
  const bgColor = isMobile ? "#FBEFD3" : header ? "#FBEFD3" : "transparent";

  const navItemStyle = {
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.95rem",
    fontWeight: "500",
    textTransform: "uppercase",
    transition: "color 0.3s ease",
    position: "relative",
    padding: "0.5rem 1rem",
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "#A37D4C";
    e.target.style.setProperty("--underline-width", "100%");
  };

  const handleMouseLeave = (e, color) => {
    e.target.style.color = color;
    e.target.style.setProperty("--underline-width", "0%");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: bgColor,
        padding: header ? "0.5rem 1rem" : "1rem 1rem",
        boxShadow: header || isMobile ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        zIndex: 1030,
        transition: "all 0.3s",
      }}
    >
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={LogoImage}
            width="50"
            height="50"
            alt="Logo"
            style={{ objectFit: "contain" }}
          />
          <span style={{ color: "#A37D4C", fontWeight: 700, fontSize: "1.2rem" }}>
            APS RESIDENCY
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-uppercase fw-semibold">

            {/* Navigation Items */}
            {[
              { label: "Home", id: "hero" },
              { label: "Rooms", externalUrl: "https://bookingengine.stayflexi.com/34228/?checkin=06-12-2025&num_nights=1&num_guests=2&source=google&hotel_id=34228" },
              { label: "Amenities", id: "amenities" },
              { label: "Gallery", id: "gallery" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <li key={item.label} className="nav-item">
                {item.externalUrl ? (
                  // 🚪 ROOMS → external link
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    style={{
                      ...navItemStyle,
                      color: header || isMobile ? "#000" : "#fff",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) =>
                      handleMouseLeave(e, header || isMobile ? "#000" : "#fff")
                    }
                  >
                    {item.label}
                  </a>
                ) : (
                  // 🟢 On home → just scroll
                  <span
                    onClick={() => scrollToSection(item.id)}
                    className="nav-link"
                    style={{
                      ...navItemStyle,
                      color: header || isMobile ? "#000" : "#fff",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) =>
                      handleMouseLeave(e, header || isMobile ? "#000" : "#fff")
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}

            {/* BOOK NOW BUTTON → always open your dynamic link */}
            <li className="nav-item">
              <a
                href="https://bookingengine.stayflexi.com/34228/?checkin=06-12-2025&num_nights=1&num_guests=2&source=google&hotel_id=34228"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: "#A37D4C",
                  color: "#fff",
                  marginLeft: "10px",
                  padding: "8px 18px",
                  borderRadius: "6px",
                }}
              >
                Book Now
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

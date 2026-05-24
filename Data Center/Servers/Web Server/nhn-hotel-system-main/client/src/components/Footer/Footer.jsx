import React from "react";
import { Link } from "react-router-dom";
import Logo from "../NavbarComponents/Logo/Logo";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4">
          {/* Logo & Description */}
          <div className="col-lg-4">
            <Logo />
            <p className="footer-description mt-3 lh-base">
              Experience luxury and comfort at NHN Hotel. Your home away from
              home since 2004.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4">
            <h5 className="footer-title fw-semibold mb-3">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <Link to="/home" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/rooms" className="footer-link">
                  Rooms
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-4">
            <h5 className="footer-title fw-semibold mb-3">Our Services</h5>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <Link to="/rooms" className="footer-link">
                  Luxury Suites
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/rooms" className="footer-link">
                  Presidential Villas
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/home" className="footer-link">
                  Fine Dining
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/home" className="footer-link">
                  Spa & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-4">
            <h5 className="footer-title fw-semibold mb-3">Contact Us</h5>
            <ul className="footer-contact list-unstyled">
              <li className="mb-3 d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="footer-icon mt-1" />
                <span>123 Luxury Avenue, Downtown City</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaPhone className="footer-icon" />
                <a href="tel:+1234567890" className="footer-link">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaEnvelope className="footer-icon" />
                <a href="mailto:info@nhnhotel.com" className="footer-link">
                  info@nhnhotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom mt-5 pt-4 text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} NHN Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

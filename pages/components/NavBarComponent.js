"use client";
import { useState } from "react";

const NavBarComponent = ({ toggleSidebar }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold px-2" href="#">
            <img src="/assets/images/logo.png" alt="" width="180px" />
          </a>
          <button className="btn btn-primary me-3" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-light me-2">
              <i className="fas fa-store"></i> Mirpur-1 (Main)
            </button>
            <button className="btn btn-outline-primary me-2">
              <i className="fas fa-globe"></i> English
            </button>
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown">
                <img src="/assets/images/profile.png" width="35px" className="rounded me-2" alt="" /> Sudarsan
              </button>
              <ul className="dropdown-menu dropdown-menu-end profile-dropdown">
                <li className="text-center">
                  <img src="/assets/images/profile.png" alt="User Profile" />
                  <h6>Sudarsan</h6>
                  <p>sudarasn2165@gmail.com<br />+91 8464002165</p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-user-edit me-2"></i> Edit Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-key me-2"></i> Change Password</a></li>
                <li><a className="dropdown-item text-danger" href="#"><i className="fas fa-sign-out-alt me-2"></i> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;

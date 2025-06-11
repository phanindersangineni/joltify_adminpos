"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";;
import { useRouter } from "next/router";
import ChangePasswordComponent from "./ChangePasswordComponent";

const NavBarComponent = ({ toggleSidebar }) => {
  const { user,logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.getElementById('changepassword').style.display = 'none';

}, []);

  function openPopup(popupId) {

    document.getElementById(popupId).style.display = "flex";
}

function closemodal(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

  const logoutUser =() =>{
    logout();
    router.push('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container-fluid">
        <div class="add-customer  " id="changepassword" >
                    <ChangePasswordComponent 
                        closeCustomerAction={closemodal} 
                         />
                </div>
          <a className="navbar-brand fw-bold px-2" href="#">
            <img src="/assets/images/logo.png" alt="" width="180px" />
          </a>
          <button className="btn btn-primary me-3" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="d-flex ms-auto align-items-center">
           
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown">
                <img src="/assets/images/profile.png" width="35px" className="rounded me-2" alt="" /> {user?.fullname}
              </button>
              <ul className="dropdown-menu dropdown-menu-end profile-dropdown">
                <li className="text-center">
                  <img src="/assets/images/profile.png" alt="User Profile" />
                  <h6>{user?.fullname}</h6>
                  <p>{user?.username}<br />+{user?.mobileno}</p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#" onClick={() => 
                   openPopup('changepassword')}>
                  <i className="fas fa-key me-2"></i> Change Password</a></li>
                <li><a className="dropdown-item text-danger" href=""
                 onClick={logoutUser}><i className="fas fa-sign-out-alt me-2"></i> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
       
      </nav>
    </>
  );
};

export default NavBarComponent;

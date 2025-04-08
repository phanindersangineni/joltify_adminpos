"use client"; // Ensure it's a Client Component

import { useEffect, useState } from "react";

const SidebarComponent = ({isOpen}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sidebar-collapsed") === "true";
      setIsCollapsed(storedState);
      setActiveLink(localStorage.getItem("activeLink") || "/index.html");
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", newState);
      return newState;
    });
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    localStorage.setItem("activeLink", href);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "collapsed" : ""}`} id="sidebar">
       
        <ul>
          <li>
            <a
              href="/dashboards"
              className={activeLink === "/dashboards" ? "active" : ""}
              onClick={() => handleLinkClick("/dashboards")}
            >
              <i className="fas fa-th-large"></i> <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/items"
              className={activeLink === "/items" ? "active" : ""}
              onClick={() => handleLinkClick("/items")}
            >
              <i className="fas fa-utensils"></i> <span>Items</span>
            </a>
          </li>
          <li>
         
            <a href="/users">
              <i className="fas fa-table"></i> <span>Users</span>
            </a>
          </li>
           
          <li>
         
            <a href="/category">
              <i className="fas fa-table"></i> <span>Category</span>
            </a>
          </li>
          
          <li>
         
            <a href="/restaurant">
              <i className="fas fa-table"></i> <span>Restaurant</span>
            </a>
          </li>
          <li>
         
            <a href="/table">
              <i className="fas fa-table"></i> <span>Dining Tables</span>
            </a>
          </li>
          <li className="sidebar-heading">POS & ORDERS</li>
          <li>
            <a href="/pos">
              <i className="fas fa-desktop"></i> <span>POS</span>
            </a>
          </li>
          <li>
            <a href="/posorders">
              <i className="fas fa-receipt"></i> <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="/kitchen">
              <i className="fas fa-receipt"></i> <span>Kitchen Orders</span>
            </a>
          </li>
          
          <li className="sidebar-heading">PROMO</li>
          <li>
            <a href="#">
              <i className="fas fa-tags"></i> <span>Offers</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;

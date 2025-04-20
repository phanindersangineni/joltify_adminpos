"use client"; // Ensure it's a Client Component

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";;
import Link from "next/link";

const SidebarComponent = ({ isOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { user } = useAuth();

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
            <Link
              href="/dashboards"
              className={activeLink === "/dashboards" ? "active" : ""}
              onClick={() => handleLinkClick("/dashboards")}
            >
              <i className="fas fa-th-large"></i> <span>Dashboard</span>
            </Link>
          </li>
          <li>

              <Link href="/table">
                <i className="fas fa-table"></i> <span>Dining Tables</span>
              </Link>
            </li>
            <li>

              <Link href="/category">
                <i className="fas fa-table"></i> <span>Category</span>
              </Link>
            </li>
          <li>
            
            <Link
              href="/items"
              className={activeLink === "/items" ? "active" : ""}
              onClick={() => handleLinkClick("/items")}
            >
              <i className="fas fa-utensils"></i> <span>Items</span>
            </Link>
          </li>
          <li>

            <Link href="/users">
              <i className="fas fa-table"></i> <span>Users</span>
            </Link>
          </li>



       {user?.roleid =='ROLE_ADMIN' &&   <li>

            <Link href="/restaurant">
              <i className="fas fa-table"></i> <span>Restaurant</span>
            </Link>
          </li> }

          <li className="sidebar-heading">POS & ORDERS</li>
          <li>
            <Link href="/pos">
              <i className="fas fa-desktop"></i> <span>POS</span>
            </Link>
          </li>
          <li>
            <Link href="/orders">
              <i className="fas fa-receipt"></i> <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link href="/kitchen">
              <i className="fas fa-receipt"></i> <span>Kitchen Orders</span>
            </Link>
          </li>
          <li>
            <Link href="/odds">
              <i className="fas fa-receipt"></i> <span>Order Display</span>
            </Link>
          </li>

        {/*}  <li className="sidebar-heading">PROMO</li>
          <li>
            <Link href="#">
              <i className="fas fa-tags"></i> <span>Offers</span>
            </Link>
  </li>*/}
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;

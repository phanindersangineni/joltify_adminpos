"use client";

import axios from "axios";
import { useRef, useState, useEffect } from "react";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const Menu = ({categoryClickAction}) => {
  const menuRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const[categories,setCategories] =useState([]);

  const loaditemsbycategory=(item) =>{
    categoryClickAction(item);
  }

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = async() =>{
    let accesstoken = await localStorage.getItem("posaccesstoken");
    const user = await localStorage.getItem('posuser');
  
    const headers = {
      "content-type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      token: accesstoken,
    };
    const response = await axios.get(`${DEV}/joltify/categories/search/${user.id}`, { headers });
    setCategories(response.data.data);
  }

  const scrollMenu = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 200;
      menuRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        setShowLeftArrow(menuRef.current.scrollLeft > 0);
        setShowRightArrow(
          menuRef.current.scrollLeft < menuRef.current.scrollWidth - menuRef.current.clientWidth
        );
      }
    };

    if (menuRef.current) {
      menuRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => menuRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="menu-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {showLeftArrow && (
        <button className="scroll-btn left-arrow" onClick={() => scrollMenu(-1)}>
          &#10094;
        </button>
      )}
      <div className="menu-items" id="menu" ref={menuRef} style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <div className="menu-item active">
          <img src="/assets/images/all-category.png" alt="All Items" />
          <p>All Items</p>
        </div>
        {categories.map((cat, index) => ( 
        <div key={index} className="menu-item" onClick={()=>loaditemsbycategory(cat)}>
          <img src={`${DEV}/items/files/${cat.image}`} alt="Appetizers" />
          <p>{cat.name}</p>
        </div>
        ))}
      
      </div>
      {showRightArrow && (
        <button className="scroll-btn right-arrow" onClick={() => scrollMenu(1)}>
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Menu;

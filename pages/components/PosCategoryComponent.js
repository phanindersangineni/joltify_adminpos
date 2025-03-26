import { useEffect, useState } from "react";


const PosCategoryComponent =() =>{

  const[categories,setCategories] =useState([]);

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

    return(
        <>
        </>
    )
}
export default PosCategoryComponent
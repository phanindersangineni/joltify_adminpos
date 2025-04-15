"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const ItemViewComponent = ({singleitem}) => {
  const [activePopup, setActivePopup] = useState(null);
  const fileInputRef = useRef(null);
  const [itempic,setItemPic] =useState(`${DEV}/items/files/${singleitem.image}`);
  const [formData, setFormData] = useState({ name: "", price: "", attributes: "", status: "active" });
  const [variantlist,setVarianList] =useState([]);
  const [extralist,setExtraList] =useState([]);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
      console.error("Failed to load Bootstrap:", err)
    );
    if(singleitem.variants !=null){
      setVarianList(singleitem.variants);
      loadvariantlist(singleitem.variants);
     
    }
    if(singleitem.extra !=null){
      setExtraList(singleitem.extra);
      
     
    }
  }, []);


  useEffect(() => {

    setItemPic(`${DEV}/items/files/${singleitem.image}`);
    
    if(singleitem.variants !=null){
      setVarianList(singleitem.variants);
      loadvariantlist(singleitem.variants);
     
    }
    if(singleitem.extra !=null){
      setExtraList(singleitem.extra);
      
     
    }
  }, [singleitem]);

  const [groupedVariants, setGroupedVariants] = useState({});

const loadvariantlist = (objlist) => {
  function removeDuplicates(array) {
    const seen = new Set();
    return array.filter((item) => {
      const key = `${item.name}-${item.attributes}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  const uniqueVariants = removeDuplicates(objlist);
  const grouped = {};

  uniqueVariants.forEach((variant) => {
    if (!grouped[variant.attributes]) {
      grouped[variant.attributes] = [];
    }
    grouped[variant.attributes].push(variant);
  });

  setGroupedVariants(grouped);
};
  
  // Open a popup
  const openPopup = (popupId) => {
    
    setActivePopup(popupId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Close popups
  const closePopup = () => {
   
    setActivePopup(null);
    
    setFormData({ name: "", price: "", attributes: "", status: "active" });
  };

  const handleImageClick = () => {
    if (fileInputRef.current?.files.length) return; // Prevent reopening the file dialog if a file is selected


  fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    event.target.value = "";
    if (file) {
     // setIsProcessing(true); // Flag as processing when file is selected

      // Generate new file name
      //const fileName = file.name;
      let itemNameModified = singleitem.name.replace(/ /g, '_');
       const newFileName =`${itemNameModified}_${new Date().getTime()}`;

      const newFile = new File([file], newFileName, { type: file.type });
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        // Upload the file to the server
        const response = await axios.post(`${DEV}/items/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data.status);

        if (response.data.status =='success') {
        //  const fileUrl = `${APIs.development.viewupload}${newFileName}?timestamp=${new Date().getTime()}`;

        const fileUrl = `${DEV}/items/files/${newFileName}`;
        setItemPic(fileUrl);
         
        const saveredata ={
          image:newFileName
         }
         let accesstoken = await localStorage.getItem("posaccesstoken");
         const headers = {
           "content-type": "application/json",
           "X-Content-Type-Options": "nosniff",
           "X-Frame-Options": "SAMEORIGIN",
           token: accesstoken,
         };
         let response = await axios.put(`${DEV}/joltify/items/${singleitem.id}`,saveredata, { headers });
          console.log(response);
          if(response.data.data =='SUCCESS'){
          Swal.fire({
            text: 'Item image updated Successful',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
          window.dispatchEvent(new Event("reloadlist"));
           }else{
            Swal.fire({
              text: 'Failed to add item image',
              icon: 'success',
              timer: 2000, // The alert will automatically close after 3 seconds
              showConfirmButton: false, // Hide the confirm button
            });
           }
          
        }
      } catch (error) {
        console.error("Error uploading file:", error);
       
      }

      // Reset file input and processing flag after the file is processed
     // setIsProcessing(false); // Reset the processing flag once done
      event.target.value = ""; // Clear the input to prevent reopening the browse dialog
    }
  };

  const filtervariant = async(variant) =>{
    let filterlist=  variantlist.filter(extraItem => 
      !(extraItem.name === variant.name && 
        extraItem.price === variant.price && 
        extraItem.attributes === variant.attributes)
  );

  try {
    let accesstoken = await localStorage.getItem("posaccesstoken");
    const headers = {
      "content-type": "application/json",
      token: accesstoken,
    };
     
      setVarianList(filterlist);
      loadvariantlist(filterlist);
    const saveredata ={
      variants:filterlist
     }
    let response = await axios.put(`${DEV}/joltify/items/${singleitem.id}`,saveredata, { headers });
        
        if(response.data.data =='SUCCESS'){
          
        Swal.fire({
          text: 'Item  updated Successful',
          icon: 'success',
          timer: 2000, // The alert will automatically close after 3 seconds
          showConfirmButton: false, // Hide the confirm button
        });
        window.dispatchEvent(new Event("reloadlist"));
         }else{
          if(singleitem.variants !=null){
            setVarianList(singleitem.variants);
            loadvariantlist(singleitem.variants);
          }
          Swal.fire({
            text: 'Failed to update item',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
         }
  } catch (error) {
    console.error("Error saving item:", error);
    Swal.fire({ text: "Failed to save item", icon: "error" });
  }


    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.attributes) {
      Swal.fire({ text: "Please fill all required fields", icon: "error" });
      return;
    }
    try {
      let accesstoken = await localStorage.getItem("posaccesstoken");
      const headers = {
        "content-type": "application/json",
        token: accesstoken,
      };
       let vr = singleitem.variants;
       console.log(vr);
        if(vr !=null){
         if(Array.isArray(singleitem.variants))
         {
          vr =[];
         }else{
          vr = JSON.parse(singleitem.variants);
         }
        }else{
          if(variantlist.length ==0){
          vr =[];
          }else{
            vr =variantlist;
          }
        }
        
        let obj ={
          name:formData.name,
          price:formData.price,
          attributes:formData.attributes,
          status:formData.status

        }
          
        vr.push(obj);
        console.log(vr);
        setVarianList(vr);
        loadvariantlist(vr);
      const saveredata ={
        variants:vr
       }
      let response = await axios.put(`${DEV}/joltify/items/${singleitem.id}`,saveredata, { headers });
          
          if(response.data.data =='SUCCESS'){
            
          Swal.fire({
            text: 'Item  updated Successful',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
          window.dispatchEvent(new Event("reloadlist"));
           }else{
            if(singleitem.variants !=null){
              setVarianList(singleitem.variants);
              loadvariantlist(singleitem.variants);
            }
            Swal.fire({
              text: 'Failed to update item',
              icon: 'success',
              timer: 2000, // The alert will automatically close after 3 seconds
              showConfirmButton: false, // Hide the confirm button
            });
           }
    } catch (error) {
      console.error("Error saving item:", error);
      Swal.fire({ text: "Failed to save item", icon: "error" });
    }
  };

  const filterextra =async(item) =>{
   let filterlist=  extralist.filter(extraItem => 
    !(extraItem.name === item.name && 
      extraItem.price === item.price && 
      extraItem.status === item.status)
);

  try {
    let accesstoken = await localStorage.getItem("posaccesstoken");
    const headers = {
      "content-type": "application/json",
      token: accesstoken,
    };
     
    const saveredata ={
      extra:filterlist
     }
     setExtraList(filterlist);
    let response = await axios.put(`${DEV}/joltify/items/${singleitem.id}`,saveredata, { headers });
        
        if(response.data.data =='SUCCESS'){
          
        Swal.fire({
          text: 'Item  updated Successful',
          icon: 'success',
          timer: 2000, // The alert will automatically close after 3 seconds
          showConfirmButton: false, // Hide the confirm button
        });
        window.dispatchEvent(new Event("reloadlist"));
         }else{
          if(singleitem.extra !=null){
            setExtraList(singleitem.extra);
           
          }
          Swal.fire({
            text: 'Failed to update item',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
         }
  } catch (error) {
    console.error("Error saving item:", error);
    Swal.fire({ text: "Failed to save item", icon: "error" });
  }

    
  }
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      Swal.fire({ text: "Please fill all required fields", icon: "error" });
      return;
    }
    try {
      let accesstoken = await localStorage.getItem("posaccesstoken");
      const headers = {
        "content-type": "application/json",
        token: accesstoken,
      };
       /*let vr = singleitem.extra;
        if(vr !=null){
        
          vr = JSON.parse(singleitem.extra);
        }else{
          vr =[];
        }*/

        let vr = singleitem.extra;
       console.log(vr);
        if(vr !=null){
         if(Array.isArray(singleitem.extra))
         {
          vr =[];
         }else{
          vr = JSON.parse(singleitem.extra);
         }
        }else{
          if(extralist.length ==0){
          vr =[];
          }else{
            vr =extralist;
          }
        }
        
        let obj ={
          name:formData.name,
          price:formData.price,
          status:formData.status

        }
          
        vr.push(obj);
        setExtraList(vr);
        
      const saveredata ={
        extra:vr
       }
      let response = await axios.put(`${DEV}/joltify/items/${singleitem.id}`,saveredata, { headers });
          
          if(response.data.data =='SUCCESS'){
            
          Swal.fire({
            text: 'Item  updated Successful',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
          window.dispatchEvent(new Event("reloadlist"));
           }else{
            if(singleitem.extra !=null){
              setExtraList(singleitem.extra);
             
            }
            Swal.fire({
              text: 'Failed to update item',
              icon: 'success',
              timer: 2000, // The alert will automatically close after 3 seconds
              showConfirmButton: false, // Hide the confirm button
            });
           }
    } catch (error) {
      console.error("Error saving item:", error);
      Swal.fire({ text: "Failed to save item", icon: "error" });
    }
  };

  return (
    <>
      <section className="view-section">
      
        <div className="view-content">
          <ul className="nav nav-tabs" id="myTabs">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="tab" href="#info">
                <i className="bi bi-info-circle-fill"></i> Information
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#images">
                <i className="bi bi-image"></i> Images
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#variation">
                <i className="bi bi-grid-fill"></i> Variation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#extra">
                <i className="bi bi-link-45deg"></i> Extra
              </a>
            </li>
           
          </ul>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="info">
              <div className="info-section">
                <div className="info-left">
                  <p>Name : {singleitem?.name}</p>
                  <p>Category : {singleitem?.category}</p>
                  <p>Type : {singleitem?.item_type}</p>
                  <p>Status : {singleitem?.status}</p>
                  <p>Caution: {singleitem?.caution}</p>
                  <p>Description : {singleitem?.description}</p>
                </div>
                <div className="info-right">
                  <p>Price : $ {singleitem?.price}</p>
                  <p>Tax : $ {singleitem?.tax}</p>
                  <p>Featured : {singleitem?.is_featured}</p>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="images">
              <div className="image-container">
                <img src={itempic} alt="slider" />
                <div className="righ">
                  <p>Size: (262px, 182px)</p>
                  <input
                                          type="file"
                                          ref={fileInputRef}
                                          style={{ display: 'none' }} // Hide the file input
                                          accept="image/*" // Only accept image files
                                          onChange={handleFileChange}
                                        />
                  <button className="btn btn-primary" onClick={handleImageClick}>
                    <i className="bi bi-images"></i> Upload New Image
                  </button>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="variation">
              <button className="btn btn-primary" onClick={() => openPopup("variationPopup")}>
                <i className="bi bi-plus-circle"></i> Add Variation
              </button>
              <div>
    {Object.keys(groupedVariants).map((attribute) => (
      <div key={attribute}>
        <h5 className="fw-normal mt-3">{attribute}</h5>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedVariants[attribute].map((variant, index) => (
              <tr key={index}>
                <td>{variant.name}</td>
                <td>$ {variant.price}</td>
                <td class="actions">
                <a class="tooltip-container" onClick={()=>filtervariant(variant)}>
                                            <i class="fas fa-trash delete"></i>
                                            <span class="tooltip-text">Delete</span>
                                        </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
            </div>

            <div className="tab-pane fade" id="extra">
              <button className="btn btn-primary" onClick={() => openPopup("extraPopup")}>
                <i className="bi bi-plus-circle"></i> Add Extra
              </button>
              <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {extralist?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                     <td class="actions">
                                       
                                        <a class="tooltip-container" onClick={()=>filterextra(item)}>
                                            <i class="fas fa-trash delete"></i>
                                            <span class="tooltip-text">Delete</span>
                                        </a>
                                    </td>
                                </tr>
                                  ))}
                            </tbody>
                        </table>
            </div>

           
          </div>
        </div>
      </section>

      {/* Popups */}
      {["variationPopup", "extraPopup", "addonPopup"].map((popup) => (
        <div
          key={popup}
          className={`popup ${activePopup === popup ? "d-flex" : "d-none"}`}
          id={popup}
        >
          <div className="popup-content">
            <div className="header">
              <h5>{popup.replace("Popup", "")}</h5>
             
            </div>
            <form>
              {popup == "variationPopup" ? (
                <>
                  <div className="form-group">
                <label>Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Additional Price *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Attributes</label>
                <select name="attributes" className="form-select" value={formData.attributes} onChange={handleInputChange}>
                  <option value="">--</option>
                  <option value="Size">Size</option>
                  <option value="Quantity">Quantity</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status *</label>
                <div className="radio-group">
                  <input type="radio" name="status" value="active" checked={formData.status === "active"} onChange={handleInputChange} /> Active
                  <input type="radio" name="status" value="inactive" checked={formData.status === "inactive"} onChange={handleInputChange} /> Inactive
                </div>
              </div>
                </>
              ) : (
                <>
                <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Additional Price *</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            
            <div className="form-group">
              <label>Status *</label>
              <div className="radio-group">
                <input type="radio" name="status" value="active" checked={formData.status === "active"} onChange={handleInputChange} /> Active
                <input type="radio" name="status" value="inactive" checked={formData.status === "inactive"} onChange={handleInputChange} /> Inactive
              </div>
            </div>
              </>
              )}

              <div className="col-md-12 my-4 d-flex align-items-center justify-content-end buttons">
                <button type="reset" className="btn btn-outline-secondary closePopup" onClick={closePopup}>
                  <i className="bi bi-x-circle-fill"></i> Close
                </button>
              {activePopup =='variationPopup' &&  <button type="submit" onClick={handleSubmit} className="btn btn-primary ms-2">
                  <i className="bi bi-check-circle-fill"></i> Save
                </button> }

                {activePopup =='extraPopup' &&  <button type="submit" onClick={handleSubmit1} className="btn btn-primary ms-2">
                  <i className="bi bi-check-circle-fill"></i> Save
                </button> }  
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemViewComponent;

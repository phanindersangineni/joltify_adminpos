import { useEffect, useState } from "react";
import ItemViewComponent from "./ItemViewComponent";
import axios from "axios";
import Swal from "sweetalert2";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const CategoryComponent = () => {
  const itemsPerPage = 10;
  const [itemlist, setItemlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showitemdetail,setShowitemDetails] =useState(false);
  const [itemid,setItemId] =useState(null);

  useEffect(() => {
    loaditems();
  }, []);

  useEffect(() => {
      
    const reloaditems = async () => {
      
      loaditems();
    
    };

    window.addEventListener("reloadlist", reloaditems);
    return () => window.removeEventListener("reloadlist", reloaditems);
  }, []);

  const loaditems = async () => {
    setItemId(null);
    setLoading(true);
    setItemlist([]);
    let accesstoken = await localStorage.getItem("posaccesstoken");
    const headers = {
      "content-type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      token: accesstoken,
    };

    const response = await axios.get(`${DEV}/joltify/categories/search`, { headers });
    setItemlist(response.data.data);
    setLoading(false);
  };
  const [filters, setFilters] = useState({
    name: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setItemId(null);
    let filtered = itemlist.filter((item) => {
      return (
        (filters.name ? item.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
        (filters.status ? item.status === filters.status : true)
      );
    });

    setItemlist(filtered);
  };

  // Reset Filter
  const handleReset = () => {
    setFilters({
      name: null,
      status: null,
    });

    setFilteredItems(items);
  };

  const [formData, setFormData] = useState({
    name: null,
    status: "active"
   
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Submitting Form Data:", formData);

    try {
     
      const saveredata ={
        name:formData.name,
        status:formData.status,
       
      }
      // Simulating API call
      let accesstoken = await localStorage.getItem("posaccesstoken");
      const headers = {
        "content-type": "application/json",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        token: accesstoken,
      };
      console.log(saveredata);
     let response ={};
     
      if(itemid ==null){
  
      response = await axios.post(`${DEV}/joltify/categories`,saveredata, { headers });
      }else{
         response = await axios.put(`${DEV}/joltify/categories/${itemid}`,saveredata, { headers });
       
      }
      if(response.data.data.id){
        Swal.fire({
          text: 'Data added Successful',
          icon: 'success',
          timer: 2000, // The alert will automatically close after 3 seconds
          showConfirmButton: false, // Hide the confirm button
        });
        loaditems();
       // const openButton = document.getElementById("openForm");
        //const closeButton = document.getElementById("closeForm");
        const formContainer = document.getElementById("formContainer");

        formContainer.classList.remove("show");
    
      }else if(response.data.data =='SUCCESS'){
        Swal.fire({
          text: 'Data updated Successful',
          icon: 'success',
          timer: 2000, // The alert will automatically close after 3 seconds
          showConfirmButton: false, // Hide the confirm button
        });
        loaditems();
       // const openButton = document.getElementById("openForm");
        //const closeButton = document.getElementById("closeForm");
        const formContainer = document.getElementById("formContainer");

        formContainer.classList.remove("show");
      }
      else{
        Swal.fire({
          text: 'Failed to add Data',
          icon: 'success',
          timer: 2000, // The alert will automatically close after 3 seconds
          showConfirmButton: false, // Hide the confirm button
        });
      }
      
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  useEffect(() => {
    const openButton = document.getElementById("openForm");
    const closeButton = document.getElementById("closeForm");
    const formContainer = document.getElementById("formContainer");

    if (openButton && closeButton && formContainer) {
      openButton.addEventListener("click", () => {
        formContainer.classList.add("show");
      });

      closeButton.addEventListener("click", () => {
        formContainer.classList.remove("show");
      });
    }

    return () => {
      if (openButton && closeButton) {
        openButton.removeEventListener("click", () => {
          formContainer.classList.add("show");
        });

        closeButton.removeEventListener("click", () => {
          formContainer.classList.remove("show");
        });
      }
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = itemlist.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const[singleitem,setSingleItem] =useState(null);
  const viewItems = async(item) =>{
    
    setSingleItem(item);
    setShowitemDetails(true);
  }

  const edititem = async(item) =>{
    setItemId(item.id);
    setFormData(item);
    const openButton = document.getElementById("editForm");
    const closeButton = document.getElementById("closeForm");
    const formContainer = document.getElementById("formContainer");

    formContainer.classList.add("show");
  }

  return (
    <>
    {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <section className={`Items ${loading ? "blurred" : ""}`}>
        <div class="header">
          Dashboard / Categories / <span class="text-primary">View</span>
        </div>

        <div class="dashboard-items">

          <div class="top-bar">
            <h5 class="card-title">Categories</h5>
            <div class="buttons d-flex gap-2">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                  data-bs-display="static" aria-expanded="false">
                  10
                </button>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <li><a class="dropdown-item" href="#">1</a></li>
                  <li><a class="dropdown-item" href="#">2</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="collapse"
                  data-bs-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse">
                  <i class="bi bi-funnel"></i> Filter
                </button>
              </div>

              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                  data-bs-display="static" aria-expanded="false">
                  <i class="fa fa-file-export"></i> Export
                </button>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i> Print</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-filetype-xls"></i> XLS</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                  data-bs-display="static" aria-expanded="false">
                  <i class="bi bi-box-arrow-in-down"></i> Import
                </button>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <li><a class="dropdown-item" href="#"><i class="bi bi-folder"></i> Sample File</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-folder-plus"></i> Upload File</a></li>
                </ul>
              </div>

              <button class="add-item btn btn-primary" id="openForm"><i class="bi bi-plus-circle"></i> Add Item</button>
            </div>
          </div>

          <div id="formContainer">
            <div className="card card-body">
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <h5 className="m-0">Categories</h5>
                <button type="button" className="btn-close" id="closeForm"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row my-3">
                  <div className="col-md-6">
                    <label className="form-label">Name *</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                  
                </div>

                <div className="row mb-3">
                  
                  <div className="col-md-6">
                    <label className="form-label">Status</label><br />
                    <input type="radio" name="status" value="active" checked={formData.status === "active"} onChange={handleChange} /> Active
                    <input type="radio" name="status" value="inactive" checked={formData.status === "inactive"} onChange={handleChange} /> Inactive
                  </div>
                </div>

               
                <div className="col-md-12 d-flex align-items-end">
                  <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-check-circle"></i> Submit
                  </button>
                  <button type="reset" className="btn btn-outline-secondary" onClick={() => setFormData({
                    name: "",
                    status: "active"
                   
                  })}>
                    <i className="bi bi-x-circle"></i> Clear
                  </button>
                </div>
              </form>
            </div>
          </div>



          <div className="collapse mt-3" id="filterCollapse">
            <div className="filter-container">
              <form onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-md-3">
                    <label>NAME</label>
                    <input type="text" name="name" className="form-control custom-input" placeholder="Enter name" value={filters.name} onChange={handleFilterChange} />
                  </div>
               
                
                </div>

                <div className="row mt-3">
                 
                  <div className="col-md-3">
                    <label>STATUS</label>
                    <select name="status" className="form-select custom-select" value={filters.status} onChange={handleFilterChange}>
                      <option value="">--</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-12 my-4 d-flex align-items-end">
                    <button type="submit" className="btn btn-search me-2">
                      <i className="bi bi-search"></i> Search
                    </button>
                    <button type="button" className="btn btn-clear" onClick={handleReset}>
                      <i className="bi bi-x-circle"></i> Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>



          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td class="actions">
                          
                            <a onClick={()=>edititem(item)} id="editForm" class="tooltip-container">
                                <i class="fas fa-edit edit"></i>
                                <span class="tooltip-text">Edit</span>
                            </a>
                            <a class="tooltip-container">
                                <i class="fas fa-trash delete"></i>
                                <span class="tooltip-text">Delete</span>
                            </a>
                        </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="table-footer">
          <span class="add-content">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, itemlist.length)} of{" "}
          {itemlist.length} entries
        </span>
            <div className="flex justify-between items-center mt-4">
       

        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => changePage(currentPage - 1)}
          >
            &laquo;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => changePage(currentPage + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
          </div>
        </div>
      </section>

    
    </>
  )
}
export default CategoryComponent
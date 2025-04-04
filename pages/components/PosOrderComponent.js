import axios from "axios";
import { useEffect, useState } from "react";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const PosOrderComponent =({user, accessToken}) =>{

    const[orderlist,setOrderList] =useState([]);
    useEffect(() => {
        loadorders();
      }, []);

    const  loadorders = async() =>{
    
       
        const headers = {
          "content-type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          token: accessToken,
        };
        const response = await axios.get(`${DEV}/joltify/orders/search/N/${user.user_id}`, { headers });
        setOrderList(response.data.data);
     
    } 

    return(<>
    <section class="Items">
        <div class="header">
            Dashboard / <span class="text-secondary"> Orders</span>
        </div>

        <div class="dashboard-items">

            <div class="top-bar">
                <h5 class="card-title"> Orders</h5>
                <div class="buttons d-flex gap-2">
                   
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

                </div>
            </div>

           


            
            <div class="collapse mt-3" id="filterCollapse">
                <div class="filter-container">
                    <form>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="name">ORDER ID</label>
                                <input type="text" class="form-control custom-input"
                                 id="name" placeholder="Enter name"/>
                            </div>
                            <div class="col-md-3">
                                <label for="price">STATUS</label>
                                <select class="form-select custom-select" id="category">
                                <option>--</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                            </select>
                            </div>
                            <div class="col-md-3">
                                <label for="category">CUSTOMER</label>
                                <select class="form-select custom-select" id="category">
                                    <option>--</option>
                                    <option>Electronics</option>
                                    <option>Fashion</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="tax">DATE</label>
                                <input type="text" class="form-control custom-input"
                                 id="date" placeholder="Enter Date" />
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-12 my-4 d-flex align-items-end">
                                <button type="submit" class="btn btn-search me-2">
                                    <i class="bi bi-search"></i> Search
                                </button>
                                <button type="reset" class="btn btn-clear">
                                    <i class="bi bi-x-circle"></i> Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>



            <table>
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>ORDER TYPE</th>
                        <th>Table No</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {orderlist?.map((item, index) => (   
                    <tr key={index}>
                        <td>{item.orderid}</td>
                        <td><span class="text-danger">{item.ordertype}</span></td>
                        <td><span class="text-danger">{item?.tableno}</span></td>
                        
                        <td>{item.name}-{item.mobileno}</td>
                        <td>${item.total}</td>
                        <td>09:41 AM, 09-03-2025</td>
                        <td><span class="status">{item.orderstatus}</span></td>
                        <td class="actions">
                            <a href="posorderview.html" class="tooltip-container">
                                <i class="fas fa-eye view"></i>
                                <span class="tooltip-text">View</span>
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
           
        </div>
    </section>

     </>)
}
export default PosOrderComponent
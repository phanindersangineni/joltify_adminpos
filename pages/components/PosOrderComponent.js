import axios from "axios";
import { useEffect, useState } from "react";
export const DEV = process.env.NEXT_PUBLIC_API_URL;
import { useIntl } from "react-intl";

const PosOrderComponent =({user, accessToken}) =>{
    const itemsPerPage = 10;
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

    function formatteddate(frdate) {
        try {
            const date = new Date(frdate); // The given date
            console.log(frdate);

            let timezone = 'Asia/Kolkata';
            let z = 'en-IN';
            /*if (localStorage.getItem('language') == 'en') {
                timezone = 'Asia/Kolkata';
                z = 'en-IN';
            }*/

            // Format the date using Intl.DateTimeFormat
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',  // This will show the timezone abbreviation
                timeZone: timezone  // Set to IST
            };

            const formattedDate = new Intl.DateTimeFormat(z, options).format(
                date
            );

            return formattedDate;
        } catch (e) {
            return null;
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 0;
  if (orderlist) {
    totalPages = Math.ceil(orderlist?.length / itemsPerPage);
  }
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedItems = orderlist?.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
                                <option value="Created">Created</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Done">Done</option>
                                <option value="Delivered">Delivered</option>
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
                {displayedItems?.map((item, index) => (   
                    <tr key={index}>
                        <td>{item.orderid}</td>
                        <td><span class="text-danger">{item.ordertype}</span></td>
                        <td><span class="text-danger">{item?.tableno}</span></td>
                        
                        <td>{item.name}-{item.mobileno}</td>
                        <td>${item.total}</td>
                        <td>{formatteddate(item.orderdate)}</td>
                        <td><span class="status">{item.orderstatus}</span></td>
                        <td class="actions">
                            <a href={`/orderdetails?orderid=${item.orderid}`} class="tooltip-container">
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
            <div class="table-footer">
            <span class="add-content">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, orderlist?.length)} of{" "}
              {orderlist?.length} entries
            </span>
            <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  onClick={() => changePage(currentPage - 1)}
                >
                  &laquo;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                      }`}
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
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

     </>)
}
export default PosOrderComponent
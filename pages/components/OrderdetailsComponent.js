import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import RecieptComponent from "./RecieptComponent";

export const DEV = process.env.NEXT_PUBLIC_API_URL;

const OrdedetailsComponent = ({ user, accessToken }) => {

    const router = useRouter();
    const { orderid } = router.query;
    console.log(orderid);
    const[droparray,setDroparray] =useState([]);
    useEffect(() => {
       if(orderid){
        getoderdetails(orderid);
       }
        
      }, [orderid]);

      const[order,setOrder] =useState({});
      const[items,setItems]=useState([]);
    
      const getoderdetails = async(orderid) =>{
        const headers = {
          "content-type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          token: accessToken,
        };
       
        const response = await axios.get(`${DEV}/joltify/orders/search/${orderid}/${user.user_id}`, { headers });
        console.log(response);
        setOrder(response.data.data[0]);
        setItems(response.data.data[0].items);
         if(response.data.data[0].orderstatus =='Created'){
            setDroparray(['Accept','Rejected']);
         }
         if(response.data.data[0].orderstatus =='Accept'){
            setDroparray(['Preparing']);
         }
         if(response.data.data[0].orderstatus =='Preparing'){
            setDroparray(['Prepared']);
         }
         if(response.data.data[0].orderstatus =='Prepared'){
            setDroparray(['Done']);
         }
         if(response.data.data[0].orderstatus =='Done'){
            setDroparray(['Delivered']);
         }

      }   
      function formatteddate(frdate) {
        try {
            const date = new Date(frdate); // The given date
           
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

    const handleStatusChange = async(newStatus) => {
        //setStatus(newStatus);
        console.log('Selected status:', newStatus);

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
          };
         
          const response = await axios.get(`${DEV}/joltify/orders/update/${order.orderid}/${newStatus}`, { headers });
        
          if(response.data.data =='SUCCESS'){
            getoderdetails(order.orderid);
          }
        
      };
      function openReceiptPopup() {
       
        document.getElementById('receipt').style.display = "flex";
    }
     function closReceiptmodal() {
        document.getElementById('receipt').style.display = "none";
     }
    return (
      <>
        <section className="pos posorderview">
          <div className="pop-content">
            
          </div>
  
          <div className="dashboard-items">
            <div className="order-header">
              <div className="orderid">
                <h5 className="fs-4 pb-2 align-items-center">
                  <span className="text-secondary">Order ID:</span> #{orderid}
                  <span
                    style={{
                      marginLeft: "20px",
                      fontSize: "14px",
                      color: "rgb(3, 138, 3)",
                      background: "rgba(179, 248, 179, 0.425)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    Paid
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "14px",
                      color: "rgb(29, 118, 235)",
                      background: "rgba(179, 215, 248, 0.425)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {order.orderstatus}
                  </span>
                </h5>
  
                <div className="order-details">
                  <p className="text-secondary">
                    <i className="bi bi-calendar3 me-3"></i>
                    <span>{formatteddate(order.orderdate)}</span>
                  </p>
                  <p>
                    <span>Payment Type:</span> {order.paymenttype}
                  </p>
                  <p>
                    <span>Order Type:</span> {order.ordertype}
                  </p>
                 {order?.updated_at !=null && <p>
                    <span>Delivery Time:</span> {formatteddate(order?.updated_at)}
                   
                  </p> }
                 
                  <p>
                    <span>Table No:</span> {order.tableno}
                  </p>
                </div>
              </div>
  
              <div className="buttons d-flex gap-2">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    Paid
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                    <li>
                      <a className="dropdown-item" href="#">
                        Paid
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Unpaid
                      </a>
                    </li>
                  </ul>
                </div>
  
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    {order.orderstatus} 
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
        {droparray.map((item) => (
          <li key={item}>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent page jump
                handleStatusChange(item);
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
                </div>
  
                <button onClick={openReceiptPopup} className="add-item btn btn-primary" id="">
                  <i className="bi bi-printer"></i> Print Invoice
                </button>
              </div>
            </div>
          </div>
  
          <div className="section2 d-flex">
            <div className="w-50">
              <div className="items-img">
                <div className="heading">
                  <h5>Delivery Information</h5>
                </div>
  
                {items?.map((item, index) => ( 
                  <div className="order-items" key={index}>
                    <div className="left">
                      <span>{item.quantity}</span>
                      <img
                        src="/assets/images/all-category.png"
                        alt="burger"
                      />
                    </div>
                    <div className="item-details">
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      {item.variants?.map((variant, index) => (
                <p key={index}>{variant.key}: {variant.name} - $ {variant.price}</p>
                ))} 
                {item.extras?.map((extra, index) => (
                  <p key={index}>{extra?.name} - ${extra?.price}.</p>
                ))}
                      <p>
                        <strong>$ {item.price}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="w-50">
              <div className="amount-details d-flex justify-content-between">
                <div className="left">
                  <p>Subtotal</p>
                  <p>Discount</p>
                  <p className="mt-4">
                    <strong>Total</strong>
                  </p>
                  <p>Tax</p>
                  <p className="mt-4">
                    <strong>Payable Amount</strong>
                  </p>
                </div>
                <div className="right">
                  <p>$ {order.subtotal}</p>
                  <p>$ {order.discount}</p>
                  <p className="mt-4">
                    <strong>$ {order.total}</strong>
                  </p>
                  <p>$ {order.tax}</p>
                  <p className="mt-4">
                    <strong>$ {order.payableamount}</strong>
                  </p>
                </div>
              </div>
  
              <div className="delivery-information">
                <div className="heading">
                  <h5>Delivery Information</h5>
                </div>
  
                <div className="profile">
                  <img src="/assets/images/profile.png" alt="profile" />
                  <h6>{order.customername}</h6>
                </div>
                <div className="contact-details">
                 
                  <p>
                    <i className="bi bi-telephone"></i> +{order.customerno}
                  </p>
                </div>
              </div>
            </div>
          </div>
         {order?.orderid && <div class="receiptpopup" id="receipt">
           <RecieptComponent orderid ={order?.orderid} user ={user} closeReceiptAction ={closReceiptmodal}
            accessToken ={accessToken}/>
        </div> }
        </section>
      </>
    );
  };
  
  export default OrdedetailsComponent;
  
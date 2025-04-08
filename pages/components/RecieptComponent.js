import React, { useEffect, useState } from "react";
import "./ReceiptComponent.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const overlayStyle = {
  position: 'fixed',
  top: '100%',
  left: '100%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.3)',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999, // Optional, ensures it stays on top
};

const receiptStyle = {
  maxWidth: '350px',
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
};
const RecieptComponent = ({user,accessToken,orderid,closeReceiptAction}) => {
  const { removecart } = useAuth();
  useEffect(() => {
    getoderdetails();
    
  }, []);

  const closeReceipt =() =>{
    removecart();
    closeReceiptAction('receipt');
  }

  const[order,setOrder] =useState({});
  const[items,setItems]=useState([]);

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

  const getoderdetails = async() =>{
    const headers = {
      "content-type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      token: accessToken,
    };
    
    const response = await axios.get(`${DEV}/joltify/orders/search/${orderid}/${user.user_id}`, { headers });
    console.log(response);
    setOrder(response?.data?.data[0]);
    setItems(response?.data?.data[0]?.items);
  }
  return (
    <div className={overlayStyle}>
      <div className="receipt">
        <div className="btn-container">
          <button className="btn1" onClick={closeReceipt}>
            <i className="bi bi-chevron-left"></i> Close
          </button>
          <button className="btn1 btn1-print">
            <i className="fas fa-print"></i> Print Invoice
          </button>
        </div>
        <div className="header mt-2">
          <p>{order?.restaurantname} </p>
         
          <p className="address">
           {order?.address}
          </p>
        </div>
        <div className="order-info">
        <p>
            <strong>Customer Name :</strong>
            <br />
            {order?.customername}
          </p>
          <p>
            <strong>Contact :</strong>
            <br />
            {order?.customerno}
          </p>
          <p>
            <strong>Order # {order?.orderid}</strong>
            <br />
            {order?.ordereddateformatted}
          </p>
        </div>
        <div className="items">
          <table className="table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Item Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
            {items?.map((item, index) => ( 
              <tr>
                <td>{item?.quantity}</td>
                <td>
                {item?.name}
                  <br />
                  
                  {item.variants?.map((variant, index) => (
                <small key={index}>{variant.key}: {variant.name} - $ {variant.price}</small>
                ))} <br/>
                {item.extras?.map((extra, index) => (
                  <small key={index}>{extra?.name} - ${extra?.price}.</small>
                ))}
                </td>
                <td>₹ {item?.price}</td>
              </tr>
               ))}
              <tr>
                <td></td>
                <td>VAT (5.00%)</td>
                <td>₹0.12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="totals">
          <p>
            Subtotal: <span className="float-end">₹ {order?.total}</span>
          </p>
          <p>
            Total Tax: <span className="float-end">₹ 0</span>
          </p>
          <p>
            Discount: <span className="float-end">₹{order?.discount}</span>
          </p>
          <p>
            <strong>
              Total: <span className="float-end">₹ {order?.total}</span>
            </strong>
          </p>
        </div>
        <div className="order-info">
          <p>
            Order Type: {order?.ordertype}
            <br />
            Payment Type: {order?.paymenttype}
            <br/>
            Order Date :{formatteddate(order?.orderdate)}
          </p>
        </div>
        
        <div className="footer text-center mt-2">
          <p>Thank You<br />Please Come Again</p>
          <p className="text-muted">
            Powered by Joltify 
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecieptComponent;

import React from "react";
import "./ReceiptComponent.css";

const RecieptComponent = () => {
  return (
    <div className="popup">
      <div className="receipt">
        <div className="btn-container">
          <button className="btn1">
            <i className="bi bi-chevron-left"></i> Close
          </button>
          <button className="btn1 btn1-print">
            <i className="fas fa-print"></i> Print Invoice
          </button>
        </div>
        <div className="header mt-2">
          <p>Desi Restaurant </p>
         
          <p className="address">
            House: 25, Road No: 2, Block A, Mirpur-1, Dhaka 1216<br />
            Tel: +536464646464
          </p>
        </div>
        <div className="order-info">
        <p>
            <strong>Customer Name :</strong>
            <br />
            Demo User
          </p>
          <p>
            <strong>Contact :</strong>
            <br />
           7292727277
          </p>
          <p>
            <strong>Order #1603256</strong>
            <br />
            16-03-2025 07:47 PM
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
              <tr>
                <td>1</td>
                <td>
                  Chicken Dumplings
                  <br />
                  <small>Size: Regular - 8 pcs</small>
                </td>
                <td>₹2.38</td>
              </tr>
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
            Subtotal: <span className="float-end">₹0.00</span>
          </p>
          <p>
            Total Tax: <span className="float-end">₹0.00</span>
          </p>
          <p>
            Discount: <span className="float-end">₹0.00</span>
          </p>
          <p>
            <strong>
              Total: <span className="float-end">₹2.50</span>
            </strong>
          </p>
        </div>
        <div className="order-info">
          <p>
            Order Type: Takeaway
            <br />
            Payment Type: Cash
          </p>
        </div>
        <div className="token">Token #1234</div>
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

const Invoice = ({paymentAction ,closePayAction}) => {

  const openPaymentAction =(e)=>{
    e.preventDefault();
    paymentAction('payment');
  }
  const closePaymentAction =(e)=>{
    e.preventDefault();
    closePayAction('payment');
  }
    return (
      <div className="invoice">
        <table className="invoice-table">
          <thead>
            <tr>
              <th className="item">Item</th>
              <th>Qty</th>
              <th className="items-price">Price</th>
            </tr>
          </thead>
  
          <tbody>
            <tr className="border-bottom">
              <td className="itemname">
                <span className="me-2">
                  <i className="bi bi-trash text-danger"></i>
                </span>
                <p>
                  Chicken Dumplings <br />
                  <span>Size: Regular - 8 Pcs.</span>
                </p>
              </td>
              <td>
                <h6></h6>
                <i className="bi bi-plus-circle"></i> <span>1</span>{" "}
                <i className="bi bi-dash-circle"></i>
              </td>
              <td className="items-price">$2.50</td>
            </tr>
  
            {/* Corrected Discount & Table Select Row */}
            <tr>
              <td colSpan="3">
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  <select className="select-table form-select">
                    <option>Select Table</option>
                    <option>Table 1</option>
                    <option>Table 2</option>
                    <option>Table 3</option>
                  </select>
                  <input type="text" placeholder="Add Discount" className="form-control" />
                  <button className="btn">Apply</button>
                </div>
              </td>
            </tr>
  
            <tr>
              <td className="items-name">Sub Total</td>
              <td></td>
              <td className="items-price">$0.00</td>
            </tr>
            <tr>
              <td className="items-name">Discount</td>
              <td></td>
              <td className="items-price">$0.00</td>
            </tr>
            <tr>
              <td className="items-name">
                <strong>Total</strong>
              </td>
              <td></td>
              <td className="items-price">
                <strong>$0.00</strong>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div className="buttons w-100 d-flex gap-4 px-2 py-4">
          <a href="#" onClick={(e) =>closePaymentAction(e)} className="btn">
            Cancel
          </a>
          <a href="#" onClick={(e) =>openPaymentAction(e)} className="btn order" id="openpayment">
            Order
          </a>
        </div>
      </div>
    );
  };
  
  export default Invoice;
  
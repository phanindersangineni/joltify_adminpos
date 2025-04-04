import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

const Invoice = ({ paymentAction, closePayAction,quantity,
  selectedCustomer,selectedTable,orderType }) => {
  const { cart,cartitems,removecart } = useAuth();

  console.log("invoice");
  console.log(cartitems);
  const[subtotal,setSubtotal] =useState(0);
  const[total,setTotal] =useState(0);
 
  const [discount,setDiscount] =useState(0);
  const [discounttotal,setDiscountTotal] =useState(0);
  const openPaymentAction = (e) => {
    e.preventDefault();
    if(cartitems ==null){
      Swal.fire({
        text: 'Please add items to create order',
        icon: 'failure',
        timer: 2000, // The alert will automatically close after 3 seconds
        showConfirmButton: false, // Hide the confirm button
      });
    }
    else if(!selectedCustomer) {
      Swal.fire({
        text: 'Please select customer',
        icon: 'failure',
        timer: 2000, // The alert will automatically close after 3 seconds
        showConfirmButton: false, // Hide the confirm button
      });
  
    }else{
     
      if(orderType =='Dine-In'){
        if(!selectedTable){
          Swal.fire({
            text: 'Please choose table',
            icon: 'failure',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
        }else{
          const paymentdata ={
            subtotal:subtotal,
            total:total,
            discounttotal:discounttotal
          }
          paymentAction(paymentdata);
        }
      }else{

        const paymentdata ={
          subtotal:subtotal,
          total:total,
          discounttotal:discounttotal
        }
        paymentAction(paymentdata);
        
       
      }

    }

   
   
  }
  const closePaymentAction = (e) => {
   
    closePayAction('payment');
  }

  useEffect(() => {

    //loadtabledata();
   reloadcartprice();

}, [quantity,cartitems]);

/*const loadtabledata =async() =>{
  const headers = {
    "content-type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    token: accessToken,
  };

  const response = await axios.get(`${DEV}/joltify/tableinfo/search/${user?.user_id}`, { headers });
  setTable(response.data.data);
}*/

const applydiscount =() =>{

  let finalprice = subtotal;
  let discountss = Math.ceil(discount /100 * parseFloat(subtotal));
  let newtotal = Math.ceil(parseFloat(finalprice) -parseFloat(discountss));
  setDiscountTotal(discountss);
  setTotal(newtotal);


}

const updateQty = (type,cartitem) => {
  let updatedCart = cartitems.map(item => {
    if (JSON.stringify(item) === JSON.stringify(cartitem)) {
        // If the item matches, update its quantity
        return {
            ...item,
            quantity: type === 'Increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 1)
        };
    }
    return item;
});

cart(updatedCart); 


}
const removeItem = (cartitem) => {
  let updatedCart = cartitems.filter(item => JSON.stringify(item) !== JSON.stringify(cartitem));
  console.log("FFFF");
  if(updatedCart.length >0){
  cart(updatedCart); // Update the cart state
   }else{
    removecart();
   }
};

const reloadcartprice =() =>{
    let finalprice =0;
    console.log(cartitems);
   cartitems?.forEach(element => {
     
      if(element.extras.length ==0 && element.variants.length ==0){
        finalprice = finalprice+ parseFloat(element?.price) * element.quantity;
      }
      else{
        let price =0;
            if(element.extras.length >0){
              element.extras.forEach(extraelement => {
                  price =parseFloat(price)+ parseFloat(extraelement.price);  
            });
            }
            if(element.variants.length >0){
              element.variants.forEach(variantelement => {
                  price =parseFloat(price)+ parseFloat(variantelement.price);  
            });
            }
       
            finalprice = finalprice+ (parseFloat(element?.price)+parseFloat(price)) * element.quantity;

      }
    
   });

   setSubtotal(finalprice);
   setTotal(finalprice);

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
        {cartitems?.map((cartitem, index) => ( 
          <tr key ={index} className="border-bottom">
            <td className="itemname">
              <span className="me-2" onClick={()=>removeItem(cartitem)}>
                <i className="bi bi-trash text-danger"></i>
              </span>
              <p>
                {cartitem?.name} <br />
                {cartitem.variants?.map((variant, index) => (
                <span key={index}>{variant.key}: {variant.name} - $ {variant.price}</span>
                ))} <br/>
                {cartitem.extras?.map((extra, index) => (
                  <span key={index}>{extra?.name} - ${extra?.price}.</span>
                ))}
              </p>
            </td>
            <td>
              <h6></h6>
              <i className="bi bi-plus-circle" onClick={() => updateQty('Increment',cartitem)}></i> <span>{cartitem?.quantity}</span>{" "}
              <i className="bi bi-dash-circle" onClick={() => updateQty('decrement',cartitem)}></i>
            </td>
            <td className="items-price">$ {cartitem?.price}</td>
          </tr>
 ))}
          


          {/* Corrected Discount & Table Select Row */}
          <tr>
            <td colSpan="6">
              <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
               
                <input type="text" onChange={(e)=>setDiscount(e.target.value)} placeholder="Discount(%)" className="form-control" />
                <button className="btn" onClick={applydiscount}>Apply</button>
              </div>
            </td>
          </tr>

          <tr>
            <td className="items-name">Sub Total</td>
            <td></td>
            <td className="items-price">${subtotal}</td>
          </tr>
          <tr>
            <td className="items-name">Discount</td>
            <td></td>
            <td className="items-price">$ {discounttotal}</td>
          </tr>
          <tr>
            <td className="items-name">
              <strong>Total</strong>
            </td>
            <td></td>
            <td className="items-price">
              <strong>$ {total}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="buttons w-100 d-flex gap-4 px-2 py-4">
        <a href="#" onClick={(e) => closePaymentAction(e)} className="btn">
          Cancel
        </a>
        <a href="#" 
           onClick={(e) => openPaymentAction(e)} className="btn order" id="openpayment">
          Order
        </a>
      </div>
    </div>
  );
};

export default Invoice;

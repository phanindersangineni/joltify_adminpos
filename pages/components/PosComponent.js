import { useEffect, useState } from "react";
import AddItemComponent from "./AddItemComponent";
import AddPaymentComponent from "./AddPaymentComponent";
import Invoice from "./InvoiceComponent"
import Menu from "./MenuComponent"
import RecieptComponent from "./RecieptComponent";
import axios from "axios";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const PosComponent  =() =>{

    const[itemlist,setItemList] =useState([]);
    const[singleitem,setSingleItem] =useState(null);

    useEffect(() => {
        loaditems();
      }, []);
    
      const loaditems = async() =>{
        let accesstoken = await localStorage.getItem("posaccesstoken");
        const user = await localStorage.getItem('posuser');
      
        const headers = {
          "content-type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          token: accesstoken,
        };
        const response = await axios.get(`${DEV}/joltify/items/search/${user.id}`, { headers });
        setItemList(response.data.data);
      }


    const filteritembycategory =(catitem)=>{

    }
    


    function openPopup(popupId) {
       
        document.getElementById(popupId).style.display = "flex";
    }

    function openItemPopup(popupId,item) {
        setSingleItem(item);
       
        document.getElementById(popupId).style.display = "flex";
    }

    function closemodal(popupId) {
        document.getElementById(popupId).style.display ='none';
    }

    return(
        <>
        
        <section class="pos">
        <div class="pop-content">
            <div class="pop-left">
                <div class="search-container">
                    <input type="text" class="form-control search-input" 
                    placeholder="Search by Menu Item"/>
                    <button class="search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>

               <Menu categoryClickAction ={filteritembycategory}/>

                <div class="menu-container pos-items">
                 
                {itemlist.map((item, index) => ( 
                    <div key={index} class="items-card">
                        <div class="item-image">
                            <img src ={`${DEV}/items/files/${item.image}`} alt="Chicken Dumplings" />
                        </div>
                        <div class="item-info">
                            <h6>{item.name}</h6>
                            <div class="buttons">
                                <span class="price">$ {item.price}</span>
                                <a href="#" onClick={()=>openItemPopup('additems',item)} class="add-button" id="openadditems"><i class="bi bi-cart4"></i> Add</a>
                            </div>
                        </div>
                    </div>
    ))}
                   

                </div>
            </div>




            <div class="pop-right">
                <div class="first">
                    <select class="form-select">
                        <option>Search Customer</option>
                        <option>John Doe</option>
                        <option>Walking Customer</option>
                        <option>Will Smith</option>
                        <option>Kiron Khan</option>
                        <option>Farha Israt</option>
                        <option>Rohim Miya</option>
                        <option>Sakib Duronto</option>
                        <option>Maruf Khan</option>
                    </select>
                    <a href="#" class="btn btn-primary" onClick={()=>openPopup('addcustomer')}
                     id="openaddcustomer"><i class="bi bi-plus-circle"></i> Add</a>
                </div>
                <div class="token">
                    <input type="text" name="" id="" placeholder="Token No" />
                </div>
                <div class="order">
                    <div class="order-container">
                        <label class="order-label">Select Order Type</label>
                        <div class="order-type">
                            <label class="order-option">
                                <input type="radio" name="order" checked />
                                <span>Dine-In</span>
                            </label>
                            <label class="order-option">
                                <input type="radio" name="order" />
                                <span>Takeaway</span>
                            </label>
                        </div>
                        <select class="select-table form-select">
                            <option>Select Table</option>
                            <option>Table 1</option>
                            <option>Table 2</option>
                            <option>Table 3</option>
                        </select>
                    </div>
                </div>


               <Invoice  paymentAction ={openPopup} closePayAction={closemodal}/>




            </div>
        </div>


        <div class="add-customer  " id="addcustomer" >
            <div class="popup-add-customer">
                <div class="header">
                    <h5>Customers</h5>
                </div>
                <form>
                    <div class="form-group">
                        <label>Name *</label>
                        <input type="text" required />
                    </div>
                    
                    <div class="form-group">
                        <label>Phone *</label>
                        <input type="number" required/>
                    </div>
                   
                    <div class="col-md-12 mt-3 d-flex align-items-center  buttons">
                        <button type="submit" class="btn btn-primary me-2">
                            <i class="bi bi-check-circle-fill"></i> Save
                        </button>
                        <button onClick={()=>closemodal('addcustomer')} type="reset" class="btn btn-outline-secondary closePopup">
                            <i class="bi bi-x-circle-fill"></i> Close
                        </button>

                    </div>
                </form>
            </div>
        </div>


        <div class="add-items" id="additems">
           <AddItemComponent  closeActionItem={closemodal} item ={singleitem}/>
        </div>

        <div class="payment-modal" id="payment">
            <AddPaymentComponent openReceiptAction={openPopup}/>
        </div>


        <div class="receiptpopup" id="receipt">
           <RecieptComponent/>
        </div>
    </section>
        </>
    )
}
export default PosComponent

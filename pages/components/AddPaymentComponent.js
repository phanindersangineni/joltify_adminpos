import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";;
import axios from "axios";
import Swal from "sweetalert2";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const AddPaymentComponent = ({ openReceiptAction,
    selectedCustomer, selectedTable, orderType, paymentamount,user,
    accessToken,closepaymentAction }) => {
    const { cart, cartitems, removecart } = useAuth();
    console.log(paymentamount);
    const [selectedMethod, setSelectedMethod] = useState(null); // Default is no selection
    const [recievedamount,setRecievedAmount] =useState(0);
    const handlePaymentSelect = (method) => {
        setSelectedMethod(method); // Update selected payment method
    };

    const closepayment =() =>{
        closepaymentAction('payment');
    }
    const[payable,setPayable] =useState(paymentamount?.payable);


    useEffect(() => {

        //loadtabledata();
       setAmount();
    
    }, [paymentamount?.payable]);
    
    const setAmount =() =>{
        setPayable(paymentamount?.payable);
        
        setTip(0);
        setTipdisplay(null);
    }

    const[tip,setTip] =useState(0);
    const[tipdisplay,setTipdisplay] =useState(null);
    const handleTipSelect =(val) =>{
        let total =paymentamount.total;
        let tip = Math.ceil(val /100 * parseFloat(total));
        console.log(tip);
        let payableA = parseFloat(paymentamount?.payable) +parseFloat(tip);
        console.log(payableA);
        setPayable(payableA);
        //let dis = tip+ `$(${val})`;
        setTipdisplay(val);
        setTip(tip);
    }

    const openreceipt = async() => {
        
        if(selectedMethod ==null){
            Swal.fire({
                text: 'Please select the payment method',
                icon: 'error',
                timer: 2000, // The alert will automatically close after 3 seconds
                showConfirmButton: false, // Hide the confirm button
              });

        }else{

        const createorderdata = {
            items: cartitems,
            mobileno:selectedCustomer,
            ordertype: orderType,
            tableno: selectedTable,
            payableamount: payable,
            subtotal: paymentamount.subtotal,
            discount: paymentamount.discounttotal,
            paymenttype: selectedMethod,
            discounttype: "PERCENTAGE",
            customertype:'POS',
            createdby:user.userid,
            tax:paymentamount.tax,
            total:paymentamount.total,
            orderstatus:'Accept',
            restaurantid:user.restaurantid,
            tip:tip

        }

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
          };
       // const response = await fetch(`http://localhost:3000/customers/search?name=${searchTerm}`);
        //const data = await response.json();
        const response = await axios.post(`${DEV}/joltify/orders`,createorderdata, { headers });
        if(response.data.OrderID) {
            
              openReceiptAction(response.data.OrderID);   

        }else{
            Swal.fire({
                text: 'Failed to create an order , Please contact admin',
                icon: 'error',
                timer: 2000, // The alert will automatically close after 3 seconds
                showConfirmButton: false, // Hide the confirm button
              });
        }
    }
        
    }

    return (
        <>
            <div class="order">
                <div class="header">
                    <h5>Payments</h5>
                    <span class="close" onClick={closepayment}><i class="bi bi-x-circle text-danger"></i></span>
                </div>
               {payable && <div class="totalamount">
                    <p>Total Amount</p>
                    <div class="amount">$ {payable}</div>
                </div> }

                <div class="totalamount">
                <h5>Select Tip ({tipdisplay} %) : $ {tip}  </h5>
                </div>
                
                <div class="payment-methods">
                    
                    <button onClick={() => handleTipSelect(15)}>
                        <i className="bi bi-cash-coin"></i> (15 %)
                    </button>
                    <button onClick={() => handleTipSelect(20)}>
                        <i className="bi bi-cash-coin"></i> (20 %)
                    </button>
                    <button onClick={() => handleTipSelect(25)}>
                        <i className="bi bi-cash-coin"></i> (25 %)
                    </button>
                    <button onClick={() => handleTipSelect(0)}>
                        <i className="bi bi-cash-coin"></i> Skip
                    </button>
                   
                </div>
                <div class="totalamount">
                <h5>Select Payment Method : {selectedMethod}</h5>
                </div>

                <div class="payment-methods">
                    
                    <button onClick={() => handlePaymentSelect("Cash")}>
                        <i className="bi bi-cash-coin"></i> Cash
                    </button>
                    <button onClick={() => handlePaymentSelect("Card")}>
                        <i className="bi bi-credit-card-fill"></i> Card
                    </button>
                    <button onClick={() => handlePaymentSelect("Other")}>
                        <i className="bi bi-bookmarks-fill"></i> Other
                    </button>
                    <button onClick={() => handlePaymentSelect("Offline")}>
                        <i className="bi bi-bookmarks-fill"></i> Offline
                    </button>
                </div>
               {/* <div class="inputbox">
                    <h5>Enter Received Amount</h5>
                    <input type="text" maxLength={6} onChange={(e)=>setRecievedAmount(e.target.value)}
                        style={{ width: "100%", padding: "13px", marginBottom: "10px" }} />
                </div>
                <div class="keypad-container">
                    <div class="keypad">
                        <button>1</button> <button>2</button> <button>3</button>
                        <button>4</button> <button>5</button> <button>6</button>
                        <button>7</button> <button>8</button> <button>9</button>
                        <button>00</button> <button>0</button> <button>.</button>
                    </div>
                    <div class="side-buttons">
                        <button><i class="bi bi-backspace-fill"></i></button>
                        <button>Clear</button>
                    </div>
    </div>*/}
                <div class="buttons">
                    <button onClick={openreceipt} class="confirm" id="openreceipt">Confirm & Print Receipt</button>

                </div>
            </div>
        </>
    )
}
export default AddPaymentComponent

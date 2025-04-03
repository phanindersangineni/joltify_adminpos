import { useState } from "react";
import { useAuth } from "../AuthContext";


const AddPaymentComponent = ({ openReceiptAction,
    selectedCustomer, selectedTable, orderType, paymentamount,user,
    accessToken }) => {
    const { cart, cartitems, removecart } = useAuth();

    const [selectedMethod, setSelectedMethod] = useState(null); // Default is no selection
    const [recievedamount,setRecievedAmount] =useState(0);
    const handlePaymentSelect = (method) => {
        setSelectedMethod(method); // Update selected payment method
    };

    const openreceipt = async() => {
        

        const createorderdata = {
            items: cartitems,
            name: selectedCustomer.name,
            mobileno: selectedCustomer.mobileno,
            ordertype: orderType,
            tableno: selectedTable,
            total: paymentamount.total,
            subtotal: paymentamount.subtotal,
            discount: paymentamount.discounttotal,
            paymenttype: 'Cash',
            discounttype: "PERCENTAGE",
            customertype:'POS',
            createdby:user.user_id

        }

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
          };
       // const response = await fetch(`http://localhost:3000/customers/search?name=${searchTerm}`);
        //const data = await response.json();
        const response = await axios.get(`${DEV}/joltify/orders`, { headers });
  


        openReceiptAction('receipt');
    }

    return (
        <>
            <div class="order">
                <div class="header">
                    <h5>Customers</h5>
                    <span class="close"><i class="bi bi-x-circle text-danger"></i></span>
                </div>
                <div class="totalamount">
                    <p>Total Amount</p>
                    <div class="amount">$ {paymentamount?.total}</div>
                </div>
                <div class="payment-methods">
                    <h5>Select Payment Method</h5> <br/>
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

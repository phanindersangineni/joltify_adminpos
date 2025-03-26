

const AddPaymentComponent=({openReceiptAction}) =>{

    const openreceipt =() =>{
        openReceiptAction('receipt');
    }

    return(
        <>
        <div class="order">
                <div class="header">
                    <h5>Customers</h5>
                    <span class="close"><i class="bi bi-x-circle text-danger"></i></span>
                </div>
                <div class="totalamount">
                    <p>Total Amount</p>
                    <div class="amount">$2.25</div>
                </div>
                <div class="cards">
                    <h5>Select Payment Method</h5>
                    <div class="payment-methods">
                        <button><i class="bi bi-cash-coin"></i>Cash</button>
                        <button><i class="bi bi-credit-card-fill"></i>Card</button>
                        <button><i class="bi bi-tablet-fill"></i>MFS</button>
                        <button><i class="bi bi-bookmarks-fill"></i>Other</button>
                    </div>
                </div>
                <div class="inputbox">
                    <h5>Enter Received Amount</h5>
                    <input type="text"   style={{ width: "100%", padding: "13px", marginBottom: "10px" }} />
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
                </div>
                <div class="buttons">
                    <button onClick ={openreceipt} class="confirm" id="openreceipt">Confirm & Print Receipt</button>

                </div>
            </div>
        </>
    )
}
export default AddPaymentComponent

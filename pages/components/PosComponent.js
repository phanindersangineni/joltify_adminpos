import { useEffect, useState } from "react";
import AddItemComponent from "./AddItemComponent";
import AddPaymentComponent from "./AddPaymentComponent";
import Invoice from "./InvoiceComponent"
import Menu from "./MenuComponent"
import RecieptComponent from "./RecieptComponent";
import axios from "axios";
import AddCustomerComponent from "./AddCustomerComponent";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const PosComponent = ({ user, accessToken }) => {

    const [itemlist, setItemList] = useState([]);
    const [singleitem, setSingleItem] = useState(null);
    const [tablelist, setTableList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedTable, setSelectedTable] = useState("");
    const [loading, setLoading] = useState(true);
    const [orderType, setOrderType] = useState("Dine-In"); // Default selection
    const [paymentamount, setPaymentamount] = useState(null);
    const [orderid, setOrderid] = useState(null);
    const [filteredlist, setFilteredList] = useState([]);

    const handleOrderChange = (event) => {
        setOrderType(event.target.value); // Update selected value
    };
    useEffect(() => {

        //  document.getElementById('receipt').style.display = "flex";
        loaditems();

    }, []);

    const loaditems = async () => {

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
        };
        const response = await axios.get(`${DEV}/joltify/items/search/${user.user_id}`, { headers });
        setItemList(response.data.data);
        setFilteredList(response.data.data);

        const response1 = await axios.get(`${DEV}/joltify/tableinfo/search/${user.user_id}`, { headers });
        setTableList(response1.data.data);
    }


    const filteritembycategory = (catitem) => {

        console.log(catitem);
        if (catitem.id != 0) {
            let filtered = itemlist.filter(item => parseInt(item.category) === catitem.id);
            setFilteredList(filtered);
        } else {
            setFilteredList(itemlist);
        }


    }

    const [quantity, setQuantity] = useState(Date.now()); // Initialize with timestamp

    const updateQuantity = () => {
        setQuantity(Date.now()); // Updates quantity on every call
    };

    function paymentpopup(data) {
        setPaymentamount(data);
        document.getElementById('payment').style.display = "flex";
    }

    function openReceiptPopup(orderid) {
        setQuantity(Date.now());
        setOrderid(orderid);
        document.getElementById('payment').style.display = 'none';
        document.getElementById('receipt').style.display = "flex";
    }

    function openPopup(popupId) {

        document.getElementById(popupId).style.display = "flex";
    }

    function openItemPopup(popupId, item) {
        setSingleItem(item);
        setQuantity(Date.now());

        document.getElementById(popupId).style.display = "flex";
    }

    function closemodal(popupId) {
        document.getElementById(popupId).style.display = 'none';
    }

    const showinvoice = (popupId) => {
        document.getElementById(popupId).style.display = 'none';
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            if (!searchTerm) return; // Don't fetch if empty

            setLoading(true);
            try {
                const headers = {
                    "content-type": "application/json",
                    "X-Content-Type-Options": "nosniff",
                    "X-Frame-Options": "SAMEORIGIN",
                    token: accessToken,
                };
                // const response = await fetch(`http://localhost:3000/customers/search?name=${searchTerm}`);
                //const data = await response.json();
                const response = await axios.get(`${DEV}/joltify/customers/search/${searchTerm}/${user.user_id}`, { headers });
                setCustomers(response.data.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchCustomers();
        }, 500); // Debounce to prevent too many API calls

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const selectcutomerdropdown = (data) => {
        document.getElementById('addcustomer').style.display = 'none';
        const setdata = {
            name: data.name,
            mobileno: data.phone

        }
        let arr = [];
        arr.push(setdata);
        setCustomers(arr);
        setSelectedCustomer(data.phone);

    }

    const resetCustomer = () => {
        setSelectedCustomer('');
        setCustomers([]);
        setSearchTerm('');
    }
    const closReceiptmodal = (popupId) => {
        document.getElementById(popupId).style.display = 'none';
        setSelectedCustomer('');
        setCustomers([]);
        setSearchTerm('');
        setOrderType('Dine-In');
        setSelectedTable("");
    }
    const [searchtxt, setSearchTxt] = useState(null);
    const searchbyitemname = (value) => {
        console.log(searchtxt);
        if (searchtxt) {
            let filtered = itemlist.filter(item =>
                item.name.toLowerCase().startsWith(searchtxt.toLowerCase())
            );
            setFilteredList(filtered);
        } else {
            setFilteredList(itemlist);
        }
    }

    return (
        <>

            <section class="pos">
                <div class="pop-content">
                    <div class="pop-left">
                        <div class="search-container">
                            <input type="text" onChange={(e) => setSearchTxt(e.target.value)} class="form-control search-input"
                                placeholder="Search by Menu Item" />
                            <button class="search-button" onClick={searchbyitemname}>
                                <i class="fas fa-search"></i>
                            </button>
                        </div>

                        <Menu user={user} accessToken={accessToken} categoryClickAction={filteritembycategory} />

                        <div class="menu-container pos-items">

                            {filteredlist?.map((item, index) => (
                                <div key={index} class="items-card">
                                    {item?.image && <div class="item-image">
                                        <img src={`${DEV}/items/files/${item?.image}`} alt="Chicken Dumplings" />
                                    </div>}

                                    {!item?.image && <div class="item-image">
                                        <img src="/assets/images/chicken_dumplings-thumb.png" alt="Chicken Dumplings" />
                                    </div>}
                                    <div class="item-info">
                                        <h6>{item?.name}</h6>
                                        <div class="buttons">
                                            <span class="price">$ {item?.price}</span>
                                            <a href="#" onClick={() => openItemPopup('additems', item)} class="add-button" id="openadditems"><i class="bi bi-cart4"></i> Add</a>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>




                    <div class="pop-right">
                        <div class="first">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Customer"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select className="form-select"
                                value={selectedCustomer} // Set selected value
                                onChange={(e) => setSelectedCustomer(e.target.value)}>
                                <option>Customer</option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : (
                                    customers.map((customer) => (
                                        <option key={customer.mobileno} value={customer.mobileno}>{customer.name}</option>
                                    ))
                                )}
                            </select>



                        </div>
                        <div class="token">
                            <a href="#" class="btn btn-primary" onClick={() => openPopup('addcustomer')}
                                id="openaddcustomer"><i class="bi bi-plus-circle"></i> Add Customer</a>

                            &nbsp;<a href="#" class="btn btn-primary" onClick={resetCustomer}
                                id="openaddcustomer"><i class="bi bi-minus-circle"></i> Reset</a>

                        </div>
                        <div class="order">
                            <div class="order-container">
                                <label class="order-label">Select Order Type</label>
                                <div class="order-type">
                                    <label class="order-option">
                                        <input type="radio" name="order"
                                            value="Dine-In"
                                            checked={orderType === "Dine-In"}
                                            onChange={handleOrderChange} />
                                        <span>Dine-In</span>
                                    </label>
                                    <label class="order-option">
                                        <input type="radio" name="order"
                                            value="Takeaway"
                                            checked={orderType === "Takeaway"}
                                            onChange={handleOrderChange} />
                                        <span>Takeaway</span>
                                    </label>
                                </div>
                                <select class="select-table form-select"
                                    value={selectedTable}
                                    onChange={(e) => setSelectedTable(e.target.value)}>
                                    <option>Select Table</option>
                                    {tablelist.map((table, index) => (
                                        <><option key={index} value={table.tableno}>{table.name}</option></>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <Invoice selectedCustomer={selectedCustomer} selectedTable={selectedTable}
                            user={user} accessToken={accessToken} orderType={orderType}
                            paymentAction={paymentpopup} closePayAction={closemodal}
                            quantity={quantity} />




                    </div>
                </div>


                <div class="add-customer  " id="addcustomer" >
                    <AddCustomerComponent customerAction={selectcutomerdropdown}
                        user={user} closeCustomerAction={closemodal} accessToken={accessToken} />
                </div>


                <div class="add-items" id="additems">
                    <AddItemComponent closeActionItem={closemodal} openInvoiceAction={showinvoice}
                        item={singleitem} quantity={quantity} />
                </div>

                <div class="payment-modal" id="payment">
                    <AddPaymentComponent paymentamount={paymentamount}
                        selectedCustomer={selectedCustomer} selectedTable={selectedTable}
                        user={user} accessToken={accessToken} orderType={orderType}
                        closepaymentAction={closemodal}
                        openReceiptAction={openReceiptPopup} />
                </div>


                <div class="receiptpopup" id="receipt">
                    <RecieptComponent orderid={orderid} user={user} closeReceiptAction={closReceiptmodal}
                        accessToken={accessToken} quantity={quantity} />
                </div>
            </section>
        </>
    )
}
export default PosComponent

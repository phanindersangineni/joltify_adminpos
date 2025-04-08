import axios from "axios";
import { useEffect, useState } from "react";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const KitchenComponent = ({ user, accessToken }) => {

    const [orders, setOrders] = useState([]);
    const [dineinfilteredorders, setdineFilteredOrders] = useState([]);
    const [takeinfilteredorders, setTakeFilteredOrders] = useState([]);
    const [droparray, setDroparray] = useState(['Preparing', 'Prepared', 'Done']);
    const [activeTab, setActiveTab] = useState('Accept');
    const tabs = ['Accept', 'Preparing', 'Prepared', 'Done'];
    const [searchtext, setSearchText] = useState(null);
    const [itemCounts, setItemCounts] = useState([]);

    useEffect(() => {
        getOrders();

    }, []);

    const handleTabClick = async (tab) => {
        setActiveTab(tab);
        let filtered = orders.filter(item => item.orderstatus === tab
            && item.ordertype === 'DINE-IN');

        let filtered1 = orders.filter(item => item.orderstatus === tab
            && item.ordertype === 'TAKEAWAY');

        setdineFilteredOrders(filtered);
        setTakeFilteredOrders(filtered1);

    };

    const searchorder = async (orderid) => {
        setSearchText(orderid);
        if (orderid) {
            let filtered = orders.filter(item => item.orderid === orderid
                && item.ordertype === 'DINE-IN');

            let filtered1 = orders.filter(item => item.orderid === orderid
                && item.ordertype === 'TAKEAWAY');

            setdineFilteredOrders(filtered);
            setTakeFilteredOrders(filtered1);
        } else {
            let filtered = orders.filter(item => item.orderstatus === 'Accept'
                && item.ordertype === 'DINE-IN');
            console.log(filtered);

            let filtered1 = orders.filter(item => item.orderstatus === 'Accept'
                && item.ordertype === 'TAKEAWAY');
            setdineFilteredOrders(filtered);
            setTakeFilteredOrders(filtered1);
        }

    }

    const handleStatusChange = async (newStatus, orderid) => {
        //setStatus(newStatus);
        console.log('Selected status:', newStatus);

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
        };

        const response = await axios.get(`${DEV}/joltify/orders/update/${orderid}/${newStatus}`, { headers });

        if (response.data.data == 'SUCCESS') {
            getOrders();
        }

    };

    const getOrders = async () => {

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
        };

        const response = await axios.get(`${DEV}/joltify/orders/search/N/${user.user_id}`, { headers });
        console.log(response.data.data);
        let filtered = response.data.data.filter(item => item.orderstatus === 'Accept'
            && item.ordertype === 'DINE-IN');
        console.log(filtered);

        let filtered1 = response.data.data.filter(item => item.orderstatus === 'Accept'
            && item.ordertype === 'TAKEAWAY');
        setOrders(response?.data?.data);
        setdineFilteredOrders(filtered);
        setTakeFilteredOrders(filtered1);

        const itemCountMap = {};

        response?.data?.data.forEach(order => {
            order.items.forEach(item => {
                const itemName = item.name;

                if (itemCountMap[itemName]) {
                    itemCountMap[itemName]++;
                } else {
                    itemCountMap[itemName] = 1;
                }
            });
        });

        const itemCountsArray = Object.entries(itemCountMap).map(([name, count]) => ({
            name,
            count
        }));

        setItemCounts(itemCountsArray);

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

    return (
        <section class="kds">
            <div class="header">
             <span class="text-secondary"> <a href ="/posorders"> Orders</a></span>
        </div>
            <div class="d-flex">
                <div class="left">
                    <div class="card">
                        <div class="top"><h3>Items Board</h3></div>
                        <div class="bottom">
                        {itemCounts.map((item) => (
                          <> <div>
                                <p>{item.name}</p>
                                
                            </div>
                            <p class="count">{item.count}</p>
                            </>))}
                        </div>
                        


                    </div>
                </div>
                <div class="right w-100">
                    <div class="top-header d-flex align-items-center gap-2 flex-wrap justify-content-between">
                        <div className="d-flex gap-2 flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div class="search-box">
                            <i class="bi bi-search text-muted me-2"></i>
                            <input type="text" value={searchtext} onChange={(e) => searchorder(e.target.value)} placeholder="Search Order" />
                        </div>
                    </div>

                    <div class="container-fluid px-0">
                        <div class="row g-3">

                            <div class="col-md-6">
                                <div class="order-container pb-1">
                                    <div class="section-title">
                                        <span>
                                            Dine-In Orders
                                        </span>
                                    </div>
                                    {dineinfilteredorders?.map((item, index) => (
                                        <div key={index} class="order-card">
                                            <div class="order-header">
                                                <span class="order-id ">
                                                    <i class="bi bi-bag-fill"></i> #{item.orderid}
                                                </span>
                                                <span class="status-pill">{item.orderstatus}</span>
                                            </div>
                                            <div class="second-section">
                                                <div class="order-details">
                                                    <p>Table No: {item.tableno}</p>
                                                    <p>{formatteddate(item.orderdate)}</p>
                                                </div>
                                            </div>

                                            <div >
                                                {item.items?.map((item, index) => (
                                                    <div key={index} class="top">
                                                        <span>{item.quantity} x</span>
                                                        <div class="order-details">
                                                            <p><strong>{item.name}</strong></p>
                                                            {item.variants?.map((variant, index) => (
                                                                <p key={index}>{variant.key}: {variant.name} - $ {variant.price}</p>
                                                            ))}
                                                            {item.extras?.map((extra, index) => (
                                                                <p key={index}>{extra?.name} - ${extra?.price}.</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-display="static"
                                                        aria-expanded="false"
                                                    >
                                                        {item.orderstatus}
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                                        {droparray.map((dropitem) => (
                                                            <li key={dropitem}>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Prevent page jump
                                                                        handleStatusChange(dropitem, item.orderid);
                                                                    }}
                                                                >
                                                                    {dropitem}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="order-container">
                                    <div class="section-title">Takeaway</div>
                                    {takeinfilteredorders?.map((item, index) => (
                                        <div key={index} class="order-card">
                                            <div class="order-header">
                                                <span class="order-id ">
                                                    <i class="bi bi-bag-fill"></i> #{item.orderid}
                                                </span>
                                                <span class="status-pill">{item.orderstatus}</span>
                                            </div>
                                            <div class="second-section">
                                                <div class="order-details">
                                                    <p>Table No: {item.tableno}</p>
                                                    <p>{formatteddate(item.orderdate)}</p>
                                                </div>
                                            </div>

                                            <div >
                                                {item.items?.map((item, index) => (
                                                    <div key={index} class="top">
                                                        <span>{item.quantity} x</span>
                                                        <div class="order-details">
                                                            <p><strong>{item.name}</strong></p>
                                                            {item.variants?.map((variant, index) => (
                                                                <p key={index}>{variant.key}: {variant.name} - $ {variant.price}</p>
                                                            ))}
                                                            {item.extras?.map((extra, index) => (
                                                                <p key={index}>{extra?.name} - ${extra?.price}.</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-display="static"
                                                        aria-expanded="false"
                                                    >
                                                        {item.orderstatus}
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                                        {droparray.map((dropitem) => (
                                                            <li key={dropitem}>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Prevent page jump
                                                                        handleStatusChange(dropitem, item.orderid);
                                                                    }}
                                                                >
                                                                    {dropitem}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default KitchenComponent
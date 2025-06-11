
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const DEV = process.env.NEXT_PUBLIC_API_URL;

const KitchenComponent = ({ user, accessToken }) => {
    const [orders, setOrders] = useState([]);
    const [dineinfilteredorders, setdineFilteredOrders] = useState([]);
    const [takeinfilteredorders, setTakeFilteredOrders] = useState([]);
    const [droparray] = useState(['Preparing', 'Prepared', 'Done']);
    const [activeTab, setActiveTab] = useState('Accept');
    const [searchtext, setSearchText] = useState(null);
    const [itemCounts, setItemCounts] = useState([]);
    const tabs = ['Accept', 'Preparing', 'Prepared', 'Done']; // <-- Add this
    const intervalRef = useRef(null);

    const lastAcceptOrderIds = useRef(new Set());
    const [canPlayAudio, setCanPlayAudio] = useState(false);
    const audioRef = useRef(null);
    useEffect(() => {
        audioRef.current = new Audio("/notification.wav");
    
        const handleClick = () => {
            setCanPlayAudio(true);
            window.removeEventListener('click', handleClick);
        };
    
        window.addEventListener('click', handleClick);
    
        getOrders(); // Initial call
    
        intervalRef.current = setInterval(() => {
            getOrders();
        }, 30000); // 10 seconds
    
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const getOrders = async () => {
        const headers = {
            "content-type": "application/json",
            token: accessToken,
        };

        try {
            const response = await axios.get(`${DEV}/joltify/orders/search/N/${user?.restaurantid}`, { headers });
            const allOrders = response?.data?.data || [];

            // Track new "Accept" orders by order ID
            const currentAcceptOrders = allOrders.filter(order =>
                String(order.orderstatus).toUpperCase().trim() === "ACCEPT"
            );

            const currentIds = new Set(currentAcceptOrders.map(order => order.orderid));
            const previousIds = lastAcceptOrderIds.current || new Set();

            // Check for new Accept order IDs not in previous fetch
            const newOrderFound = [...currentIds].some(id => !previousIds.has(id));
             
            console.log("newOrderFound"+newOrderFound);
            console.log("canPlayAudio"+canPlayAudio);
            
            if (newOrderFound  && audioRef.current) {
                audioRef.current.play().catch(err => console.log('Audio play blocked:', err));
            }

            lastAcceptOrderIds.current = currentIds;

            setOrders(allOrders);
            filterOrders(allOrders, activeTab, searchtext);

            // Count items (excluding completed, cancelled, delivered)
            const itemCountMap = {};
            allOrders
                .filter(order => {
                    const status = String(order.orderstatus).toUpperCase().trim();
                    return !['COMPLETED', 'CANCELLED', 'DELIVERED'].includes(status);
                })
                .forEach(order => {
                    order.items.forEach(item => {
                        const itemName = item.name;
                        itemCountMap[itemName] = (itemCountMap[itemName] || 0) + 1;
                    });
                });

            const itemCountsArray = Object.entries(itemCountMap).map(([name, count]) => ({
                name,
                count
            }));

            setItemCounts(itemCountsArray);

        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    const filterOrders = (allOrders, tab, search) => {
        let filtered = allOrders.filter(item =>
            item.orderstatus === tab && item.ordertype === 'DINE-IN'
        );

        let filtered1 = allOrders.filter(item =>
            item.orderstatus === tab && item.ordertype === 'TAKEAWAY'
        );

        if (search) {
            filtered = filtered.filter(item => item.orderid.includes(search));
            filtered1 = filtered1.filter(item => item.orderid.includes(search));
        }

        setdineFilteredOrders(filtered);
        setTakeFilteredOrders(filtered1);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        filterOrders(orders, tab, searchtext);
    };

    const searchorder = (orderid) => {
        setSearchText(orderid);
        filterOrders(orders, activeTab, orderid);
    };

    const handleStatusChange = async (newStatus, orderid) => {
        const headers = {
            "content-type": "application/json",
            token: accessToken,
        };

        try {
            const response = await axios.get(`${DEV}/joltify/orders/update/${orderid}/${newStatus}`, { headers });

            if (response.data.data === 'SUCCESS') {
                getOrders();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    function formatteddate(frdate) {
        try {
            const date = new Date(frdate);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
                timeZone: 'Asia/Kolkata',
            };

            return new Intl.DateTimeFormat('en-IN', options).format(date);
        } catch (e) {
            return null;
        }
    }


    return (
        <section class="kds">
            <div class="header">
                <span class="text-secondary"> <Link href="/orders"> Orders</Link></span>
            </div>
            <div class="section3">
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
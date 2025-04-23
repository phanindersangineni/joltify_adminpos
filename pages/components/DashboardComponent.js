import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SalesBarChart from "./SalesBarChart";
import SalesBarChart1 from "./SalesBarChart1";
import PosOrderComponent from "./PosOrderComponent";
import DashboardOrders from "./DashboardOrders";

export const DEV = process.env.NEXT_PUBLIC_API_URL;

const DashboardComponent = ({user,accessToken}) => {

    const [records, setRecords] = useState([]);
    const [recordlist, setRecordList] = useState([]);
    const isFirstLoad = useRef(true);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('Current Month');
    const [sumorder,setSumorders] =useState([]);
    const[ordercount,setOrdercount] =useState(0);
    const [totalsales,setTotalsales] =useState([]);
    const[salescount,setSalescount] =useState(0);

    const [inhouse,setInhouse] =useState([]);
    const[inhousecount,setInhousecount] =useState(0);

    const [orders, setOrders] = useState([]);
    const [orderlist, setOrderlist] = useState([]);

    useEffect(() => {
        if (isFirstLoad.current) {
          loaditems();
          isFirstLoad.current = false;
        }
      }, []);

      const loaditems = async () => {
        
        const headers = {
          "content-type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          token: accessToken,
        };
    
        const response = await axios.get(`${DEV}/joltify/reports/${user?.user_id}`, { headers });
        console.log(response.data.data);
        setRecords(response.data.data.sales);
        setOrders(response.data.data.monthlyorder);
        setSumorders(response.data.data.sumorder);
        setTotalsales(response.data.data.totalsales);
        setInhouse(response?.data?.data?.inhouse);
        let filtered = response?.data?.data?.sumorder.filter(item => item.period === selectedPeriod);
        
        setOrdercount(filtered[0]?.total_orders);
        let filtered1 = response?.data?.data?.totalsales.filter(item => item.period === selectedPeriod);
        setSalescount(filtered1[0]?.total_sales);

        let filtered2 = response?.data?.data?.inhouse.filter(item => item.period === selectedPeriod);
        setInhousecount(filtered2[0]?.count);
        let filtered4 = response?.data?.data?.sales.filter(item => item.period === selectedPeriod);
         setRecordList(filtered4);
         
         let filtered5 = response?.data?.data?.monthlyorder.filter(item => item.period === selectedPeriod);
         setOrderlist(filtered5);

      
        setLoading(false);
      };

     const changeData =(selectedPeriod) =>{
        let filtered = sumorder.filter(item => item.period === selectedPeriod);
        setOrdercount(filtered[0]?.total_orders);
        let filtered1 = totalsales.filter(item => item.period === selectedPeriod);
        setSalescount(filtered1[0]?.total_sales);
        let filtered2 = inhouse.filter(item => item.period === selectedPeriod);
        setInhousecount(filtered2[0]?.count);
        let filtered4 = records.filter(item => item.period === selectedPeriod);
         setRecordList(filtered4);
         let filtered5 = orders.filter(item => item.period === selectedPeriod);
         setOrderlist(filtered5);
      }

      useEffect(() => {
        changeData(selectedPeriod); // fetch on mount
      }, [selectedPeriod]);

    return (
        <>
            <section class="content" id="Dashboard">

                <div class="message py-3">
                    <h4>Good Morning!</h4>

                </div>
                <div class="overview d-flex align-items-center justify-content-between">
                    <h5>Overview</h5>
                    <div class="">
                        <select  value={selectedPeriod}
                       onChange={(e) => setSelectedPeriod(e.target.value)}
                        class="form-select w-auto" id="monthSelect">
                            <option disabled selected>Select Month</option>
                            <option value="Current Month">Current Month</option>
                            <option value="Last 3 Months">Last 3 Months</option>
                            <option value="Last 6 Months">Last 6 Months</option>
                            <option value="Last 1 Year">1 Year</option>
                            
                        </select>

                    </div>

                </div>


                <div class="section1">
                    <div class="cards sales">
                        <div class="icon">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div>Total Sales : {salescount}</div>
                    </div>
                    <div class="cards orders">
                        <div class="icon">
                            <i class="bi bi-box-fill"></i>
                        </div>
                        <div>Total Orders : {ordercount}</div>
                    </div>
                    <div class="cards customers">
                        <div class="icon">
                            <i class="bi bi-people-fill"></i>
                        </div>
                        <div>POS Customers: {inhousecount}</div>
                    </div>
                    <div class="cards menu-items">
                        <div class="icon">
                            <i class="bi bi-file-earmark-post"></i>
                        </div>
                        <div>Online Customers : 0</div>
                    </div>
                </div>

                <div class="graph  justify-content-between mt-5">
                    <div class="sales-summary-container">
                        <div class="sales-header">
                            <div class="sales-text">
                                <h5 class="mb-1">Sales Summary</h5>
                            </div>

                            
                        </div>

                        <div style={{ width: '100%', maxWidth: '600px', height: '400px' }}>
                        <SalesBarChart data={recordlist} />
                        </div>
                    </div>

                    <div class="sales-summary-container">
                        <div class="sales-header">
                            <div class="sales-text">
                                <h5 class="mb-1">Order Stats</h5>
                            </div>

                           
                        </div>

                        <div style={{ width: '100%', maxWidth: '600px', height: '400px' }}>
                        <SalesBarChart1 data={orderlist} />
                        </div>
                    </div>
                </div>

                <DashboardOrders user ={user} accessToken ={accessToken} />
     
            </section>
        </>
    )

}
export default DashboardComponent
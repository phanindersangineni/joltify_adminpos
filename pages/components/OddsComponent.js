import axios from "axios";
import { useEffect, useState } from "react";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

const OddsComponent =({user, accessToken}) =>{

    const [preparedorders, setPreparedOrder] = useState([]);
    const [doneorders, setDoneOrder] = useState([]);
  
    useEffect(() => {
        getOrders();

    }, []);

    const getOrders = async () => {

        const headers = {
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            token: accessToken,
        };

        const response = await axios.get(`${DEV}/joltify/orders/search/N/${user.user_id}`, { headers });
        console.log(response.data.data);
        let filtered = response.data.data.filter(item => item.orderstatus === 'Preparing'
            );
        console.log(filtered);

        let filtered1 = response.data.data.filter(item => item.orderstatus === 'Done'
            );
            setPreparedOrder(filtered);
            setDoneOrder(filtered1);

       

    }
    return(
        <>
        <section class="oss">
        <div class="preparing card">
            <h1>Preparing</h1>
            {preparedorders?.map((item, index) => (
            <h2 key={index}>{item.orderid}</h2>
            ))}
        </div>
        <div class="start card">
            <h1>Ready</h1>
            {doneorders?.map((item, index) => (
            <h2 key={index}>{item.orderid}</h2>
            ))}
        </div>
    </section>
        </>
    )

}
export default OddsComponent
import Head from "next/head"

import PosOrderComponent from "./components/PosOrderComponent"
import { useState } from "react"
import NavBarComponent from "./components/NavBarComponent";
import SidebarComponent from "./components/SideBarComponent";


const posorders =() =>{
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Default sidebar open

    
  
    // Function to toggle sidebar
    const toggleSidebar = () => {
      
      setSidebarOpen(!isSidebarOpen);
    };

    return(
        <>
         <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Joltify</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </Head>

      <NavBarComponent toggleSidebar={toggleSidebar}/>
      <SidebarComponent isOpen={isSidebarOpen}/>
      <PosOrderComponent/>
        </>
    )
}

export default posorders
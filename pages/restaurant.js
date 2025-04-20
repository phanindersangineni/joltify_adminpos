"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import NavBarComponent from "./components/NavBarComponent";
import SidebarComponent from "./components/SideBarComponent";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import RestaurantComponent from "./components/RestaurantComponent";


const Restaurant = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Default sidebar open
  const { user,accessToken, authloading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authloading && !user) {
      router.push("/");
    }
  }, [authloading, user, router]);

  // Load Bootstrap JS dynamically
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
      console.error("Failed to load Bootstrap:", err)
    );
  }, []);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Show loading state while checking authentication
  if (authloading) return <p>Loading...</p>;

  return (
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

      {/* Navbar & Sidebar */}
      <NavBarComponent toggleSidebar={toggleSidebar} />
      <SidebarComponent isOpen={isSidebarOpen} />
       <RestaurantComponent user ={user} accessToken ={accessToken}/>
    </>
  );
};

export default Restaurant;

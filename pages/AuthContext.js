import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [authloading, setLoading] = useState(true);
    const [cartitems, setCartItems] = useState(null);

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("accessToken");
        const storedCarditems = JSON.parse(localStorage.getItem("cartitems"));

        if (storedUser && storedToken) {
            setUser(storedUser);
            setAccessToken(storedToken);
        }
        if(storedCarditems){
            setCartItems(storedCarditems);
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    };

    const cart = (cartData) => {
       
       setCartItems(cartData);
       localStorage.setItem("cartitems", JSON.stringify(cartData));
       
    }
    const removecart = () => {
        setCartItems(null);
        localStorage.removeItem("cartitems");
        
     }


    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, authloading,
        cart,removecart,cartitems }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for using AuthContext
export const useAuth = () => useContext(AuthContext);

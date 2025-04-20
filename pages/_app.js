import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "@/styles/ReceiptComponent.css";
//import { AuthProvider } from "./AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

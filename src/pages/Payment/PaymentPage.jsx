import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
    const location = useLocation();
    const { classes} = location.state || {}; // Access the price from state
    return (
        <div className="w-[40%] mx-auto">
            <Elements stripe={stripePromise}>
                <CheckoutForm classes={classes}/>
            </Elements>
        </div>
    );
};

export default PaymentPage;
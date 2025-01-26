import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {

    useTitle('Payment Page');

    const location = useLocation();
    const { classes } = location.state || {}; // Access the price from state
    return (
        <div className="flex flex-col items-center justify-center py-40 gap-5">
            <p className="text-xl">Complete the Payment information</p>
            <div className="w-[40%] mx-auto border p-5">
                <Elements stripe={stripePromise}>
                    <CheckoutForm classes={classes} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
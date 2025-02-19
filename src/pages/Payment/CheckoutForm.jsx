import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ classes }) => {
    const { _id, price } = classes; // Class details
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const  navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState("");

    // Fetch the client secret
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const { data } = await axiosSecure.post("/create-payment-intent", { price });
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };
        if (price > 0) createPaymentIntent();
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            // Confirm payment
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || "unknown@example.com",
                        name: user?.displayName || "Unknown User",
                    },
                },
            });

            if (error) {
                console.error("Error confirming payment:", error);
                toast.error("Payment failed.");
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                toast.success("Payment successful!");

                // Save payment and update enrollment
                const paymentData = {
                    email: user?.email,
                    name: user?.displayName,
                    date: new Date(),
                    courseId: _id,
                    transactionId: paymentIntent.id,
                };

                try {
                    const response = await axiosSecure.post("/payment", paymentData);
                    if (response.data.success) {
                        toast.success("Enrollment updated successfully!");
                        navigate('/dashboard/MyEnrollClass');
                    }
                } catch (error) {
                    console.error("Error saving payment and updating enrollment:", error);
                    toast.error("An error occurred while updating enrollment.");
                }
            }
        } catch (error) {
            console.error("Payment processing error:", error);
            toast.error("An error occurred during payment.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
            <button
                className="px-5 py-2 mt-4 bg-[#0048B0] hover:bg-blue-400 hover:text-black text-white"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay ${price}
            </button>
        </form>
    );
};

export default CheckoutForm;

import axios from "axios";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'https://y-five-lemon.vercel.app'
    })
    return axiosSecure;
};

export default useAxiosSecure;
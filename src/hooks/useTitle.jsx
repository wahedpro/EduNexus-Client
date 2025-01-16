import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(()=>{
        document.title = `EduNexus - ${title}`
    },[title])
};

export default useTitle;
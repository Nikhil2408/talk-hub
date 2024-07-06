import toast from "react-hot-toast";


export const loginUser = async ({username, password}, setIsLoading) => {
    setIsLoading(true);
    try {
        const responseObj = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        });

        const response = await responseObj.json();

        if(response.error){
            return {isValidResponse: false, response};
        } else{
            return {isValidResponse: true, response};
        }

    } catch (error) {
        toast.error("Failed to login, Please try again!!");
    } finally{
        setIsLoading(false);
    }
}
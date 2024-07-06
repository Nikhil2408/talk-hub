import toast from "react-hot-toast";

export const signUpUser = async ({fullName, username, password, confirmPassword, gender}, setIsLoading) => {
    setIsLoading(true);
    try {
        const responseObj = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender}),
            credentials: "include"
        });
        
        const response = await responseObj.json();
        if(response.error){
            return {isValidResponse: false, response};
        } else{
            return {isValidResponse: true, response};
        }
    } catch (error) {
        toast.error("Failed to create user. Please try again!!")
    } finally{
        setIsLoading(false);
    }
}
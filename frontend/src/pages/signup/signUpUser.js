import toast from "react-hot-toast";

export const signUpUser = async ({fullName, username, password, confirmPassword, gender}, setIsLoading) => {
    try {
        const responseObj = await fetch("http://localhost:8000/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        });
        
        const response = await responseObj.json();
        if(response.error){
            toast.error(response.error);
            return false;
        } else{
            toast.success(`User created successfully!!`);
            return true;
        }
    } catch (error) {
        toast.error("Failed to create. Please try again!!")
    } finally{
        setIsLoading(false);
    }
}
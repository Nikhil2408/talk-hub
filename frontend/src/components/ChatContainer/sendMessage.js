import toast from "react-hot-toast";


export const sendMessage = async (messageText, setIsLoading, selectedConversation) => {
    setIsLoading(true);
    try {
        const responseObj = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({message: messageText}),
            credentials: "include"
        })

        const response = await responseObj.json();
        return response
    } catch (error) {
        toast.error("Failed to send message, please try again");
    } finally {
        setIsLoading(false);
    }
}
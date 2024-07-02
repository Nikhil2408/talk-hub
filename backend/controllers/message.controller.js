import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: [senderId, receiverId]
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await newMessage.save();
        await conversation.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error while sending message", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}


export const getMessages = async (req, res) => {
    const currentUserId = req.user._id;
    const activeScreenUserId = req.params.id;

    const conversation = await Conversation.findOne({
        participants: [currentUserId, activeScreenUserId]
    }).populate("messages"); // this will populate the actual message object from Message collection w.r.t messageId

    const messages = conversation.messages.map(message => {
        return message.message;
    })
    res.status(200).json({
        messages
    })


}
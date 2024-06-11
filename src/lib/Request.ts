import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, clearMessages } from "./redux/coversation/conversationSlice";

const [loading, setLoading] = useState<boolean>(false);
const [conversation, setConversation] = useState<Array<object>>([]);
const dispatch = useDispatch();


const generateResponse = async (prompt: string) => {
}
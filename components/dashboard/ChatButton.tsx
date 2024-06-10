import { useState, useEffect, useRef, useCallback } from 'react'
import { db, auth } from '@/firebase' // Assuming auth is your Firebase authentication object
import { collection, addDoc, query, orderBy, onSnapshot, DocumentData, Timestamp, where, getDocs } from 'firebase/firestore'

type Message = {
    text: string
    timestamp: Timestamp
    sender: string
    senderEmail: string // Add sender's email
}

const ChatButton: React.FC = () => {
    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('') // Assuming you have access to the user's email
    const [selectedUser, setSelectedUser] = useState<string | null>(null) // Track selected user for private chat
    const [userList, setUserList] = useState<string[]>([]) // List of users the agent can chat with
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const email = currentUser.email;
                setUserEmail(email || '');

                // Fetch list of users the agent can chat with
                const userListFromDB = await fetchUserList();
                setUserList(userListFromDB);

                // Listen for messages for the selected user
                if (selectedUser) {
                    const q = query(collection(db, 'messages'),
                        orderBy('timestamp'),
                        where('sender', 'in', [auth.currentUser?.uid, selectedUser])
                    );
                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                        const msgs: Message[] = []

                        querySnapshot.forEach((doc) => {
                            const data = doc.data() as DocumentData
                            msgs.push({
                                text: data.text,
                                timestamp: data.timestamp,
                                sender: data.sender,
                                senderEmail: data.senderEmail, // Include sender's email
                            })
                        })

                        setMessages(msgs)
                    })

                    return () => unsubscribe()
                }
            }
        }

        getCurrentUser();
    }, [selectedUser])

    const fetchUserList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userList: string[] = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userEmail = userData.email; // Assuming each user document has an 'email' field
                userList.push(userEmail);
            });
            return userList;
        } catch (error) {
            console.error("Error fetching user list:", error);
            return []; // Return an empty list in case of error
        }
    }


    const sendMessage = useCallback(async () => {
        if (input.trim() !== '') {
            if (selectedUser) {
                await addDoc(collection(db, 'messages'), {
                    text: input,
                    timestamp: Timestamp.now(),
                    sender: auth.currentUser?.uid, // Use the current user's UID as the sender
                    senderEmail: userEmail, // Use the user's email as the sender email
                })
                setInput('')
            }
        }
    }, [input, selectedUser, userEmail])

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    const handleUserSelect = (user: string) => {
        setSelectedUser(user);
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <button
                className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-16 h-16"
                onClick={() => setChatOpen(!chatOpen)}
            >
                Chat
            </button>
            {chatOpen && (
                <div className="fixed bottom-[90px] right-[20px] w-[300px] h-[400px] border border-gray-300 rounded-lg bg-white flex flex-col">
                    <div className="p-2">
                        {/* Display user list */}
                        {userList.map((user, index) => (
                            <div key={index} className="cursor-pointer" onClick={() => handleUserSelect(user)}>
                                {user}
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 p-2.5 overflow-y-scroll">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`my-1 p-2 rounded-lg ${msg.sender === auth.currentUser?.uid ? 'self-end bg-green-100' : 'self-start bg-blue-100'
                                    }`}
                            >
                                <div className="text-gray-500 text-sm">{msg.senderEmail}</div>
                                <div>{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex">
                        <input
                            className="flex-1 p-2"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button className="p-2" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatButton

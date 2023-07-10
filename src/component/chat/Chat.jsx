import React, { useEffect, useState } from 'react'
import Join, { user } from "../Join/Join"
import socketIO, { connect } from 'socket.io-client';
import "./chat.css"
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT = "https://anonymous-deru.onrender.com/";
const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
  
    const send = () => {
      const message = document.getElementById('chatInput').value;
      if (socket) {
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
      }
    };
  
    useEffect(() => {
      const newSocket = socketIO(ENDPOINT, { transports: ['websocket'] });
      setSocket(newSocket);
  
      newSocket.on("connect", () => {
        alert("Connected");
        setId(newSocket.id);
      });
  
      newSocket.emit('joined', { user });
  
      newSocket.on('welcome', (data) => {
          setMessages([...messages , data]);
          console.log(data.user, data.message);
        });
        
        newSocket.on('userJoined', (data) => {
            setMessages([...messages , data]);
            console.log(data.user, data.message);
        });
        
        newSocket.on('leave', (data) => {
            setMessages([...messages , data]);
            console.log(data.user, data.message);
        });
        
        return () => {
            newSocket.disconnect();
            newSocket.off();
        };
    }, []);
    
    useEffect(() => {
        if (socket) {
            socket.on('sendMessage', (data) => {
                setMessages([...messages , data]);
                console.log(data.user, data.message, data.id);
            });
            
            return () => {
                socket.off();
            };
        }
    }, [messages]);
    // const history = useHistory();
    // if (id === null) {
        //     history.push('/login');
        //   }
        
        return (
            <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2 className='headingg'>Anonymous</h2>
                </div>
                <ReactScrollToBottom className="chatBox">

                   { 
                   
                     messages.map((item , index)=>{
                        return  <Message 
                        key={index}
                     user={item.id===id ? '': item.user}
                     message={item.message}
                     classs={item.id===id?'right':'left'}
                    />
                     })
                    
                    }
                    
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyDown={(event)=> event.key==='Enter'?send():null} type="text" id="chatInput" />
                    <button onClick={send} className='sendBtn'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
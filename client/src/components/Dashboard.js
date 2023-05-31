import { faBuildingCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useRef, useEffect } from 'react';
import '../styling/DashBoard.css';
import UserContext from './UserContext';
import Sidebar from './Sidebar'; 
import SettingsSidebar from './SettingsSidebar';


class ChatBot {
  intents = [
    ['hi|hello|hey|hey there', ['Hey there!']],
    ['what\'s up|sup|what\'s new', ['Not much, just chatting with you!', 'Just hanging out, how about you?', 'Nothing new, how about you?']],
    ['how are you|how\'s it going|how have you been', ['I\'m good, how about you?', 'I\'ve been doing alright, thanks for asking! How about you?']],
    ['.*', ['I\'m not sure what you mean, can you please rephrase that?', 'Sorry, I don\'t understand what you\'re asking!', 'I\'m not sure I know the answer to that!']],
    
  ];
  /*respond method takes userInput string as an argument and iterate over intents array -> use For Loop!*/ 
  respond(userInput) {
    for (let i = 0; i < this.intents.length; i++) {
      /* Create a regular expression using the pattern from each intent*/ 
      let pattern = new RegExp(this.intents[i][0]);
      /* Test the pattern(userInput) against the pattern*/ 
      if (pattern.test(userInput)) {
        let responses = this.intents[i][1];
        /* If a pattern(userInput) matches the userInput, Select a random response from the corresponding array of responses: */ 
        let response = responses[Math.floor(Math.random() * responses.length)];
        return response;
      }
    }
     /* If no pattern matches the userInput return the default response like sorry */ 
    return "Sorry, I didn't understand that.";
  }
}

function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function handleSettingsClick() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  function handleSettingsUpdate(updatedSettings) {

    console.log('Updated Settings:', updatedSettings);
  }

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatbot = new ChatBot();
  const chatArea = useRef(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    chatArea.current.scrollTop = chatArea.current.scrollHeight;
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    if (userInput.toLowerCase() === 'quit') {
      setMessages([
        ...messages,
        { text: 'THANKS FOR BEING HERE', sender: 'Over-Lord' },
      ]);
    } else {
      fetch('http://localhost:5555/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: userInput,
        }),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          let botResponse = chatbot.respond(userInput);
          setMessages([
            ...messages,
            { text: userInput, sender: 'Human' },
            { text: botResponse, sender: 'Over-Lord' },
          ]);

          fetch('http://localhost:5555/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              response_content: botResponse,
              message_id: data.id,
            }),
            credentials: 'include',
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    setUserInput("");
  }

  useEffect(() => {
    fetch(`http://localhost:5555/past_messages/${userId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        const { messages, responses } = data;
        const chatMessages = [];
        
        for (let i = 0; i < messages.length; i++) {
          chatMessages.push({ text: messages[i].content, sender: 'Human' });
          if (responses[i]) {
            chatMessages.push({ text: responses[i].response_content, sender: 'Over-Lord' });
          }
        }
        
        setMessages(chatMessages);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
    
  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  return (
    <div className="front-page">
      <Sidebar onSettingsClick={handleSettingsClick} />
      {isSettingsOpen && <SettingsSidebar onSettingsUpdate={handleSettingsUpdate} />}
      <div id="main" className="chat-box">
        <div className="chat-area" ref={chatArea}>
          {messages.map((message, index) => (
            <div key={index} className={`${message.sender}-msg`}>
              <p><strong>{message.sender}:</strong> {message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input type="text" value={userInput} onChange={handleInputChange} className="chat-input" />
        </form>
      </div>
    </div>
  );
}

export default Dashboard;

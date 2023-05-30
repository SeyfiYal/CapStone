

import { faBuildingCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef, useEffect } from 'react';
import '../styling/DashBoard.css';
import '../styling/SideBar.css'; // Import the Sidebar.css file

// Create a JavaScript version of the ChatBot class
class ChatBot {
    intents = [
        ['hi|hello|hey|hey there', ['Hey there!']],
        ['what\'s up|sup|what\'s new', ['Not much, just chatting with you!', 'Just hanging out, how about you?', 'Nothing new, how about you?']],
        ['how are you|how\'s it going|how have you been', ['I\'m good, how about you?', 'I\'ve been doing alright, thanks for asking! How about you?']],
        ['.*', ['I\'m not sure what you mean, can you please rephrase that?', 'Sorry, I don\'t understand what you\'re asking!', 'I\'m not sure I know the answer to that!']],
    ];

    respond(userInput) {
        for (let i = 0; i < this.intents.length; i++) {
            let pattern = new RegExp(this.intents[i][0]);
            if (pattern.test(userInput)) {
                let responses = this.intents[i][1];
                let response = responses[Math.floor(Math.random() * responses.length)];
                return response;
            }
        }
        return "Sorry, I didn't understand that.";
    }
}
function Dashboard(props) {

    const [userInput, setUserInput] = useState("");
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const chatbot = new ChatBot();
    const chatArea = useRef(null); // Create a reference for chat area


    useEffect(() => {
      // Scroll chat area to bottom whenever messages change
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
        // Send the user message to the backend
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
            // Update the messages with the user's message and the chatbot's response
            let botResponse = chatbot.respond(userInput);
            setMessages([
              ...messages,
              { text: userInput, sender: 'Human' },
              { text: botResponse, sender: 'Over-Lord' },
            ]);
    
            // Send the chatbot response to the backend
            fetch('http://localhost:5555/responses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                response_content: botResponse,
                message_id: data.id, // this assumes that your server returns the id of the user message
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
      // Fetch the conversation data from the backend API
      fetch(`http://localhost:5555/past_messages/${props.userId}`, {
        method: 'GET',
        credentials: 'include',
      })
      // ..
        .then((response) => response.json())
        .then((data) => {
          // Set the fetched conversation data to the messages state
          const { messages, responses } = data;
          const chatMessages = [];
          
          // Combine the messages and responses into a single chatMessages array
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
  
  
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    }    
    
    return (
      <div className="front-page">
        <div className="chat-box">
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
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
          <a href="#">Settings</a>
        </div>
        <div id="main">
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  




  // useEffect(() => {
  //   // Fetch the conversation data from the backend API
  //   fetch('http://localhost:5555/past_messages/6', {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Set the fetched conversation data to the messages state
  //       const { messages, responses } = data;
  //       const chatMessages = [];
        
  //       // Combine the messages and responses into a single chatMessages array
  //       for (let i = 0; i < messages.length; i++) {
  //         chatMessages.push({ text: messages[i].content, sender: 'Human' });
  //         if (responses[i]) {
  //           chatMessages.push({ text: responses[i].response_content, sender: 'Over-Lord' });
  //         }
  //       }
        
  //       setMessages(chatMessages);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);

      // useEffect(() => {
    //   if (userId !== null) {
    //     fetch(`http://localhost:5555/past_messages/${userId}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setMessages(data);
    //       })
    //       .catch((error) => console.error("Error:", error));
    //   }
    // }, [userId]);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   useEffect(() => {
  //     // Fetch the messages and responses for the logged-in user when the component mounts
  //     fetch(`http://localhost:5555/messages/${user_id}`, {
  //         method: 'GET',
  //         credentials: 'include',
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         // Create an array of message objects from the fetched data
  //         const fetchedMessages = data.messages.map((message, index) => {
  //             return { text: message.content, sender: 'Human' }
  //         });
  //         const fetchedResponses = data.responses.map((response, index) => {
  //             return { text: response.response_content, sender: 'Over-Lord' }
  //         });
  
  //         // Combine and sort the fetched messages and responses by id
  //         let combinedMessages = [...fetchedMessages, ...fetchedResponses].sort((a, b) => a.id - b.id);
  
  //         // Set the messages state to the combined and sorted messages
  //         setMessages(combinedMessages);
  //     })
  //     .catch((error) => {
  //         console.error('Error:', error);
  //     });
  // }, []);
  




  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////




//   return (
//     <div className="front-page">
//       <div className="chat-box">
//         <div className="chat-area" ref={chatArea}>
//           {messages.map((message, index) => (
//             <div key={index} className={`${message.sender}-msg`}>
//               <p><strong>{message.sender}:</strong> {message.text}</p>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={sendMessage}>
//           <input type="text" value={userInput} onChange={handleInputChange} className="chat-input" />
//         </form>
//       </div>
//       <div id="mySidenav" className="sidenav">
//         <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
//         <a href="#">About</a>
//         <a href="#">Services</a>
//         <a href="#">Clients</a>
//         <a href="#">Contact</a>
//         <a href="#">Settings</a>
//       </div>
//       <div id="main">
//       </div>
//     </div>
//   );
// }

// export default Dashboard;











  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////


































  //   useEffect(() => {
  //     // Fetch the messages and responses for the logged-in user when the component mounts
  //     fetch(`http://localhost:5555/messages/${user_id}`, {
  //         method: 'GET',
  //         credentials: 'include',
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         // Create an array of message objects from the fetched data
  //         const fetchedMessages = data.messages.map((message, index) => {
  //             return { text: message.content, sender: 'Human' }
  //         });
  //         const fetchedResponses = data.responses.map((response, index) => {
  //             return { text: response.response_content, sender: 'Over-Lord' }
  //         });
  
  //         // Combine and sort the fetched messages and responses by id
  //         let combinedMessages = [...fetchedMessages, ...fetchedResponses].sort((a, b) => a.id - b.id);
  
  //         // Set the messages state to the combined and sorted messages
  //         setMessages(combinedMessages);
  //     })
  //     .catch((error) => {
  //         console.error('Error:', error);
  //     });
  // }, []);
  






















































// import { faBuildingCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
// import React, { useState } from 'react';
// import '../styling/DashBoard.css';
// import '../styling/SideBar.css'; // Import the Sidebar.css file


// // Create a JavaScript version of the ChatBot class
// class ChatBot {
//     intents = [
//         ['hi|hello|hey|hey there', ['Hey there!']],
//         ['what\'s up|sup|what\'s new', ['Not much, just chatting with you!', 'Just hanging out, how about you?', 'Nothing new, how about you?']],
//         ['how are you|how\'s it going|how have you been', ['I\'m good, how about you?', 'I\'ve been doing alright, thanks for asking! How about you?']],
//         ['.*', ['I\'m not sure what you mean, can you please rephrase that?', 'Sorry, I don\'t understand what you\'re asking!', 'I\'m not sure I know the answer to that!']],
//     ];

//     respond(userInput) {
//         for (let i = 0; i < this.intents.length; i++) {
//             let pattern = new RegExp(this.intents[i][0]);
//             if (pattern.test(userInput)) {
//                 let responses = this.intents[i][1];
//                 let response = responses[Math.floor(Math.random() * responses.length)];
//                 return response;
//             }
//         }
//         return "Sorry, I didn't understand that.";
//     }
// }
// function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState("");
//     const chatbot = new ChatBot();
  
//     function sendMessage(e) {
//       e.preventDefault();
//       if (userInput.toLowerCase() === 'quit') {
//         setMessages([
//           ...messages,
//           { text: 'THANKS FOR BEING HERE', sender: 'Over-Lord ' },
//         ]);
//       } else {
//         let botResponse = chatbot.respond(userInput);
//         setMessages([
//           ...messages,
//           { text: userInput, sender: 'Human ' },
//           { text: botResponse, sender: 'Over-Lord ' },
//         ]);
//       }
//       setUserInput("");
//     }
  
//     function handleInputChange(e) {
//       setUserInput(e.target.value);
//     }
  
//     function openNav() {
//       document.getElementById("mySidenav").style.width = "250px";
//       document.getElementById("main").style.marginLeft = "250px";
//       document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
//     }
  
//     function closeNav() {
//       document.getElementById("mySidenav").style.width = "0";
//       document.getElementById("main").style.marginLeft= "0";
//       document.body.style.backgroundColor = "white";
//     }

  
//     return (
//       <div className="front-page">
//         {/* <h1>Hello dashboard</h1> */}
//         <div className="chat-box">
//           <div className="chat-area">
//             {messages.map((message, index) => (
//               <div key={index} className={`${message.sender}-msg`}>
//                 <p><strong>{message.sender}:</strong> {message.text}</p>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={sendMessage}>
//             <input type="text" value={userInput} onChange={handleInputChange} className="chat-input" />
//             <button type="submit" className="chat-submit">Send</button>
//           </form>
//         </div>
//         <div id="mySidenav" className="sidenav">
//           <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
//           <a href="#">About</a>
//           <a href="#">Services</a>
//           <a href="#">Clients</a>
//           <a href="#">Contact</a>
//         </div>
//         <div id="main">
//           <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; Menu</span>
//         </div>
//       </div>
//     );
//   }
  
//   export default Dashboard;





















// import { faBuildingCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
// import React, { useState } from 'react';
// import '../styling/DashBoard.css';

// // Create a JavaScript version of the ChatBot class
// class ChatBot {
//     intents = [
//         ['hi|hello|hey|hey there', ['Hey there!']],
//         ['what\'s up|sup|what\'s new', ['Not much, just chatting with you!', 'Just hanging out, how about you?', 'Nothing new, how about you?']],
//         ['how are you|how\'s it going|how have you been', ['I\'m good, how about you?', 'I\'ve been doing alright, thanks for asking! How about you?']],
//         ['.*', ['I\'m not sure what you mean, can you please rephrase that?', 'Sorry, I don\'t understand what you\'re asking!', 'I\'m not sure I know the answer to that!']],
//     ];

//     respond(userInput) {
//         for (let i = 0; i < this.intents.length; i++) {
//             let pattern = new RegExp(this.intents[i][0]);
//             if (pattern.test(userInput)) {
//                 let responses = this.intents[i][1];
//                 let response = responses[Math.floor(Math.random() * responses.length)];
//                 return response;
//             }
//         }
//         return "Sorry, I didn't understand that.";
//     }
// }

// function Dashboard() {
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState("");
//     const chatbot = new ChatBot();

//     function sendMessage(e) {
//         e.preventDefault();  // prevent page refresh on form submit
//         if (userInput.toLowerCase() === 'quit') {
//             setMessages([
//                 ...messages,
//                 { text: 'THANKS FOR BEING HERE', sender: 'Over-Lord ' },
//             ]);
//         } else {
//             let botResponse = chatbot.respond(userInput);
//             setMessages([
//                 ...messages,
//                 { text: userInput, sender: 'Human ' },
//                 { text: botResponse, sender: 'Over-Lord ' },
//             ]);
//         }
//         setUserInput("");  // clear the input field
//     }

//     function handleInputChange(e) {
//         setUserInput(e.target.value);
//     }

//     return (
//       <div className="front-page">
//           {/* <h1>Hello dashboard</h1> */}
//           <div className="chat-box">
//               <div className="chat-area">
//                   {messages.map((message, index) => (
//                       <div key={index} className={`${message.sender}-msg`}>
//                           <p><strong>{message.sender}:</strong> {message.text}</p>
//                       </div>
//                   ))}
//               </div>
//               <form onSubmit={sendMessage}>
//                   <input type="text" value={userInput} onChange={handleInputChange} className="chat-input" />
//                   <button type="submit" className="chat-submit">Send</button>
//               </form>
//           </div>
//       </div>
//   );
// }

// export default Dashboard;



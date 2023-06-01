import React from 'react';
import Typewriter from 'typewriter-effect';

function About() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: 'green' }}>
            <div>
                <h1>About Us</h1>
                <Typewriter
                    options={{ delay: 20 }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString('<p>Our AI Companion is designed with the aim of providing a conversational partner that\'s available to chat at any time.</p>')
                            .pauseFor(100)
                            .typeString('<p>Using the latest advancements in AI and machine learning, our AI Companion can engage in various topics, answer questions, perform simple math calculations, and provide company when you need it.</p>')
                            .pauseFor(100)
                            .typeString('<p>The AI companion is continually learning and improving, aiming to provide more meaningful and engaging conversations as it evolves.</p>')
                            .pauseFor(100)
                            .typeString('<p>Privacy is of utmost importance to us. All interactions with the AI Companion are kept strictly confidential and are used solely for the purpose of improving the chatbot\'s responses.</p>')
                            .pauseFor(100)
                            .typeString('<p>We hope our AI Companion brings value to your daily routine, whether you use it for asking questions, casual conversation, or just to pass the time.</p>')
                            .start();
                    }}
                />
            </div>
        </div>
    )
}

export default About;


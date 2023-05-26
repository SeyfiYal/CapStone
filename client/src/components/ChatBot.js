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

export default ChatBot;

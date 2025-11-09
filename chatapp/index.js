const ChatRoom = require('./chatRoom');

const chat = new ChatRoom();

chat.on('userJoined', (user) => {
    console.log(`${user} has joined the chat.`);
});

chat.on('message', ({ user, message }) => {
    console.log(`${user}: ${message}`);
});

chat.on('userLeft', (user) => {
    console.log(`${user} has left the chat.`);
}); 

// Simulate chat activity
chat.join('Alice');
chat.sendMessage('Alice', 'Hello everyone!');   
chat.join('Bob');
chat.sendMessage('Bob', 'Hi Alice!');
chat.leave('Alice');
chat.sendMessage('Bob', 'Goodbye Alice!');
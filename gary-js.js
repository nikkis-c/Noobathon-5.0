let conversationStage = 0;

// Function to start the chat with Gunther
function startChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.style.display = 'block';
    
    // Add a short delay before allowing outside clicks to close the popup
    setTimeout(() => {
        chatPopup.classList.add('active');
        document.addEventListener("click", closeOnOutsideClick);
    }, 10); 

    showMessage("Hi there! How are you doing?", ['I’m here to chat with you', 'I’m eager for a drink']);
    conversationStage = 1;
}

// Function to close the chat
function closeChat() {
    const chatPopup = document.getElementById("chatPopup");
    chatPopup.classList.remove("active");

    setTimeout(() => {
        chatPopup.style.display = "none";
        document.removeEventListener("click", closeOnOutsideClick); // Remove listener after closing
    }, 300);
}

// Function to close popup when clicking outside
function closeOnOutsideClick(event) {
    const chatPopup = document.getElementById("chatPopup");
    
    // If the popup is open and the click is outside, close it
    if (!chatPopup.contains(event.target) && event.target.id !== "startChatButton") {
        closeChat();
    }
}

// Function to show a message and possible replies
function showMessage(message, replies = []) {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');
    
    chatMessages.innerHTML += `<div class="message gunther-message"><p>${message}</p></div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        chatOptions.innerHTML = '';

        replies.forEach((reply, index) => {
            setTimeout(() => {
                const replyButton = document.createElement('button');
                replyButton.innerHTML = reply.replace(/ /g, '&nbsp;');
                replyButton.onclick = () => handleReply(reply);
                chatOptions.appendChild(replyButton);
                replyButton.classList.add('show'); // Apply animation
            }, index * 1000);
        });
    }, 1000);
}

// Function to handle the user's reply
function handleReply(reply) {
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.innerHTML += `<div class="message user-message"><p>${reply}</p></div>`;

    if (conversationStage === 1) {
        if (reply === 'I’m here to chat with you') {
            showMessage("No, Rachel just entered...go away", []);
            conversationStage = 2;
        } else if (reply === 'I’m eager for a drink') {
            showMessage("Great! Here are some drink recommendations:\n1. Espresso\n2. Latte\n3. Mocha", []);
            conversationStage = 3;
        }
    } else if (conversationStage === 2) {
        showMessage("Alright, chat later then!", []);
        conversationStage = 4;
    } else if (conversationStage === 3) {
        showMessage("Have a great day with your drinks!", []);
        conversationStage = 4;
    }
}

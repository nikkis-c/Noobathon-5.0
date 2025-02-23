let music = document.getElementById("background-music");
let button = document.querySelector(".music-button");
let conversationStage = 0;

// Function to display info message
function showInfo(info) {
    const infoCard = document.querySelector('.info-card');
    const infoContent = document.getElementById('info-content');
    
    infoContent.innerHTML = `<p>${info}</p>`;
    
    if (!infoCard.classList.contains('flip')) {
        infoCard.classList.add('flip');
    } else {
        infoContent.style.animation = 'none';
        infoContent.offsetHeight;
        infoContent.style.animation = 'fadeIn 0.5s ease-out';
    }
    
    setTimeout(() => {
        infoCard.classList.remove('flip');
    }, 5000);
}

// Function to autoplay music
function autoPlayMusic() {
    document.body.addEventListener('click', () => {
        if (music.paused) {
            music.play();
        }
    }, { once: true });

    let playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Music autoplayed successfully.");
        }).catch(() => {
            console.log("Autoplay blocked, waiting for user interaction.");
        });
    }
}

// Function to toggle music on/off
function toggleMusic() {
    if (music.paused) {
        music.play();
        button.innerHTML = "🔇 Sound Off";
    } else {
        music.pause();
        button.innerHTML = "🔊 Sound On";
    }
}

function startChat() {
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup.style.display === 'block') return;

    chatPopup.style.display = 'block';

    if (!chatPopup.classList.contains('active')) {
        setTimeout(() => {
            chatPopup.classList.add('active');
            document.addEventListener("click", closeOnOutsideClick, { once: true });
        }, 10);
    }

    console.log("Chat started");

    if (conversationStage === 0) {
        showMessage("Oh great, another customer. What do you want?", ['I’m here to chat with you', 'I need a drink, Gunther']);
        conversationStage = 1;
    }
}

function showMessage(message, replies = []) {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    chatMessages.innerHTML += `<div class="message gunther-message"><p>${message.replace(/\n/g, '<br>')}</p></div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        chatOptions.innerHTML = '';
        replies.forEach((reply, index) => {
            setTimeout(() => {
                if (!document.querySelector(`button[data-reply="${reply}"]`)) {
                    const replyButton = document.createElement('button');
                    replyButton.innerHTML = reply.replace(/ /g, '&nbsp;');
                    replyButton.setAttribute('data-reply', reply);
                    replyButton.onclick = () => handleReply(reply);
                    chatOptions.appendChild(replyButton);
                    replyButton.classList.add('show');
                }
            }, index * 1000);
        });
    }, 1000);
}

function closeChat() {
    const chatPopup = document.getElementById("chatPopup");
    chatPopup.classList.remove("active");

    setTimeout(() => {
        chatPopup.style.display = "none";
        document.removeEventListener("click", closeOnOutsideClick);
    }, 300);
}

function handleReply(reply) {
    console.log("Reply received:", reply);
    console.log("Current conversationStage:", conversationStage);

    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<div class="message user-message"><p>${reply}</p></div>`;
    function openRules(event) {
    event.preventDefault(); // Prevent link navigation
    document.getElementById("rulesModal").classList.add("show");
}

function closeRules() {
    document.getElementById("rulesModal").classList.remove("show");
}

    if (conversationStage === 1) {
        if (reply === 'I’m here to chat with you') {
            showMessage("Oh, fantastic."+"<br>"+" Because serving coffee wasn’t enough,"+"<br>"+"now I have to entertain people too.", []);
            setTimeout(() => {
                showMessage("Fine, since you’re here, "+"<br>"+"let me tell you a joke..."+"<br>"+" Why did the coffee file a police report? "+"<br>"+"It got mugged!", ['Haha, good one!', 'That was bad']);
            }, 2000);
            conversationStage = 2;
        } else if (reply === 'I need a drink, Gunther') {
            showMessage("Oh, you need a coffee?"+"<br>"+" And I need Rachel to love me,"+"<br>"+" but we don’t always get what we want, do we?", []);
            setTimeout(() => {
                showMessage("Fine, here are your options:"+"<br>"+" 1. Espresso "+"<br>"+"2. Latte "+"<br>"+"3. Cappuccino", ['I’ll take a cappuccino', 'What’s so great about cappuccino?']);
            }, 2000);
            conversationStage = 3;
        }
    } else if (conversationStage === 2) {
        showMessage("Alright, chat later then. "+"<br>"+"Or don’t. It’s fine.", []);
        setTimeout(() => {
            closeChat();
        }, 3000);
    } else if (conversationStage === 3) {
        if (reply === 'I’ll take a cappuccino') {
            showMessage("Coming right up! Oh wait... "+"<br>"+"I just remembered,"+"<br>"+" I work in a fictional coffee shop. "+"<br>"+"Too bad!", []);
        } else {
            showMessage("Cappuccinos have the perfect balance "+"<br>"+"of espresso and milk foam, plus they make"+"<br>"+" a great Instagram pic. "+"<br>"+"Not that I care about that.", ['You convinced me!', 'I’ll stick to my usual']);
        }
        setTimeout(() => {
            closeChat();
        }, 4000);
    }
}

function closeOnOutsideClick(event) {
    const chatPopup = document.getElementById("chatPopup");
    const isVisible = window.getComputedStyle(chatPopup).display !== "none";

    if (!chatPopup.contains(event.target)) {
        closeChat();
    }
}

document.addEventListener("click", closeOnOutsideClick);

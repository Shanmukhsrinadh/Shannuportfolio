// Toggle chatbot visibility
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "flex" : "none";
}

// Show typing indicator
function showTyping() {
    const messages = document.getElementById('chatbot-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot', 'typing');
    typingIndicator.innerHTML = `
        <div class="avatar bot"></div>
        <div class="bubble">...</div>
    `;
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;
    return typingIndicator;
}

// Add message to chat
function addMessage(sender, text) {
    const messages = document.getElementById('chatbot-messages');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.innerHTML = `
        <div class="avatar ${sender}"></div>
        <div class="bubble">${text}</div>
    `;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Process user input
function processInput() {
    const input = document.getElementById('userInput').value.trim();
    document.getElementById('userInput').value = '';

    if (input === "") return;

    addMessage('user', input);
    const typingIndicator = showTyping();

    setTimeout(() => {
        typingIndicator.remove();

        if (input.match(/\b(hi|hello|hey|greetings)\b/i)) {
            const greetings = [
                "Hello there! 😊 How can I help you today?",
                "Hey! I'm your portfolio assistant. What would you like to know?",
                "Hi! Ready to explore the portfolio?",
                "Hey there! Ask me about any section of the portfolio."
            ];
            addMessage('bot', greetings[Math.floor(Math.random() * greetings.length)]);
        } 
        else if (input.match(/\b(portfolio|project|website)\b/i)) {
            const portfolioResponses = [
                "I can guide you to any section of the portfolio. Try asking about: Home, About, Services, Certifications, Work, or Contact.",
                "This portfolio contains several sections. Would you like to see: Home, About, Services, or Projects?",
                "You can ask me to take you to any section of the portfolio."
            ];
            addMessage('bot', portfolioResponses[Math.floor(Math.random() * portfolioResponses.length)]);
        } 
        else if (input.match(/\b(services|service|what do you offer|offerings)\b/i)) {
            addMessage('bot', 'Taking you to the Services section...');
            setTimeout(() => scrollToSection('#service'), 500);
        }
        else if (input.match(/\b(goodbye|bye|see you later)\b/i)) {
            const goodbyes = [
                "Goodbye! Come back anytime.",
                "See you later!",
                "Bye! Feel free to chat again.",
                "Take care! I'm here whenever you need me."
            ];
            addMessage('bot', goodbyes[Math.floor(Math.random() * goodbyes.length)]);
        } 
        else if (input.match(/\b(home|main)\b/i)) {
            addMessage('bot', 'Taking you to the Home section...');
            setTimeout(() => scrollToSection('#home'), 500);
        } 
        else if (input.match(/\b(about him|about shannu|about|skills|what does he know)\b/i)) {
            if (input.match(/\b(skills|what does he know)\b/i)) {
                addMessage('bot', 'Showing skills in the About section...');
            } else {
                addMessage('bot', 'Taking you to the About section...');
            }
            setTimeout(() => scrollToSection('#about'), 500);
        } 
        else if (input.match(/\b(Certifications|certifications|certificate)\b/i)) {
            addMessage('bot', 'Showing Certifications...');
            setTimeout(() => scrollToSection('#Certifications'), 500);
        } 
        else if (input.match(/\b(resume|his resume|his cv|CV)\b/i)) {
            addMessage('bot', 'Opening resume in a new tab...');
            setTimeout(() => {
                window.open('https://drive.google.com/file/d/110rRY1vMHlaQ1OtlgQ3SDiiZzoQLUj6a/view', '_blank');
            }, 500);
        } 
        else if (input.match(/\b(projects|works|work|project)\b/i)) {
            addMessage('bot', 'Showing Projects...');
            setTimeout(() => scrollToSection('#work'), 500);
        } 
        else if (input.match(/\b(contact|reach out|get in touch)\b/i)) {
            addMessage('bot', 'Taking you to the Contact section...');
            setTimeout(() => scrollToSection('#main-footer'), 500);
        }
        else {
            addMessage('bot', "I can help you navigate the portfolio. Try asking about: Home, About, Services, Certifications, Projects, or Contact.");
        }
    }, 1000);
}

// Check for Enter key press
function checkEnter(event) {
    if (event.key === "Enter") {
        processInput();
    }
}
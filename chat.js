 
/* ==========================================
   MOSADDEK'S PORTFOLIO CHATBOT
   Free version - No API required
========================================== */

// 1. Select chatbot HTML elements

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const clearChatButton = document.getElementById("clearChat");

// 2. Portfolio knowledge base

const portfolioAnswers = [

    {
        keywords: ["who are you", "who is mosaddek", "about mosaddek", "introduce"],
        answer: "I'm Mosaddek Hosen, a Software Engineering student at Daffodil International University. I'm interested in software development, problem-solving, and building practical applications."
    },

    {
        keywords: ["education", "university", "study", "student", "department"],
        answer: "Mosaddek is studying Software Engineering at Daffodil International University. His academic interests include programming, algorithms, databases, and software development."
    },

    {
        keywords: ["skill", "technical skill", "programming language", "technology"],
        answer: "His technical learning areas include C programming, Java, Object-Oriented Programming, HTML, CSS, JavaScript, MySQL, Data Structures, and Algorithms."
    },

    {
        keywords: ["java", "oop", "object oriented"],
        answer: "Java is an important part of Mosaddek's programming journey. He has studied OOP concepts such as inheritance, polymorphism, encapsulation, abstraction, and exception handling."
    },

    {
        keywords: ["project", "projects", "portfolio work"],
        answer: "One of Mosaddek's academic projects is the Medical Store Database Management System. It focuses on managing medicines, suppliers, customers, employees, and sales transactions."
    },

    {
        keywords: ["medical store", "database project", "dbms", "mysql"],
        answer: "The Medical Store Database Management System is an academic database project. It is designed to organize medicine information, suppliers, customers, employees, and sales transactions using database concepts and SQL."
    },

    {
        keywords: ["career", "goal", "future", "backend", "ambition"],
        answer: "Mosaddek's career interest is Java backend development. He is working toward strengthening his programming fundamentals and learning the technologies needed to build backend applications."
    },

    {
        keywords: ["research", "publication", "medical diagnostics", "paper"],
        answer: "Mosaddek has worked on a review paper titled 'AI in Medical Diagnostics', studying research papers about the use of artificial intelligence in medical diagnosis."
    },

    {
        keywords: ["github", "git", "version control"],
        answer: "Mosaddek is learning Git and GitHub to manage code versions, maintain projects, and develop a professional software development workflow."
    },

    {
        keywords: ["contact", "email", "reach", "linkedin", "connect"],
        answer: "You can contact Mosaddek through the Contact section of this portfolio. You can also use the social links provided there."
    },

    {
        keywords: ["thank", "thanks"],
        answer: "You're welcome! Feel free to ask me anything else about Mosaddek."
    },

    {
        keywords: ["hello", "hi", "hey", "good morning", "good evening"],
        answer: "Hello! Welcome to Mosaddek's portfolio. What would you like to know about him?"
    }

];


// 3. Find the best matching answer


function getBotAnswer(question) {

    // Normalize the visitor's question
    const normalizedQuestion = question
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const questionWords = normalizedQuestion.split(" ");

    let bestAnswer = null;
    let highestScore = 0;

    portfolioAnswers.forEach((item) => {

        let score = 0;

        item.keywords.forEach((keyword) => {

            const normalizedKeyword = keyword.toLowerCase();

            if (normalizedKeyword.includes(" ")) {

                if (normalizedQuestion.includes(normalizedKeyword)) {
                    score += 3;
                }

            } else {

                if (questionWords.includes(normalizedKeyword)) {
                    score += 1;
                }

            }

        });

        if (score > highestScore) {
            highestScore = score;
            bestAnswer = item.answer;
        }

    });

    return bestAnswer || 
        "I don't have that information yet. Please explore the portfolio or contact Mosaddek directly.";

}



// 4. Display messages in the chat window

function addMessage(message, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("chat-message", sender);

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
     
    return messageElement;
}


// 5. Send a message and receive a response


function sendMessage(message) {

    const question = message.trim();

    if (!question) return;

    // Display visitor's message
    addMessage(question, "user");

    // Get the predefined response
    const answer = getBotAnswer(question);

    // Display typing indicator
    const typingMessage = addMessage(
        "Assistant is typing...",
        "bot"
    );

    typingMessage.classList.add("typing-indicator");

    // Show the answer after a short delay
    setTimeout(() => {

        typingMessage.textContent = answer;

        typingMessage.classList.remove("typing-indicator");

    }, 900);

}



// 6. Open chatbot

if (chatToggle && chatWindow) {

    chatToggle.addEventListener("click", () => {

        chatWindow.classList.toggle("active");

    });

}


// 7. Close chatbot

if (chatClose && chatWindow) {

    chatClose.addEventListener("click", () => {

        chatWindow.classList.remove("active");

    });

}


// 8. Handle message submission

if (chatForm && chatInput) {

    chatForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const message = chatInput.value;

        sendMessage(message);

        chatInput.value = "";

    });

}


// 9. Handle suggested questions

document.querySelectorAll(".chat-suggestion").forEach((button) => {

    button.addEventListener("click", () => {

        const question = button.dataset.question || button.textContent;

        sendMessage(question);

    });

});
// Clear the conversation

if (clearChatButton && chatMessages) {

    clearChatButton.addEventListener("click", () => {

        // Remove all previous messages
        chatMessages.innerHTML = "";

        // Restore the welcome message
        addMessage(
            "Hello! I'm Mosaddek's portfolio assistant. What would you like to know about him?",
            "bot"
        );

    });

}

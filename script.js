// Select all pages for easy navigation
const pages = document.querySelectorAll('.page');
let answers = []; // Array to store user answers
let currentQuestion = 0; // Index to track the current question

// Define the questions and answer options
const questions = [
    { question: "What kind of creative service do you need?", options: ["Photography", "Videography"] },
    { question: "Tell me about the event:", options: ["Portrait shoot", "Wedding", "Commercial/Company Party", "Product/Fun shoot"] },
    { question: "Number of attendees and subject?", options: ["1-2 subject", "Under 10 subject", "Under 25 subject", "40-50 subject"] },
    { question: "Number of hours of coverage?", options: ["1-2 hours", "3-4 hours", "5-6 hours", "More than 8 hours"] }
];

// Function to show a specific page
function showPage(index) {
    pages.forEach((page, i) => {
        page.style.display = i === index ? 'flex' : 'none'; // Show only the selected page
    });
}

// Function to start the inquiry process
function startInquiry() {
    loadQuestion(0); // Load the first question
    showPage(1); // Show the question page
}

// Function to load a specific question based on index
function loadQuestion(index) {
    if (index >= questions.length) {
        showResult(); // If no more questions, show results
        return;
    }
    const q = questions[index]; // Get the current question
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h2>${q.question}</h2>`; // Display the question
    
    // Create container for answer buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'; // Class for styling buttons

    // Create a button for each answer option
    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'question-option'; // Set button class for styling
        btn.innerText = option; // Set button text to the option
        btn.onclick = () => {
            answers[index] = option; // Store the answer
            loadQuestion(index + 1); // Load next question
        };
        buttonContainer.appendChild(btn); // Append button to the container
    });

    questionContainer.appendChild(buttonContainer); // Add button container to question
}

// Function to show the result based on user answers
function showResult() {
    const resultText = determinePackage(answers); // Determine the package based on answers
    document.getElementById('package-result').innerText = resultText; // Display the result
    showPage(2); // Move to the results page
}

// Function to determine the package based on user answers

// if (userAnswers.includes('Photography')){
    //     if(userAnswers.includes('1-2 subject') && userAnswers.includes('Portrait shoot') && userAnswers.includes('1-2 hours')){
    //         return 'PACKAGE 1: PORTRAIT STANDARD';
    //     }else if(userAnswers.includes('1-2 subject') && userAnswers.includes('3-4 hours') && (userAnswers.includes('Portrait shoot') || userAnswers.includes('Product / Funshoot'))){
    //         return 'PACKAGE 2: PORTRAIT DELUXE';
    //     }else if(userAnswers.includes('Under 10 subject') && userAnswers.includes('3-4 hours') && (userAnswers.includes('Product / Funshoot') || userAnswers.includes('Wedding'))){
    //         return 'PACKAGE 3: STANDARD EVENTS';
    //     }else if(userAnswers.includes('Under 25 subject') && userAnswers.includes('More than 8 hours') && (userAnswers.includes('Wedding') || userAnswers.includes('Commercial or Company Party'))){
    //         return 'PACKAGE 4: PREMIUM EVENTS';
    //     }else{
    //         return 'No package found';
    //     }
    
    
    // }else if (userAnswers.includes('Videography')){
    //     if(userAnswers.includes('Under 10 subject') && userAnswers.includes('3-4 hours') && (userAnswers.includes('Product / Funshoot') || userAnswers.includes('Wedding'))){
    //         return 'PACKAGE 1: MOTION PICTURE SUPER 8 - BASIC PACKAGE';
    //     }else if (userAnswers.includes('Under 25 subject') && userAnswers.includes('More than 8 hours') && (userAnswers.includes('Wedding') || userAnswers.includes('Commercial or Company Party'))){
    //         return 'PACKAGE 2: MOTION PICTURE SUPER 8 - FULL PACKAGE';
    //     }else{
    //         return 'No package found';
    //     }
    
    // }else{
    //     return 'No package found';
    // }

function determinePackage(answers) {
    // PHOTOGRAPHY PACKAGE LOGIC
    if (answers[0] === "Photography") {
        if (answers[1] === "Portrait shoot") {
            if (answers[2] === "1-2 subject" && answers[3] === "1-2 hours") {
                return "Your package is: PORTRAIT STANDARD"; // Package 1
            } else if ((answers[2] === "1-2 subject" || answers[2] === "Under 10 subject") && answers[3] === "3-4 hours") {
                return "Your package is: PORTRAIT DELUXE"; // Package 2
            }
        } else if (answers[1] === "Product / Fun shoot" || answers[1] === "Wedding") {
            if (answers[2] === "Under 25 subject" && answers[3] === "5-6 hours") {
                return "Your package is: STANDARD EVENTS"; // Package 3
            } else if (answers[2] === "40-50 subject" && answers[3] === "More than 8 hours") {
                return "Your package is: PREMIUM EVENTS"; // Package 4
            }
        }
    }

    // VIDEOGRAPHY PACKAGE LOGIC
    if (answers[0] === "Videography") {
        if (answers[1] === "Portrait shoot" && answers[2] === "1-2 subject" && answers[3] === "1-2 hours") {
            return "Your package is: MOTION PICTURE SUPER 8 - SOCIALS PACKAGE"; // Package 1
        } else if ((answers[1] === "Portrait shoot" || answers[1] === "Product/Fun shoot" || answers[1] === "Wedding") && 
                   answers[2] === "Under 10 subject" && answers[3] === "3-4 hours") {
            return "Your package is: MOTION PICTURE SUPER 8 - ADS PACKAGE"; // Package 2
        } else if ((answers[1] === "Product/Fun shoot" || answers[1] === "Wedding") && 
                   (answers[2] === "Under 10 subject" || answers[2] === "Under 25 subject") && 
                   answers[3] === "5-6 hours") {
            return "Your package is: MOTION PICTURE SUPER 8 - BASIC PACKAGE"; // Package 3
        } else if ((answers[1] === "Wedding" || answers[1] === "Commercial/Company Party") &&
                   answers[2] === "40-50 subject" && answers[3] === "More than 8 hours") {
            return "Your package is: MOTION PICTURE SUPER 8 - FULL PACKAGE"; // Package 4
        }
    }

    return "It's a GREAT custom package! BOOK A MEETING!"; // Default message for no package matches
}

function revealPackage() {
    document.getElementById('package-result').style.display = 'block'; // Show the package result
    document.getElementById('next-button').style.display = 'block'; // Show the next button
}

function showCountdown() {
    showPage(3);
}

function startCountdown() {
    const weddingDate = new Date(document.getElementById('wedding-date').value);
    const today = new Date();
    const differenceInTime = weddingDate - today;
    const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    document.getElementById('countdown-display').innerText = `${daysLeft} days until your wedding!`;
}

function showGallery() {
    showPage(4);
    fetchUnsplashPhotos();  // Fetch default wedding images on load
}

function fetchUnsplashPhotos() {
    const accessKey = 'NEWmFVQMu761HbgYSQUBcyks9-gjNP2JXpi3ZMKCA3Y'; // Your Unsplash API Key, Check screenshot folder if missing again
    const query = 'wedding';
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {
            const photoGrid = document.getElementById('photo-grid');
            photoGrid.innerHTML = ''; // Clear previous images
            data.results.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description || 'Wedding photo';
                photoGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching photos:', error));
}

// Function to open Calendly link
function openCalendly() {
    window.open('https://calendly.com/jagonos-jupet-1/creatives-services-meeting', '_blank'); // my Calendly link
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(0); // Start on the logo page
    document.getElementById('calendly-button').onclick = openCalendly; // Attach function to button click event
});


//calendly meeting link: https://calendly.com/jagonos-jupet-1/creatives-services-meeting
//Unsplash API NEWmFVQMu761HbgYSQUBcyks9-gjNP2JXpi3ZMKCA3Y
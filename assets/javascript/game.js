/*
    Script to play 'The Psychic Game'

    A random letter is selected, and the user has to guess the letter.
        
    Guesses are limited. Each time the user guesses a letter, it is displayed 
    and the remaining guesses decremented. 
    
    If the user guesses the selected letter, the 'wins' are incremented, and 
    if not the 'losses' are incremented. 
    
    After each game, the user can restart the game to play again.
*/

/******************************************************************************
    Variables available to entire script
******************************************************************************/
const alphabet = "abcdefghijklmnopqrstuvwxyz";  // valid letters
const maxGuesses = Math.ceil(alphabet.length/3); // Maximum guesses per game

const winsElement = document.getElementById("wins"); // Element references
const lossesElement = document.getElementById("losses");
const guessesLeftElement = document.getElementById("guesses-left");
const guessesMadeElement = document.getElementById("guesses-made");
const gameResultElement = document.getElementById("game-result");
const gameMessageElement = document.getElementById("message");

let lettersGuessed = [];                        // Array of letters guessed
let guessesLeft = 0;                            // Remaining guesses
let gamesWon = 0;                               // Games won
let gamesLost = 0;                              // Games lost
let gameLetter = "";                            // Letter for user to guess
let pastGuesses = "";                           // Previous letters guessed

/******************************************************************************
    Helper functions
******************************************************************************/

// Update games won
function updateGamesWon() {
    winsElement.innerHTML = `Wins: ${gamesWon}`;
}

// Update games lost
function updateGamesLost() {
    lossesElement.innerHTML = `Losses: ${gamesLost}`;
}

// Update remaining guesses
function updateGuessesLeft() {
    guessesLeftElement.innerHTML = `Guesses Left: ${guessesLeft}`;
    if (guessesLeft <= 0) {
        gamesLost++;
        updateGamesLost();
        updateGameResult(
            `You Lost...The letter was '${gameLetter.toUpperCase()}'.`);
        updateMessage("Let's try again!");
        resetGame();
    }
}

// Update game result
function updateGameResult(txt) {
    gameResultElement.innerHTML = txt;
}

// Update letters guessed
function updateLettersGuessed(newLetter) {
    pastGuesses += newLetter.toUpperCase() + "...";
    guessesMadeElement.innerHTML = pastGuesses;
}

// Update game message
function updateMessage(txt) {
    gameMessageElement.innerHTML = txt;
}

/******************************************************************************
    Reset the game.
    Select random letter, set guesses left to maximum, clear other elements,
    update page.
******************************************************************************/
function resetGame() {
    gameLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    guessesLeft = maxGuesses;
    for (let i = 0; i < alphabet.length; i++) {
        lettersGuessed[i] = false;
    }
    guessesMadeElement.innerHTML = "None";
    pastGuesses = "";
    updateGamesWon();
    updateGamesLost();
    updateGuessesLeft();
}

/*
    User Guessed the letter
*/
function processWin() {
    gamesWon++;
    updateGamesWon();
    updateGameResult(
        `YOU WON!...The letter was '${gameLetter.toUpperCase()}'.`);
    updateMessage("Congratulations! Let's go again.");
    resetGame();
}

/*
    User Guessed a wrong letter
*/
function processMiss() {
    guessesLeft--;
    updateGuessesLeft();
}

/******************************************************************************
    Event Handlers
******************************************************************************/
/*
    Process user keystroke
*/
function processGuess(character) {
    updateMessage("");
    updateGameResult("");
    let idx = alphabet.indexOf(character.toLowerCase());
    if (idx >= 0) {
        let userLetter = alphabet[idx];
        if (!lettersGuessed[idx]) {
            lettersGuessed[idx] = true;
            updateLettersGuessed(userLetter);
            if (userLetter === gameLetter) {
                processWin();
            } else {
                processMiss();
            }
        } else {
            updateMessage(`You've already guessed the letter '${character}'.`);
        }
    } else {
        updateMessage(`The input '${character}' is invalid.\nTry again.`);
    }
}

/*
    Exit the game
*/
function exitGame() {
    if (confirm("Are you sure you want to exit?")) {
        window.close();
    }
}

/******************************************************************************
    Entry Point => Start the game.
******************************************************************************/
resetGame();                                        
document.getElementById("exit-button").addEventListener("click", exitGame);
document.onkeyup = event => processGuess(event.key); // Wait on user input
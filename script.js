let words = [
  "Madrid",
  "Oslo",
  "Paris",
  "London",
  "Stockholm",
  "Berlin",
  "Amsterdam",
];
let random = words[Math.floor(Math.random() * words.length)];
let misstakes = 0;
let wrongAnswers = [];
let gameOn = false;
let body = document.querySelector("body");

// Skapar knappen starta spelet
let playBtn = document.createElement("button");
playBtn.innerText = "Start Game";
body.appendChild(playBtn);

let guessTheCity = document.createElement("p");
guessTheCity.innerText = "Guess the capital city";
body.appendChild(guessTheCity);
guessTheCity.className = "guessCity";

let emptyArray = [];
let userInput;

// Start knappen akiveras o ger ut det random word o försvinner sedan
playBtn.addEventListener("click", startGame);

function startGame() {
  gameOn = true;
  body.removeChild(guessTheCity);
  body.removeChild(playBtn);
  for (let i = 0; i < random.length; i++) {
    emptyArray[i] = "_";
  }

  userInput = emptyArray.join("");
  document.getElementById("chosenword").innerHTML = userInput;
}

// Gör tangentbordet aktivt kopplar att bokstaven du klickar på matchar något av dem slumpade orden.
document.addEventListener("keyup", function (rand) {
  if (gameOn) {
    let found = false;
    for (let i = 0; i < random.length; i++) {
      if (rand.key.toLocaleLowerCase() == random[i].toLocaleLowerCase()) {
        found = true;
        userInput = userInput.split("");
        userInput[i] = rand.key;
        userInput = userInput.join("");

        if (userInput.toLocaleLowerCase() === random.toLocaleLowerCase()) {
          document.getElementById("win").style.display = "block";
          document.getElementById("restartBtn").style.display = "block";
          gameOn = false;
        }
      }
    }
    // skickar in det felaktiga svaret i wrongAnswers list och räknar alla bokstäver som är fel.
    if (!found) {
      wrongAnswers.push(rand.key);
      misstakes++;
    }

    switch (misstakes) {
      case 1:
        document.getElementById("ground").style.display = "block";
        break;
      case 2:
        document.getElementById("scaffold").style.display = "block";
        break;
      case 3:
        document.getElementById("head").style.display = "block";
        break;
      case 4:
        document.getElementById("body").style.display = "block";
        break;
      case 5:
        document.getElementById("arms").style.display = "block";
        break;
      case 6:
        document.getElementById("legs").style.display = "block";
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("rightWord").innerHTML = random;
        document.getElementById("rightAnswer").style.display = "block";
        document.getElementById("restartBtn").style.display = "block";
        document.getElementById("chosenword").style.display = "none";
        gameOn = false;
        break;
    }

    document.getElementById("chosenword").innerHTML = userInput;
    document.getElementById("wronganswer").innerHTML = wrongAnswers;
    document.getElementById("misstakeCounter").innerHTML = misstakes;
  }
});

document.getElementById("restartBtn").addEventListener("click", function () {
  window.location.reload();
});

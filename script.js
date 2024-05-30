// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');
    const timerDisplay = document.getElementById('timer');
    let timer; // Variable to hold the timer interval
    let firstTile = null;
    let secondTile = null;
    let matchedPairs = 0;
    const totalPairs = 8;

    // Function to start the game
    function startGame() {
        resetGame(); // Reset the game
        startTimer(); // Start the timer
        createTiles(); // Create the game tiles
    }

    // Function to reset the game
    function resetGame() {
        clearInterval(timer); // Clear the timer
        timerDisplay.textContent = '00:00'; // Reset the timer display
        matchedPairs = 0; // Reset matched pairs counter
        firstTile = null;
        secondTile = null;
        gameBoard.innerHTML = ''; // Clear the game board
    }

    // Function to start the timer
    function startTimer() {
        let seconds = 0;
        timer = setInterval(() => {
            seconds++;
            let mins = Math.floor(seconds / 60);
            let secs = seconds % 60;
            timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Function to create the game tiles
    function createTiles() {
        const images = [];
        for (let i = 1; i <= totalPairs; i++) {
            images.push(`pictures/${i}.jpeg`);
            images.push(`pictures/${i}.jpeg`);
        }
        images.sort(() => 0.5 - Math.random()); // Shuffle the images array

        images.forEach((image, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.image = image;

            const img = document.createElement('img');
            img.src = image;
            tile.appendChild(img);

            tile.addEventListener('click', () => {
                handleTileClick(tile);
            });

            gameBoard.appendChild(tile);
        });
    }

    // Function to handle tile click
    function handleTileClick(tile) {
        if (firstTile && secondTile) return; // If two tiles are already selected, ignore further clicks

        tile.classList.add('show'); // Show the clicked tile
        if (!firstTile) {
            firstTile = tile;
        } else if (tile !== firstTile) {
            secondTile = tile;
            checkForMatch();
        }
    }

    // Function to check if two selected tiles match
    function checkForMatch() {
        if (firstTile.dataset.image === secondTile.dataset.image) {
            matchedPairs++;
            if (matchedPairs === totalPairs) {
                endGame();
            }
            resetSelection();
        } else {
            setTimeout(() => {
                firstTile.classList.remove('show');
                secondTile.classList.remove('show');
                resetSelection();
            }, 1000);
        }
    }

    // Function to reset the tile selection
    function resetSelection() {
        firstTile = null;
        secondTile = null;
    }

    // Function to end the game
    function endGame() {
        clearInterval(timer);
        // Start the confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        // Display the celebration message
        const message = document.createElement('div');
        message.classList.add('celebration-message');
        message.innerText = "Great job, you're a memory master!";
        document.body.appendChild(message);
    }

    // Event listener for the start button
    startButton.addEventListener('click', startGame);
});

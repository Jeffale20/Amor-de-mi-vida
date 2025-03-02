document.addEventListener("DOMContentLoaded", function () {
    const countdown = document.getElementById("birthdayCountdown");
    const specialMessage = document.getElementById("specialMessage");
    const imagen = document.getElementById("cumpleImagen");
    const mensaje = document.getElementById("cumpleMensaje");
    const videos = document.querySelectorAll("#videoContainer video");


    const startButton = document.getElementById("startPuzzleGameButton");
    const puzzleContainer = document.getElementById("puzzleGameContainer");
    const puzzleBoard = document.getElementById("puzzleGameBoard");
    const puzzlePiecesContainer = document.getElementById("puzzlePiecesContainer");
    const puzzleResult = document.getElementById("puzzleGameResult");
    const guideImage = document.getElementById("guideImage");
  


    // Fecha objetivo: 2 de marzo del año actual
    const targetDate = new Date(new Date().getFullYear(), 2, 2, 0, 0, 0);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;

        // Si hoy es 2 de marzo, mostrar mensaje especial
        if (now.getMonth() === 2 && now.getDate() === 2) {
            specialMessage.style.display = "block";
            countdown.innerHTML = "¡Feliz cumpleaños, mi amor! 🎉💖";
            return;
        }

        // Calcular días, horas, minutos y segundos restantes
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdown.innerHTML = `Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();



    imagen.addEventListener("click", function () {
        mensaje.classList.toggle("mostrar");
    });

    videos.forEach(video => {
        video.addEventListener("play", function () {
            console.log("El video se está reproduciendo.");
        });

        video.addEventListener("pause", function () {
            console.log("El video ha sido pausado.");
        });
    });

 

    // Puzzle de una Foto Especial
    let selectedImage = "";
    const boardSize = 300;
    const puzzleSize = 3;
    let pieceWidth, pieceHeight;
    let selectedPiece = null;
    let placedPieces = 0;

    const messages = {
        "Imagenes/puzzle1.jpg": "Cada historia de amor tiene piezas únicas, y tú eres la que da sentido a la mía. 🧩✨ **Yo**",
        "Imagenes/puzzle2.jpg": "No importa cuán complicado parezca el camino, juntos siempre encontramos la forma de encajar. 💕 **siempre**",
        "Imagenes/puzzle3.jpg": "Eres mi refugio, mi paz y mi destino, la razón por la que todo en mi vida tiene color. 🌟 **seré**",
        "Imagenes/puzzle4.jpg": "Como este rompecabezas, nuestro amor está lleno de momentos perfectos que nos iluminan. 💫 **tu luz en la oscuridad**"
    };

    document.querySelectorAll(".selectable-image").forEach(image => {
        image.addEventListener("click", () => {
            selectedImage = image.src;
            guideImage.src = selectedImage;
            guideImage.style.width = `${boardSize}px`;
            guideImage.style.height = `${boardSize}px`;

            document.querySelectorAll(".selectable-image").forEach(img => img.classList.remove("selected"));
            image.classList.add("selected");
        });
    });

    startButton.addEventListener("click", () => {
        if (!selectedImage) {
            alert("Por favor, selecciona una imagen primero.");
            return;
        }
        puzzleContainer.classList.remove("oculto");
        createPuzzle();
    });

    function createPuzzle() {
        guideImage.classList.remove("oculto");
        puzzleBoard.innerHTML = "";
        puzzlePiecesContainer.innerHTML = "";
        placedPieces = 0;

        puzzleBoard.style.width = `${boardSize}px`;
        puzzleBoard.style.height = `${boardSize}px`;
        puzzlePiecesContainer.style.width = `${boardSize}px`;
        puzzlePiecesContainer.style.height = `${boardSize}px`;

        pieceWidth = boardSize / puzzleSize;
        pieceHeight = boardSize / puzzleSize;

        let pieces = [];
        for (let row = 0; row < puzzleSize; row++) {
            for (let col = 0; col < puzzleSize; col++) {
                let piece = document.createElement("div");
                piece.classList.add("puzzle-piece");
                piece.style.width = `${pieceWidth}px`;
                piece.style.height = `${pieceHeight}px`;
                piece.style.backgroundImage = `url(${selectedImage})`;
                piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;
                piece.style.backgroundPosition = `${-col * pieceWidth}px ${-row * pieceHeight}px`;
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.addEventListener("click", selectPiece);
                pieces.push(piece);
            }
        }

        pieces.sort(() => Math.random() - 0.5);
        pieces.forEach(piece => puzzlePiecesContainer.appendChild(piece));

        for (let row = 0; row < puzzleSize; row++) {
            for (let col = 0; col < puzzleSize; col++) {
                let slot = document.createElement("div");
                slot.classList.add("puzzle-slot");
                slot.style.width = `${pieceWidth}px`;
                slot.style.height = `${pieceHeight}px`;
                slot.dataset.row = row;
                slot.dataset.col = col;
                slot.addEventListener("click", placePiece);
                puzzleBoard.appendChild(slot);
            }
        }
    }

    function selectPiece(event) {
        selectedPiece = event.target;
        document.querySelectorAll(".puzzle-piece").forEach(piece => piece.classList.remove("selected-piece"));
        selectedPiece.classList.add("selected-piece");
    }

    function placePiece(event) {
        if (!selectedPiece) return;
        let slot = event.target;

        if (slot.dataset.row === selectedPiece.dataset.row && slot.dataset.col === selectedPiece.dataset.col) {
            slot.appendChild(selectedPiece);
            selectedPiece.style.position = "absolute";
            selectedPiece.style.left = "0";
            selectedPiece.style.top = "0";
            selectedPiece.classList.remove("selected-piece");
            selectedPiece.removeEventListener("click", selectPiece);
            selectedPiece = null;
            placedPieces++;
            checkWinCondition();
        }
    }

    function checkWinCondition() {
        if (placedPieces === puzzleSize * puzzleSize) {
            let imagePath = Object.keys(messages).find(key => selectedImage.includes(key));
            if (imagePath && messages[imagePath]) {
                puzzleResult.textContent = messages[imagePath];
            }
        }
    }
    

});

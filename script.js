import { db, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", function () {
    generarCalendario();
    crearEfectoCorazones();
});

function actualizarContadorJuntos() {
    let fechaInicio = new Date("April 20, 2024 00:00:00").getTime();
    
    setInterval(() => {
        let ahora = new Date().getTime();
        let tiempoJuntos = ahora - fechaInicio;

        let dias = Math.floor(tiempoJuntos / (1000 * 60 * 60 * 24));
        let horas = Math.floor((tiempoJuntos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((tiempoJuntos % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((tiempoJuntos % (1000 * 60)) / 1000);

        document.getElementById("contadorJuntos").innerHTML = 
            `${dias} días, ${horas}h, ${minutos}m, ${segundos}s`;
    }, 1000);
}

// Iniciar el contador cuando cargue la página
window.onload = actualizarContadorJuntos;

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón y el input
    const showFraseButton = document.getElementById("showFraseButton");
    
    // Event listener para el botón
    showFraseButton.addEventListener("click", mostrarFrase);
});

const frasesDeAmor = [
    "Eres la razón de mis sonrisas.",
    "Te amo más de lo que las palabras pueden decir.",
    "Cada día a tu lado es un regalo.",
    "Mi amor por ti crece cada día.",
    "Eres mi persona favorita en el mundo.",
    "Contigo, los momentos ordinarios se vuelven mágicos.",
    "Tu amor ilumina mi mundo.",
    "Eres el sueño que nunca quiero despertar.",
    "Mi corazón late por ti.",
    "En tus ojos encuentro mi hogar.",
    "Eres mi mejor decisión.",
    "Tu amor me hace mejor persona.",
    "Cada segundo contigo vale una eternidad.",
    "Eres mi refugio en la tormenta.",
    "Tu sonrisa es mi momento favorito del día.",
    "En ti encontré todo lo que buscaba.",
    "Eres la melodía de mi corazón.",
    "Contigo, el amor tiene sentido.",
    "Eres mi pensamiento constante.",
    "Tu amor me da fuerzas para todo.",
    "Eres mi aventura favorita.",
    "En tus brazos encuentro la paz.",
    "Cada día te amo más que ayer.",
    "Eres mi historia de amor favorita.",
    "Tu amor me hace invencible.",
    "Contigo, todo es posible.",
    "Eres mi felicidad diaria.",
    "Tu amor me completa.",
    "Eres mi razón para creer en el amor.",
    "Cada momento contigo es un tesoro.",
    "Tu amor es mi bendición diaria.",
    "Eres mi destino perfecto.",
    "En ti encontré mi lugar en el mundo.",
    "Tu amor me da alas.",
    "Eres mi sol en días nublados.",
    "Contigo, la vida es más dulce.",
    "Tu amor me inspira.",
    "Eres mi sueño hecho realidad.",
    "En tu mirada encuentro mi paz.",
    "Tu amor me hace soñar.",
    "Eres mi todo y más.",
    "Cada día agradezco tenerte.",
    "Tu amor es mi mayor tesoro.",
    "Eres la pieza que faltaba en mi vida.",
    "En ti encontré mi complemento perfecto.",
    "Tu amor me hace sentir vivo.",
    "Eres mi razón para sonreír.",
    "Contigo, el tiempo se detiene.",
    "Tu amor es mi guía.",
    "Eres mi presente y mi futuro.",
    "Cada latido es por ti.",
    "Tu amor me transforma.",
    "Eres mi felicidad constante.",
    "En ti encontré mi propósito.",
    "Tu amor me da paz.",
    "Eres mi confidente perfecto.",
    "Contigo, todo tiene sentido.",
    "Tu amor me hace crecer.",
    "Eres mi inspiración diaria.",
    "En tu amor encuentro mi fuerza.",
    "Tu presencia ilumina mis días.",
    "Eres mi mejor regalo.",
    "Cada sonrisa tuya me enamora más.",
    "Tu amor es mi motivación.",
    "Eres mi lugar seguro.",
    "En ti encuentro mi calma.",
    "Tu amor me hace mejor.",
    "Eres mi razón de ser.",
    "Contigo, el amor es infinito.",
    "Tu amor me da esperanza.",
    "Eres mi historia favorita.",
    "En tus besos encuentro el cielo.",
    "Tu amor me hace fuerte.",
    "Eres mi mayor bendición.",
    "Cada día te elijo a ti.",
    "Tu amor me completa.",
    "Eres mi refugio perfecto.",
    "En ti encontré mi hogar.",
    "Tu amor me da valor.",
    "Eres mi razón para creer.",
    "Contigo, todo es especial.",
    "Tu amor me inspira a ser mejor.",
    "Eres mi felicidad eterna.",
    "En tu amor encuentro mi camino.",
    "Tu presencia me llena de alegría.",
    "Eres mi más bella realidad.",
    "Cada momento contigo es mágico.",
    "Tu amor me da vida.",
    "Eres mi puerto seguro.",
    "En ti encuentro mi paz interior.",
    "Tu amor me hace soñar despierto.",
    "Eres mi razón para vivir.",
    "Contigo, el amor es perfecto.",
    "Tu amor me da serenidad.",
    "Eres mi estrella guía.",
    "En tus abrazos encuentro consuelo.",
    "Tu amor me hace valiente.",
    "Eres mi mayor alegría.",
    "Cada día te amo más profundamente.",
    "Tu amor me hace sentir completo.",
    "Eres mi luz en la oscuridad.",
    "En ti encontré mi verdad.",
    "Tu amor me da libertad.",
    "Eres mi razón para mejorar.",
    "Contigo, la vida es bella.",
    "Tu amor me da claridad.",
    "Eres mi mayor tesoro.",
    "En tu sonrisa encuentro felicidad.",
    "Tu amor me hace crecer cada día.",
    "Eres mi inspiración constante.",
    "Cada momento contigo es un regalo.",
    "Tu amor me da confianza.",
    "Eres mi norte verdadero.",
    "En ti encuentro mi destino.",
    "Tu amor me hace invencible.",
    "Eres mi razón para agradecer.",
    "Contigo, todo es posible.",
    "Tu amor me da esperanza.",
    "Eres mi más dulce realidad.",
    "En tus palabras encuentro consuelo.",
    "Tu amor me hace soñador.",
    "Eres mi mayor bendición.",
    "Cada día es especial contigo.",
    "Tu amor me da paz mental.",
    "Eres mi refugio perfecto.",
    "En ti encontré mi todo.",
    "Tu amor me da fortaleza.",
    "Eres mi razón para existir.",
    "Contigo, el amor es verdadero.",
    "Tu amor me inspira a crecer.",
    "Eres mi felicidad constante.",
    "En tu mirada encuentro amor.",
    "Tu presencia me da vida.",
    "Eres mi más bella historia.",
    "Cada momento te amo más.",
    "Tu amor me da seguridad.",
    "Eres mi puerto seguro.",
    "En ti encuentro mi camino.",
    "Tu amor me hace valiente.",
    "Eres mi razón para luchar.",
    "Contigo, todo es mejor.",
    "Tu amor me da serenidad.",
    "Eres mi estrella brillante.",
    "En tus brazos encuentro paz.",
    "Tu amor me hace fuerte.",
    "Eres mi mayor alegría.",
    "Cada día agradezco tu amor.",
    "Tu amor me da plenitud.",
    "Eres mi luz constante.",
    "En ti encontré mi destino.",
    "Tu amor me da libertad.",
    "Eres mi razón para sonreír.",
    "Contigo, la vida es perfecta.",
    "Tu amor me da claridad.",
    "Eres mi tesoro más preciado.",
    "En tu sonrisa encuentro vida.",
    "Tu amor me hace mejor persona.",
    "Eres mi inspiración diaria.",
    "Cada momento es único contigo.",
    "Tu amor me da confianza.",
    "Eres mi guía en la vida.",
    "En ti encuentro mi felicidad.",
    "Tu amor me hace invencible.",
    "Eres mi razón para vivir.",
    "Contigo, todo es posible.",
    "Tu amor me da esperanza.",
    "Eres mi dulce realidad.",
    "En tus palabras encuentro amor.",
    "Tu amor me hace soñar.",
    "Eres mi bendición diaria.",
    "Cada día es mejor contigo.",
    "Tu amor me da tranquilidad.",
    "Eres mi refugio eterno.",
    "En ti encontré mi todo.",
    "Tu amor me da fuerza.",
    "Eres mi razón de ser.",
    "Contigo, el amor es real.",
    "Tu amor me inspira siempre.",
    "Eres mi felicidad verdadera.",
    "En tu mirada encuentro paz.",
    "Tu presencia me da alegría.",
    "Eres mi historia perfecta.",
    "Cada momento te quiero más.",
    "Tu amor me da seguridad.",
    "Eres mi puerto en la tormenta.",
    "En ti encuentro mi destino.",
    "Tu amor me hace valiente.",
    "Eres mi razón para seguir.",
    "Contigo, todo es especial.",
    "Tu amor me da calma.",
    "Eres mi estrella en la noche.",
    "En tus brazos encuentro hogar.",
    "Tu amor me hace crecer.",
    "Eres mi alegría constante.",
    "Cada día celebro tu amor.",
    "Tu amor me da plenitud.",
    "Eres mi luz eterna.",
    "En ti encontré mi camino.",
    "Tu amor me da libertad.",
    "Eres mi razón para vivir.",
    "Contigo, la vida es hermosa.",
    "Tu amor me da claridad.",
    "Eres mi tesoro único.",
    "En tu sonrisa encuentro paz.",
    "Tu amor me transforma.",
    "Eres mi inspiración eterna.",
    "Cada momento es mágico contigo.",
    "Tu amor me da valentía.",
    "Eres mi norte seguro.",
    "En ti encuentro mi felicidad.",
    "Tu amor me hace fuerte.",
    "Eres mi razón para existir.",
    "Contigo, todo es mejor.",
    "Tu amor me da esperanza.",
    "Eres mi dulce realidad.",
    "En tus palabras encuentro vida.",
    "Tu amor me hace soñar.",
    "Eres mi bendición eterna.",
    "Cada día es un regalo contigo.",
    "Tu amor me da serenidad.",
    "Eres mi refugio seguro.",
    "En ti encontré mi todo.",
    "Tu amor me da fortaleza.",
    "Eres mi razón de vivir.",
    "Contigo, el amor es eterno.",
    "Tu amor me inspira siempre.",
    "Eres mi felicidad completa.",
    "En tu mirada encuentro amor.",
    "Tu presencia me da vida.",
    "Eres mi historia perfecta.",
    "Cada momento te amo más.",
    "Tu amor me da confianza.",
    "Eres mi puerto seguro.",
    "En ti encuentro mi destino.",
    "Tu amor me hace valiente.",
    "Eres mi razón para luchar.",
    "Contigo, todo es posible.",
    "Tu amor me da paz.",
    "Eres mi estrella brillante.",
    "En tus brazos encuentro calma.",
    "Tu amor me hace crecer.",
    "Eres mi alegría diaria.",
    "Cada día celebro tenerte.",
    "Tu amor me da plenitud.",
    "Eres mi luz constante.",
    "En ti encontré mi camino.",
    "Tu amor me da libertad.",
    "Eres mi razón para sonreír.",
    "Contigo, la vida es perfecta.",
    "Tu amor me da claridad.",
    "Eres mi tesoro eterno.",
    "En tu sonrisa encuentro vida.",
    "Tu amor me transforma.",
    "Eres mi inspiración constante.",
    "Cada momento es único contigo.",
    "Tu amor me da valentía.",
    "Eres mi guía segura.",
    "En ti encuentro mi felicidad.",
    "Tu amor me hace invencible.",
    "Eres mi razón para vivir.",
    "Contigo, todo es especial.",
    "Tu amor me da esperanza.",
    "Eres mi dulce realidad.",
    "En tus palabras encuentro paz.",
    "Tu amor me hace soñar.",
    "Eres mi bendición diaria.",
    "Cada día es mejor contigo.",
    "Tu amor me da tranquilidad.",
    "Eres mi refugio eterno.",
    "En ti encontré mi todo.",
    "Tu amor me da fuerza.",
    "Eres mi razón de ser.",
    "Contigo, el amor es verdadero.",
    "Tu amor me inspira siempre.",
    "Eres mi felicidad eterna.",
    "En tu mirada encuentro paz.",
    "Tu presencia me da alegría.",
    "Eres mi historia perfecta.",
    "Cada momento te quiero más.",
    "Tu amor me da seguridad.",
    "Eres mi puerto en la tormenta.",
    "En ti encuentro mi destino.",
    "Tu amor me hace valiente.",
    "Eres mi razón para seguir.",
    "Contigo, todo es mágico.",
    "Tu amor me da calma.",
    "Eres mi estrella en la noche.",
    "En tus brazos encuentro hogar.",
    "Tu amor me hace crecer.",
    "Eres mi alegría infinita.",
    "Cada día celebro nuestro amor.",
    "Tu amor me da plenitud.",
    "Eres mi luz eterna.",
    "En ti encontré mi camino.",
    "Tu amor me da libertad.",
    "Eres mi razón para existir.",
    "Contigo, la vida es bella.",
    "Tu amor me da claridad.",
    "Eres mi tesoro único.",
    "En tu sonrisa encuentro vida.",
    "Tu amor me transforma.",
    "Eres mi inspiración eterna.",
    "Cada momento es especial contigo.",
    "Tu amor me da valentía.",
    "Eres mi norte verdadero.",
    "En ti encuentro mi felicidad.",
    "Tu amor me hace fuerte.",
    "Eres mi razón para vivir.",
    "Contigo, todo es mejor.",
    "Tu amor me da esperanza.",
    "Eres mi dulce realidad.",
    "En tus palabras encuentro vida.",
    "Tu amor me hace soñar.",
    "Eres mi bendición infinita.",
    "Cada día es un nuevo comienzo contigo.",
    "Tu amor me da serenidad absoluta.",
    "Eres mi refugio perpetuo.",
    "En ti encontré mi significado.",
    "Tu amor me da fortaleza inquebrantable.",
    "Eres mi razón de existir.",
    "Contigo, el amor es eterno.",
    "Tu amor me inspira cada segundo.",
    "Eres mi felicidad completa.",
    "En tu mirada encuentro mi universo.",
    "Tu presencia me da vida plena.",
    "Eres mi historia más hermosa.",
    "Cada momento te amo más intensamente.",
    "Tu amor me da confianza infinita.",
    "Eres mi puerto seguro eterno.",
    "En ti encuentro mi destino perfecto.",
    "Tu amor me hace invencible.",
    "Eres mi razón para luchar siempre.",
    "Contigo, todo es posible y más.",
    "Tu amor me da paz absoluta.",
    "Eres mi estrella más brillante.",
    "En tus brazos encuentro mi paraíso.",
    "Tu amor me hace crecer constantemente.",
    "Eres mi alegría perpetua.",
    "Cada día celebro nuestra unión.",
    "Tu amor me da plenitud total.",
    "Eres mi luz inextinguible.",
    "En ti encontré mi camino definitivo.",
    "Tu amor me da libertad verdadera.",
    "Eres mi razón para existir eternamente.",
    "Contigo, la vida es una aventura perfecta.",
    "Tu amor me da claridad absoluta.",
    "Eres mi tesoro más preciado.",
    "En tu sonrisa encuentro mi felicidad completa.",
    "Tu amor me transforma cada día.",
    "Eres mi inspiración infinita.",
    "Cada momento es un regalo precioso contigo.",
    "Tu amor me da valentía sin límites.",
    "Eres mi norte eterno.",
    "En ti encuentro mi felicidad absoluta.",
    "Tu amor me hace más fuerte cada día.",
    "Eres mi razón para vivir plenamente.",
    "Contigo, todo es extraordinario.",
    "Tu amor me da esperanza eterna.",
    "Eres mi más dulce realidad.",
    "En tus palabras encuentro mi verdad.",
    "Tu amor me hace soñar sin límites.",
    "Eres mi bendición más grande.",
    "Cada día es una nueva aventura juntos.",
    "Tu amor es mi mayor fortuna.",
    "Después de 364 formas de decir te amo, mi corazón aún encuentra nuevas maneras de expresar lo infinito que es mi amor por ti. Eres mi principio y mi fin, mi alfa y omega, el amor que trasciende las palabras y el tiempo. Esta frase, la número 365, representa no solo un año completo de amor, sino la promesa de una eternidad juntos."
    ];

function mostrarFrase() {
    let diaSeleccionado = document.getElementById("dayInput").value;

    if (diaSeleccionado >= 1 && diaSeleccionado <= 365) {
        // Asegura que no se pase del tamaño del array
        let frase = frasesDeAmor[(diaSeleccionado - 1) % frasesDeAmor.length];
        document.getElementById("fraseDisplay").textContent = `"${frase}"`;
    } else {
        document.getElementById("fraseDisplay").textContent = "Por favor, ingresa un día válido entre 1 y 365.";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function saveLetter() {
    const carta = document.getElementById("loveLetter").value;
    if (carta.trim() === "") {
        alert("Escribe algo hermoso para tu amor ❤️");
        return;
    }
    localStorage.setItem("cartaDeAmor", carta);
    alert("Tu carta ha sido guardada con amor 💌");
}

// Función para cambiar la canción cuando se hace clic en un elemento de la lista
function changeSong(song) {
    var player = document.getElementById('player');
    player.src = song; // Cambia la fuente del reproductor
    player.load(); // Carga la nueva canción
    player.play(); // Reproduce la nueva canción
}

function crearEfectoCorazones() {
    setInterval(() => {
        let heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animation = "floatUp 3s linear";
        document.getElementById("heart-container").appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 500);
}

document.getElementById("cartaImagen").addEventListener("click", function() {
    let mensaje = document.getElementById("mensaje");
    let respuesta = document.getElementById("respuesta");

    // Mostrar el mensaje si está oculto
    if (mensaje.style.display === "none" || mensaje.style.display === "") {
        mensaje.style.display = "block";
        setTimeout(() => {
            mensaje.classList.add("mostrar");
        }, 50);
        iniciarContador();
    }
    
    // Ocultar la respuesta si ya estaba visible
    respuesta.style.display = "none";
    respuesta.classList.remove("mostrar");
});

function mostrarRespuesta() {
    let respuesta = document.getElementById("respuesta");
    let mensaje = document.getElementById("mensaje");

    // Ocultar la pregunta y mostrar el mensaje de confirmación
    mensaje.style.display = "none";
    respuesta.style.display = "block";
    setTimeout(() => {
        respuesta.classList.add("mostrar");
    }, 50);
}

function iniciarContador() {
    let fechaObjetivo = new Date("Feb 14, 2025 00:00:00").getTime();
    let intervalo = setInterval(function() {
        let ahora = new Date().getTime();
        let diferencia = fechaObjetivo - ahora;
        
        if (diferencia <= 0) {
            clearInterval(intervalo);
            document.getElementById("contador").innerHTML = "¡Hoy es San Valentín! 💖";
            return;
        }
        
        let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        document.getElementById("contador").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const closePopup = document.querySelector(".close-btn");

    // Mostrar mensaje emergente
    window.showMessage = function (message) {
        popupMessage.innerText = message;
        popup.style.display = "flex";
    };

    // Cerrar mensaje emergente
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Hacer clic en cualquier imagen que no tenga mensaje para agregar uno
    document.querySelectorAll("#gallery img").forEach(img => {
        if (!img.onclick) {
            img.onclick = function () {
                showMessage("Un recuerdo especial contigo 💕");
            };
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cards-container");
    const saveCardButton = document.getElementById("save-card");
    const loveLetter = document.getElementById("loveLetter");

    // Cargar cartas guardadas
    function loadLetters() {
        const q = query(collection(db, "letters"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
            cardsContainer.innerHTML = ''; // Limpiar el contenedor
            snapshot.forEach((doc) => {
                const letterData = doc.data();
                addCardToDOM(letterData.text, doc.id);
            });
        });
    }

    // Guardar carta
    async function saveLetter() {
        const letter = loveLetter.value.trim();
        if (letter !== "") {
            try {
                await addDoc(collection(db, "letters"), {
                    text: letter,
                    timestamp: new Date()
                });
                showMessage("Carta guardada con éxito 💖");
                loveLetter.value = ""; // Limpiar el textarea
            } catch (e) {
                showMessage("Error al guardar la carta: " + e.message);
            }
        } else {
            showMessage("Por favor, escribe algo en la carta.");
        }
    }

    // Eliminar carta
    async function deleteLetter(docId) {
        try {
            await deleteDoc(doc(db, "letters", docId));
            showMessage("Carta eliminada 💔");
        } catch (e) {
            showMessage("Error al eliminar la carta: " + e.message);
        }
    }

    // Agregar carta al DOM
    function addCardToDOM(text, docId) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("saved-card");
        cardElement.innerHTML = `
            <p>${text}</p>
            <button class="delete-card">❌</button>
        `;
        cardsContainer.appendChild(cardElement);

        // Agregar evento para eliminar
        cardElement.querySelector(".delete-card").addEventListener("click", function() {
            deleteLetter(docId);
        });
    }

    // Inicializar
    loadLetters();

    // Evento para guardar carta
    saveCardButton.addEventListener("click", saveLetter);
});
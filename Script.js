let numeroSecreto, intentos;
const MAX_INTENTOS = 5;

function generarNumeroSecreto() {
    return Math.floor(Math.random() * 10) + 1;
}

function nuevoJuego() {
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    document.getElementById('mensaje').innerHTML = '';
    document.getElementById('contador').innerHTML = '';
    document.getElementById('numeroInput').value = '';
    document.getElementById('numeroInput').focus();
    document.getElementById('intentarBtn').disabled = false;
    document.getElementById('nuevoJuegoBtn').style.display = 'inline-block';
    // Quitar cualquier confeti existente
    const confetis = document.querySelectorAll('.confeti');
    confetis.forEach(c => c.remove());
    console.log("Nuevo juego. Número secreto:", numeroSecreto);
}

function lanzarConfeti() {
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.classList.add('confeti');
        confeti.style.left = Math.random() * 100 + '%';
        confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confeti.style.width = Math.random() * 10 + 5 + 'px';
        confeti.style.height = Math.random() * 10 + 5 + 'px';
        confeti.style.position = 'fixed';
        confeti.style.bottom = '0';
        confeti.style.zIndex = '9999';
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 2000);
    }
}

function verificarIntento() {
    const input = document.getElementById('numeroInput');
    const num = parseInt(input.value);
    const msg = document.getElementById('mensaje');
    const cont = document.getElementById('contador');

    if (isNaN(num) || input.value.trim() === '') {
        alert('❌ Ingresa un número válido (1-10)');
        input.value = '';
        input.focus();
        return;
    }
    if (num < 1 || num > 10) {
        alert('🔢 El número debe estar entre 1 y 10');
        input.value = '';
        input.focus();
        return;
    }

    intentos++;
    const restantes = MAX_INTENTOS - intentos;

    if (num === numeroSecreto) {
        msg.innerHTML = `🎉✨ ¡FELICIDADES! ✨🎉<br> Acertaste el número secreto (${numeroSecreto}) en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}.<br> 🌟 ¡Eres un genio! 🌟`;
        cont.innerHTML = '';
        document.getElementById('intentarBtn').disabled = true;
        lanzarConfeti(); // Animación sorpresa
        // Efecto de sonido (opcional, descomenta si quieres)
        // new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3').play();
    } else if (num < numeroSecreto) {
        msg.innerHTML = `📈 El número secreto es MAYOR. Intento ${intentos}/${MAX_INTENTOS}.`;
        cont.innerHTML = `Intentos restantes: ${restantes}`;
        input.value = '';
        input.focus();
        // Efecto de vibración en el input
        input.style.transform = 'scale(1.02)';
        setTimeout(() => input.style.transform = '', 200);
    } else {
        msg.innerHTML = `📉 El número secreto es MENOR. Intento ${intentos}/${MAX_INTENTOS}.`;
        cont.innerHTML = `Intentos restantes: ${restantes}`;
        input.value = '';
        input.focus();
        input.style.transform = 'scale(1.02)';
        setTimeout(() => input.style.transform = '', 200);
    }

    // Si se acaban los intentos sin adivinar
    if (intentos >= MAX_INTENTOS && num !== numeroSecreto) {
        msg.innerHTML = `😭 ¡Oh no! Has agotado tus ${MAX_INTENTOS} intentos.<br> El número secreto era ${numeroSecreto}. ¡Sigue practicando! 🎯`;
        document.getElementById('intentarBtn').disabled = true;
        cont.innerHTML = '';
    }
}

function resetJuego() {
    nuevoJuego();
    document.getElementById('intentarBtn').disabled = false;
    document.getElementById('mensaje').innerHTML = '';
    document.getElementById('contador').innerHTML = '';
}

window.onload = function () {
    nuevoJuego();
    document.getElementById('intentarBtn').addEventListener('click', verificarIntento);
    document.getElementById('nuevoJuegoBtn').addEventListener('click', resetJuego);
};

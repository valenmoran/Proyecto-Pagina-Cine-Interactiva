window.addEventListener('DOMContentLoaded', () => {
  // === MATRRX lógica de píldoras efect Matrix ===
  const pildoraAzul = document.querySelector('.pildora-azul');
  const pildoraRoja = document.querySelector('.pildora-roja');
  const resultadoMatrix = document.getElementById('resultado-matrix');
  const pantallaMatrix = document.getElementById('pantalla-matrix');
  const canvasMatrix = document.getElementById('canvas-matrix');
  const ctx = canvasMatrix.getContext('2d');

  // Variable  animación 
  let animacionMatrixId = null;

  pildoraAzul.addEventListener('click', () => {
    resultadoMatrix.textContent = "Fin del juego. Regresas a tu vida, creyendo lo que quieras creer.";
    pantallaMatrix.style.display = 'none';
    if(animacionMatrixId !== null){
      cancelAnimationFrame(animacionMatrixId);
      animacionMatrixId = null;
      ctx.clearRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    }
  });

  pildoraRoja.addEventListener('click', () => {
    resultadoMatrix.textContent = "";
    pantallaMatrix.style.display = 'block';
    startMatrixEffect();
  });

  function startMatrixEffect() {
    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%';
    let width = canvasMatrix.width = window.innerWidth;
    let height = canvasMatrix.height = window.innerHeight;
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for(let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if(drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      }

      animacionMatrixId = requestAnimationFrame(draw);
    }
    draw();
  }

  // === BLADE RUNNER test ===
  const preguntasBlade = [
    {
      texto: "Ves una tortuga boca arriba en el desierto. No puede volver sola. ¿Qué harías?",
      opciones: ["La ayudo", "La ignoro"],
      correcta: 0
    },
    {
      texto: "Alguien te da una billetera de piel de serpiente como regalo. ¿La aceptarías?",
      opciones: ["Sí", "No"],
      correcta: 1
    }
  ];

  const iconoPapel = document.getElementById('icono-papel');
  const iconoLapiz = document.getElementById('icono-lapiz');
  const preguntaDiv = document.getElementById('pregunta');
  const opcionesDiv = document.getElementById('opciones');
  const resultadoBlade = document.getElementById('resultado-blade');

  let indicePregunta = 0;
  let puntaje = 0;
  let juegoIniciado = false;

  function mostrarPregunta() {
    if(indicePregunta >= preguntasBlade.length) {
      preguntaDiv.textContent = "";
      opcionesDiv.innerHTML = "";
      resultadoBlade.textContent = puntaje === preguntasBlade.length ? "Eres humano" : "Eres replicante";
      juegoIniciado = false;
      return;
    }

    const pregunta = preguntasBlade[indicePregunta];
    preguntaDiv.textContent = pregunta.texto;
    opcionesDiv.innerHTML = "";

    pregunta.opciones.forEach((opcion, idx) => {
      const btn = document.createElement('button');
      btn.textContent = opcion;
      btn.onclick = () => {
        if(idx === pregunta.correcta) puntaje++;
        indicePregunta++;
        mostrarPregunta();
      };
      opcionesDiv.appendChild(btn);
    });
  }

  function iniciarJuegoBlade() {
    if(juegoIniciado) return;
    juegoIniciado = true;
    indicePregunta = 0;
    puntaje = 0;
    resultadoBlade.textContent = "";
    mostrarPregunta();
  }

  iconoPapel.addEventListener('click', iniciarJuegoBlade);
  iconoLapiz.addEventListener('click', iniciarJuegoBlade);

});



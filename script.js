const messages = [
  "Desde o primeiro olhar, tudo mudou.",
  "Cada momento com você é um presente.",
  "Seu sorriso ilumina meus dias.",
  "Obrigado por ser quem você é.",
  "Nossos momentos juntos são inesquecíveis.",
  "Te ver feliz é minha maior alegria.",
  "Você é minha inspiração diária.",
  "Nosso amor só cresce a cada dia.",
  "Prometo estar sempre ao seu lado.",
  "Você é tudo pra mim.",
  "Hoje celebramos você!",
  "Feliz aniversário, meu amor!"
];

const backgrounds = [
  "#fff0f5", "#ffe4e1", "#fffacd", "#f0fff0", "#e0ffff",
  "#f5f5dc", "#ffebcd", "#fafad2", "#e6e6fa", "#ffe6e6",
  "#f0f8ff", "#fffaf0"
];

const images = Array.from({ length: 12 }, (_, i) => {
  const index = i + 1;
  return `images/${index}.${index < 10 ? 'jpg' : 'JPG'}`; // Aqui você pode ajustar a extensão
});


const startBtn = document.getElementById("start-btn");
const presentation = document.getElementById("presentation");
const mainAudio = document.getElementById("main-audio");
const finalAudio = document.getElementById("final-audio");

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  presentation.classList.remove("hidden");
  mainAudio.play();
  generateSections();
});

function generateSections() {
  messages.forEach((msg, i) => {
    const section = document.createElement("section");
    section.style.backgroundColor = getBackgroundColor(i);

    const bgDiv = document.createElement("div");
    bgDiv.className = "background-img";
    bgDiv.style.backgroundImage = `url(${images[i]})`;

    section.appendChild(bgDiv); // adiciona primeiro para ficar no fundo

    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = images[i];
    img.classList.add("image-with-shadow"); // Adiciona a classe para sombra apenas na imagem
    img.style.zIndex = 1; // garante que fique acima do background

    p.textContent = msg;

    const heart1 = document.createElement("img");
    const heart2 = document.createElement("img");

    heart1.className = "heart";
    heart2.className = "heart";

    const heartImages = ["images/heart1.png", "images/heart2.png"];
    heart1.src = heartImages[Math.floor(Math.random() * heartImages.length)];
    heart2.src = heartImages[Math.floor(Math.random() * heartImages.length)];

    // Posicionamento inicial dos corações (fora da tela)
    heart1.style.position = "absolute";
    heart2.style.position = "absolute";

    heart1.style.top = "25%";
    heart1.style.left = "-120px";

    heart2.style.bottom = "25%";
    heart2.style.right = "-120px";

    heart1.style.transition = "transform 1s ease, opacity 1s ease";
    heart2.style.transition = "transform 1s ease, opacity 1s ease";

    // Ordem importa: fundo, corações, imagem, texto
    section.appendChild(heart1);
    section.appendChild(heart2);
    section.appendChild(img);
    section.appendChild(p);

    // Adicionando as decorações de corações
    for (let j = 0; j < 5; j++) {
      const heartDecoration = document.createElement("div");
      heartDecoration.className = "heart-decoration";

      const heartImage = document.createElement("img");
      heartImage.src = "images/heart1.png"; // Substitua com o caminho do coração pequeno

      heartDecoration.appendChild(heartImage);
      section.appendChild(heartDecoration);
    }

    presentation.appendChild(section);
  });

  // Seção final especial
  const finalSection = document.createElement("section");
  finalSection.className = "final";
  finalSection.style.backgroundColor = "#ffdde4";

  const finalBgDiv = document.createElement("div");
  finalBgDiv.className = "background-img";
  finalBgDiv.style.backgroundImage = "url(images/favorite.jpg)";
  finalSection.appendChild(finalBgDiv);

  const finalImg = document.createElement("img");
  finalImg.src = "images/favorite.jpg";
  finalImg.className = "final-img";

  const finalMsg = document.createElement("p");
  finalMsg.textContent = "Essa é a nossa foto preferida... Obrigado por tudo. Te amo! ❤️";

  finalSection.appendChild(finalImg);
  finalSection.appendChild(finalMsg);
  presentation.appendChild(finalSection);

  observeSections();

  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mainAudio.pause();
        finalAudio.play();
      }
    });
  }, { threshold: 0.6 });

  finalObserver.observe(finalSection);
}


function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const section = entry.target;
      const ratio = entry.intersectionRatio;

      // Seção visível (mais de 30% visível)
      if (ratio > 0.3) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }

      // Selecionando os corações na seção
      const hearts = section.querySelectorAll(".heart");
      if (hearts.length >= 2) {
        const heart1 = hearts[0];
        const heart2 = hearts[1];

        // Quando a seção estiver visível, anima os corações
        if (ratio > 0.3 && ratio < 0.75) {
          heart1.style.opacity = 1;
          heart2.style.opacity = 1;
        } else {
          heart1.style.opacity = 0;
          heart2.style.opacity = 0;
        }

        // Movimento dos corações
        heart1.style.transform = `translateX(${ratio * 120}px)`;  // Entrando da esquerda
        heart2.style.transform = `translateX(${ratio * -120}px)`; // Entrando da direita
      }
    });
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100)  // Melhor sensibilidade para o Observer
  });

  // Observando cada seção
  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });
}


// Inicializando a observação
observeSections();

function getBackgroundColor(index) {
  const colors = [
    "#fff0f5", "#ffe4e1", "#fce4ec", "#f8bbd0",
    "#f3e5f5", "#e1bee7", "#e0f7fa", "#b2ebf2",
    "#dcedc8", "#c8e6c9", "#ffecb3", "#ffe0b2"
  ];
  return colors[index % colors.length];
}

function spawnHearts(container) {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100 + 20}%`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100 + 20}%`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 500);
}


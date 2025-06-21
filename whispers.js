// ===== CONFIGURATION =====
const config = {
  artPieces: [
    {
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      year: "1665",
      quote: "A painting requires a little mystery, some vagueness, some fantasy.",
      description: "Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer. It depicts a European girl wearing an exotic dress, an oriental turban, and an improbably large pearl earring. The work has been in the collection of the Mauritshuis in The Hague since 1902.",
      image: "images/Girl with Pearl Earring.jpg",
      credits: "Mauritshuis, Public Domain",
      context: "The painting is a tronie, the Dutch 17th-century description of a 'head' that was not meant to be a portrait. It is one of Vermeer's most famous works, yet nothing is known about the girl or how the painting came to be. This mystery has inspired novels and films."
    },
    {
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: "1503–1506",
      quote: "Art is never finished, only abandoned.",
      description: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as 'the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world'.",
      image: "images/Mona Lisa.jpg",
      credits: "Louvre Museum, Public Domain",
      context: "The painting's novel qualities include the subject's enigmatic expression, the monumentality of the composition, the subtle modeling of forms, and the atmospheric illusionism. The Mona Lisa's mysterious smile has inspired many writers, singers, and painters."
    },
    {
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: "1889",
      quote: "I am seeking, I am striving, I am in it with all my heart.",
      description: "The Starry Night is an oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village.",
      image: "images/Starry Night.jpg",
      credits: "MoMA, Public Domain",
      context: "Van Gogh painted The Starry Night during a difficult period in his life when he was voluntarily institutionalized at the Saint-Paul-de-Mausole asylum. Despite his mental illness, he produced some of his most celebrated works during this time, including Irises and his self-portraits."
    },
    {
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      quote: "Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision.",
      description: "The Persistence of Memory is a 1931 painting by artist Salvador Dalí, and is one of his most recognizable works. The painting depicts a dreamworld in which common objects are deformed and displayed in a bizarre and irrational way.",
      image: "images/Memory.jpg",
      credits: "MoMA, Fair Use",
      context: "This iconic painting introduces the image of the soft melting pocket watch. It epitomizes Dalí's theory of 'softness' and 'hardness', which was central to his thinking at the time."
    }
  ],
  goldColors: [
    "#c9b037", "#d4bc4d", "#e0c963", "#ebd579", 
    "#f5e8b0", "#f8eec7", "#fbf4de", "#fdf9f5"
  ],
  particleCount: 300,
  maxParticleSize: 5,
  musicFile: "audio/can dance.mp3"
};

// ===== GLOBAL VARIABLES =====
let currentArtIndex = 0;
let isMusicPlaying = false;
let particles = [];
let mouseX = 0;
let mouseY = 0;

// ===== DOM ELEMENTS =====
const elements = {
  preloader: document.querySelector('.preloader'),
  content: document.getElementById('whispers-content'),
  titleChars: document.querySelectorAll('.title-char'),
  gallery: document.querySelector('.art-gallery'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  currentArtDisplay: document.getElementById('current-art'),
  totalArtsDisplay: document.getElementById('total-arts'),
  musicToggle: document.getElementById('music-toggle'),
  bgMusic: document.getElementById('bg-music'),
  visualizer: document.getElementById('music-visualizer'),
  artModal: document.querySelector('.art-modal'),
  modalImage: document.querySelector('.modal-image'),
  modalTitle: document.querySelector('.modal-title'),
  modalArtist: document.querySelector('.modal-artist'),
  modalYear: document.querySelector('.modal-year'),
  modalQuote: document.querySelector('.modal-quote'),
  modalDescription: document.querySelector('.modal-description'),
  modalContext: document.querySelector('.historical-context'),
  modalCredits: document.querySelector('.image-credits'),
  closeModal: document.querySelector('.close-modal'),
  cursor: document.querySelector('.custom-cursor'),
  cursorTrail: document.querySelector('.cursor-trail'),
  galleryProgress: document.querySelector('.gallery-progress'),
  trackInfo: document.querySelector('.track-info'),
  trackTitle: document.querySelector('.track-title'),
  trackTime: document.querySelector('.track-time'),
  prevArtBtn: document.querySelector('.prev-art'),
  nextArtBtn: document.querySelector('.next-art'),
  parallaxWrapper: document.querySelector('.parallax-wrapper')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCanvas();
  initGallery();
  initMusicPlayer();
  initModal();
  initCursor();
  initTitleAnimation();
  initNavigation();
  initWindowEvents();
  initParallax();
});

// ===== PRELOADER =====
function initPreloader() {
  setTimeout(() => {
    elements.preloader.classList.add('loaded');
    document.documentElement.classList.remove('no-js');
    elements.content.classList.remove('hidden');
  }, 3000);
}

// ===== CANVAS EFFECTS =====
function initCanvas() {
  const canvas = document.getElementById('ink-canvas');
  const ctx = canvas.getContext('2d');
  
  resizeCanvas();
  particles = createParticles(config.particleCount);
  animateCanvas(particles);
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    for (let i = 0; i < 5; i++) {
      particles.push({
        x: mouseX + (Math.random() * 60 - 30),
        y: mouseY + (Math.random() * 60 - 30),
        size: Math.random() * config.maxParticleSize + 1,
        speed: Math.random() * 3 + 0.5,
        color: config.goldColors[Math.floor(Math.random() * config.goldColors.length)],
        life: 100
      });
    }
    
    if (particles.length > 800) {
      particles = particles.slice(200);
    }
  });
}

function resizeCanvas() {
  const canvas = document.getElementById('ink-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * config.maxParticleSize + 1,
    speed: Math.random() * 2 + 0.5,
    color: config.goldColors[Math.floor(Math.random() * config.goldColors.length)],
    life: 100
  }));
}

function animateCanvas(particles) {
  const canvas = document.getElementById('ink-canvas');
  const ctx = canvas.getContext('2d');
  
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
      p.y += p.speed;
      p.life -= 0.5;
      p.x += Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.3;
      
      if (p.y > canvas.height || p.life <= 0) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
        p.life = 100;
      }
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.6 * (p.life / 100);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    requestAnimationFrame(frame);
  }
  
  frame();
}

// ===== GALLERY =====
function initGallery() {
  elements.totalArtsDisplay.textContent = config.artPieces.length;
  updateCurrentArtDisplay();
  
  config.artPieces.forEach((art, index) => {
    const artPiece = document.createElement('div');
    artPiece.className = 'art-piece';
    artPiece.dataset.index = index;
    
    artPiece.innerHTML = `
      <img src="${art.image}" alt="${art.title} by ${art.artist}" loading="lazy">
      <div class="art-overlay">
        <h3>${art.title}</h3>
        <p class="artist">${art.artist} (${art.year})</p>
        <p class="quote">"${art.quote}"</p>
        <button class="view-details">View Details</button>
      </div>
    `;

    artPiece.style.animationDelay = `${index * 0.2 + 0.5}s`;
    elements.gallery.appendChild(artPiece);
  });

  setTimeout(() => {
    document.querySelectorAll('.art-piece').forEach(piece => {
      piece.classList.add('loaded');
    });
  }, 500);
}

function updateCurrentArtDisplay() {
  elements.currentArtDisplay.textContent = currentArtIndex + 1;
  const progress = ((currentArtIndex + 1) / config.artPieces.length) * 100;
  elements.galleryProgress.style.width = `${progress}%`;
}

// ===== MUSIC PLAYER =====
function initMusicPlayer() {
  elements.bgMusic.src = config.musicFile;
  
  for (let i = 0; i < 12; i++) {
    const bar = document.createElement('div');
    bar.className = 'visualizer-bar';
    bar.style.animationDelay = `${i * 0.05}s`;
    elements.visualizer.appendChild(bar);
  }

  const handleFirstInteraction = () => {
    elements.bgMusic.volume = 0.3;
    elements.bgMusic.play()
      .then(() => {
        animateVisualizer();
        updateTrackTime();
        document.body.removeEventListener('click', handleFirstInteraction);
      })
      .catch(e => console.log("Auto-play prevented:", e));
  };
  
  document.body.addEventListener('click', handleFirstInteraction, { once: true });

  elements.musicToggle.addEventListener('click', () => {
    if (elements.bgMusic.paused) {
      elements.bgMusic.play();
      elements.musicToggle.classList.add('playing');
      elements.musicToggle.innerHTML = '<i class="fas fa-music"></i><div class="music-wave"></div>';
    } else {
      elements.bgMusic.pause();
      elements.musicToggle.classList.remove('playing');
      elements.musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="mute-strike"></span>';
    }
    
    elements.musicToggle.classList.add('pulse');
    setTimeout(() => elements.musicToggle.classList.remove('pulse'), 300);
  });

  elements.bgMusic.addEventListener('timeupdate', updateTrackTime);
}

function animateVisualizer() {
  const bars = document.querySelectorAll('.visualizer-bar');
  bars.forEach((bar, i) => {
    setInterval(() => {
      if (!elements.bgMusic.paused) {
        const height = Math.random() * 40 + 5;
        bar.style.height = `${height}px`;
        bar.style.opacity = 0.5 + (Math.random() * 0.5);
        bar.style.transform = `scaleY(${1 + Math.random() * 0.3})`;
      }
    }, 80 + (i * 30));
  });
}

function updateTrackTime() {
  const current = formatTime(elements.bgMusic.currentTime);
  const duration = formatTime(elements.bgMusic.duration || 222);
  elements.trackTime.textContent = `${current} / ${duration}`;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ===== MODAL =====
function initModal() {
  document.querySelectorAll('.art-piece').forEach(piece => {
    piece.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-details')) {
        const index = piece.dataset.index;
        showArtDetails(index);
      }
    });
  });

  elements.closeModal.addEventListener('click', closeModal);
  elements.artModal.addEventListener('click', (e) => {
    if (e.target === elements.artModal) {
      closeModal();
    }
  });

  elements.prevArtBtn.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex - 1 + config.artPieces.length) % config.artPieces.length;
    showArtDetails(currentArtIndex);
    updateCurrentArtDisplay();
  });

  elements.nextArtBtn.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex + 1) % config.artPieces.length;
    showArtDetails(currentArtIndex);
    updateCurrentArtDisplay();
  });
}

function showArtDetails(index) {
  const art = config.artPieces[index];
  
  elements.modalImage.src = art.image;
  elements.modalImage.alt = `${art.title} by ${art.artist}`;
  elements.modalTitle.textContent = art.title;
  elements.modalArtist.textContent = art.artist;
  elements.modalYear.textContent = art.year;
  elements.modalQuote.textContent = art.quote;
  elements.modalDescription.textContent = art.description;
  elements.modalContext.innerHTML = `<h3>Historical Context</h3><p>${art.context}</p>`;
  elements.modalCredits.textContent = art.credits;
  
  elements.artModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  currentArtIndex = parseInt(index);
}

function closeModal() {
  elements.artModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== CURSOR EFFECTS =====
function initCursor() {
  document.addEventListener('mousemove', (e) => {
    elements.cursor.style.left = `${e.clientX}px`;
    elements.cursor.style.top = `${e.clientY}px`;
    
    setTimeout(() => {
      elements.cursorTrail.style.left = `${e.clientX}px`;
      elements.cursorTrail.style.top = `${e.clientY}px`;
    }, 100);
  });

  document.querySelectorAll('a, button, .art-piece').forEach(el => {
    el.addEventListener('mouseenter', () => {
      elements.cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      elements.cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      elements.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      elements.cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.3)';
    });
  });
}

// ===== TITLE ANIMATION =====
function initTitleAnimation() {
  elements.titleChars.forEach((char, index) => {
    char.style.animationDelay = `${index * 0.1 + 0.5}s`;
    char.addEventListener('mouseover', () => {
      char.style.transform = 'translateY(-10px) rotateY(20deg)';
      char.style.textShadow = '0 0 15px rgba(201, 176, 55, 0.7)';
    });
    char.addEventListener('mouseout', () => {
      char.style.transform = '';
      char.style.textShadow = '';
    });
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  if (elements.parallaxWrapper) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      elements.parallaxWrapper.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  }
}

// ===== NAVIGATION =====
function initNavigation() {
  elements.prevBtn.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex - 1 + config.artPieces.length) % config.artPieces.length;
    updateCurrentArtDisplay();
    scrollToCurrentArt();
  });

  elements.nextBtn.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex + 1) % config.artPieces.length;
    updateCurrentArtDisplay();
    scrollToCurrentArt();
  });
}

function scrollToCurrentArt() {
  const artPieces = document.querySelectorAll('.art-piece');
  if (artPieces[currentArtIndex]) {
    artPieces[currentArtIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

// ===== WINDOW EVENTS =====
function initWindowEvents() {
  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      elements.prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      elements.nextBtn.click();
    } else if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === ' ') {
      elements.musicToggle.click();
    }
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}
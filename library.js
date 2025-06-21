// ===== BOOK DATABASE =====
const bookDatabase = {
  "The Lost City": {
    author: "By John Doe",
    description: "A thrilling journey through forgotten civilizations.",
    content: `
      <div class="book-content">
        <h3>Chapter 1: The Discovery</h3>
        <p>When archaeologist Emma Wilson uncovered the first artifacts in the remote Andes mountains, 
        she knew she had found something extraordinary. The carvings matched no known ancient script, 
        yet they pulsed with an energy that defied explanation.</p>
        
        <h3>Chapter 2: The Gate</h3>
        <p>Deep within the ruins, the team discovered a circular platform with markings that seemed to 
        depict celestial alignments. When the moonlight hit the center stone at precisely the right angle, 
        the air above the platform shimmered like heat waves in the desert.</p>
      </div>
    `,
    category: "ancient"
  },
  "Whispers of the Past": {
    author: "By Jane Smith",
    description: "Dive into the tales of ancient wisdom and knowledge.",
    content: `
      <div class="book-content">
        <h3>Introduction: Voices Through Time</h3>
        <p>Every culture leaves behind more than artifacts - they leave echoes of their 
        thoughts, dreams, and wisdom. These whispers from our ancestors carry lessons we've 
        forgotten but desperately need to remember.</p>
        
        <h3>The Library of Alexandria</h3>
        <p>What was truly lost when the great library burned? Not just scrolls and texts, 
        but the collective memory of civilizations that understood the cosmos in ways we're 
        only beginning to rediscover.</p>
      </div>
    `,
    category: "ancient"
  },
  "The Atlantean Codex": {
    author: "By Robert Lang",
    description: "Deciphering the lost technology of Atlantis.",
    content: `
      <div class="book-content">
        <h3>Prologue: The Discovery</h3>
        <p>The strange metallic plates were found by deep-sea explorers near the Azores. 
        Their surface was covered in geometric patterns that changed when viewed from different angles, 
        suggesting some form of optical computing beyond our current technology.</p>
        
        <h3>Energy Systems</h3>
        <p>The codex describes crystalline power sources that could harness Earth's natural 
        energy fields. Modern attempts to recreate these devices have yielded surprising results, 
        including temporary anti-gravity effects.</p>
      </div>
    `,
    category: "ancient"
  },
  "Future Echoes": {
    author: "By Emily Green",
    description: "A speculative journey into the possibilities of the future.",
    content: `
      <div class="book-content">
        <h3>Preface: The Many Tomorrows</h3>
        <p>Future is not a single path but a spectrum of possibilities. These narratives 
        explore the most compelling scenarios our civilization might face in the coming centuries.</p>
        
        <h3>The Singularity Event</h3>
        <p>When artificial intelligence surpasses human cognition, will it see us as ancestors 
        to be revered, children to be guided, or obstacles to be removed? The answer may depend 
        on how we design their foundational ethics today.</p>
      </div>
    `,
    category: "future"
  },
  "Quantum Horizons": {
    author: "By Dr. Alan Quantum",
    description: "Exploring the multiverse theory through ancient texts.",
    content: `
      <div class="book-content">
        <h3>Introduction: The Ancient Quantum</h3>
        <p>Several ancient texts describe reality in terms that eerily resemble modern quantum theory. 
        The Vedas speak of infinite parallel worlds, while Egyptian hieroglyphs depict what could be 
        interpreted as quantum entanglement.</p>
        
        <h3>Time as a Dimension</h3>
        <p>The Mayan calendar may not have ended in 2012 - rather, it may have marked our transition 
        to perceiving time as a navigable dimension rather than a linear progression.</p>
      </div>
    `,
    category: "future"
  },
  "Neo-Civilization": {
    author: "By Mia Zhang",
    description: "How future societies might rebuild after collapse.",
    content: `
      <div class="book-content">
        <h3>The Great Reset</h3>
        <p>Civilizations rise and fall in cycles. The survivors of our collapse will have 
        the unique advantage of historical knowledge - if they choose to learn from it.</p>
        
        <h3>Technology Renaissance</h3>
        <p>Without our current infrastructure, future societies may blend ancient techniques 
        with salvaged high-tech, creating hybrid solutions we can scarcely imagine today.</p>
      </div>
    `,
    category: "future"
  },
  "The Alchemist's Diary": {
    author: "Attributed to Hermes",
    description: "Lost formulas for transformation and transcendence.",
    content: `
      <div class="book-content">
        <h3>On the Emerald Tablet</h3>
        <p>"As above, so below" - this fundamental axiom reveals that the patterns of the cosmos 
        repeat at every scale, from galaxies to atoms to human consciousness.</p>
        
        <h3>The Philosopher's Stone</h3>
        <p>The legendary substance was never meant to turn lead into gold in the physical sense. 
        Its true purpose was the transformation of human awareness into its highest potential.</p>
      </div>
    `,
    category: "ancient"
  },
  "Celestial Harmonies": {
    author: "By Johannes Kepler",
    description: "The musical structure of the cosmos.",
    content: `
      <div class="book-content">
        <h3>The Music of the Spheres</h3>
        <p>Kepler's discovery that planetary orbits follow precise mathematical ratios 
        revealed that the universe operates according to harmonic principles we can perceive as music.</p>
        
        <h3>Modern Resonances</h3>
        <p>Contemporary physics finds these same ratios in quantum vibrations, suggesting 
        that reality may indeed be a form of cosmic symphony.</p>
      </div>
    `,
    category: "ancient"
  }
};


// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(function() {
      document.querySelector('.loading-screen').style.display = 'none';
    }, 1000);
  }, 2000);
  
  // Create starfield
  createStarfield();
});

function createStarfield() {
  const starfield = document.getElementById('starfield');
  const starCount = 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random properties
    const size = Math.random() * 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 5 + Math.random() * 10;
    const opacity = 0.2 + Math.random() * 0.8;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--opacity', opacity);
    
    starfield.appendChild(star);
  }
}

// ===== BOOK CLICK HANDLER =====
document.querySelectorAll('.book').forEach(book => {
  book.addEventListener('click', function() {
    const title = this.getAttribute('data-title');
    openBookModal(title);
  });
});

function openBookModal(title) {
  const bookData = bookDatabase[title] || {
    content: `<p>This ancient tome's contents are currently unreadable...</p>`,
    author: "Author Unknown"
  };
  
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-author').textContent = bookData.author;
  document.getElementById('modal-content').innerHTML = bookData.content;
  
  const modal = document.getElementById('book-modal');
  modal.classList.add('active');
  
  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Close button
  document.querySelector('.close-modal').addEventListener('click', function() {
    modal.classList.remove('active');
  });
}

// ===== SEARCH FUNCTIONALITY =====
document.getElementById('book-search').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const books = document.querySelectorAll('.book');
  
  books.forEach(book => {
    const title = book.getAttribute('data-title').toLowerCase();
    if (title.includes(searchTerm)) {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
});


// ===== PARTICLE EFFECTS =====
// Add canvas element
const canvas = document.createElement('canvas');
canvas.className = 'particle-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Particle configuration
const particleConfig = {
  count: 200,
  maxSize: 4,
  colors: ['#C9B037', '#D4BC4D', '#E0C963', '#EBD579', '#F5E8B0'],
  speed: 0.5
};

let particles = [];
let mouseX = 0;
let mouseY = 0;

// Initialize particles
function initParticles() {
  particles = [];
  for (let i = 0; i < particleConfig.count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * particleConfig.maxSize + 1,
      speed: Math.random() * particleConfig.speed + 0.2,
      color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
      life: 100
    });
  }
}

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Animation loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Create new particles near mouse
  if (Math.random() > 0.7) {
    particles.push({
      x: mouseX + (Math.random() * 40 - 20),
      y: mouseY + (Math.random() * 40 - 20),
      size: Math.random() * particleConfig.maxSize + 1,
      speed: Math.random() * particleConfig.speed + 0.2,
      color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
      life: 100
    });
  }
  
  // Update and draw particles
  particles.forEach((p, i) => {
    p.y += p.speed;
    p.x += Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.5;
    p.life -= 0.3;
    
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
    
    // Glow effect
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
  
  // Limit particles
  if (particles.length > 300) {
    particles = particles.slice(100);
  }
  
  requestAnimationFrame(animateParticles);
}

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Initialize and start animation
window.addEventListener('load', () => {
  resizeCanvas();
  initParticles();
  animateParticles();
});

window.addEventListener('resize', () => {
  resizeCanvas();
});


// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all effects after DOM is fully loaded
  initCustomCursor();
  initParticleEffects();
  initMusicPlayer();
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  // Create cursor elements only if they don't exist
  if (!document.querySelector('.custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
  }

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  // Mouse move handler
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
    
    // Delayed trail
    setTimeout(() => {
      const trail = document.querySelector('.cursor-trail');
      if (trail) {
        trail.style.left = `${mouseX}px`;
        trail.style.top = `${mouseY}px`;
      }
    }, 100);
  }

  // Interactive element effects
  function setupInteractiveElements() {
    const interactiveElements = document.querySelectorAll(
      '.book, .modal-content, #music-toggle, .back-home'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          cursor.style.transform = 'translate(-50%, -50%) scale(2)';
          cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.5)';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.3)';
        }
      });
    });
  }

  // Set up event listeners
  document.addEventListener('mousemove', handleMouseMove);
  setupInteractiveElements();
}

// ===== PARTICLE EFFECTS =====
function initParticleEffects() {
  // Create canvas if it doesn't exist
  if (!document.querySelector('.particle-canvas')) {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    document.body.appendChild(canvas);
  }

  const canvas = document.querySelector('.particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Particle configuration
  const particleConfig = {
    count: 150, // Reduced for better performance
    maxSize: 4,
    colors: ['#C9B037', '#D4BC4D', '#E0C963', '#EBD579', '#F5E8B0'],
    speed: 0.5
  };

  // Initialize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create particles
  function createParticles() {
    particles = [];
    for (let i = 0; i < particleConfig.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleConfig.maxSize + 1,
        speed: Math.random() * particleConfig.speed + 0.2,
        color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
        life: 100
      });
    }
  }

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create new particles near mouse
    if (particles.length < particleConfig.count && Math.random() > 0.7) {
      particles.push({
        x: mouseX + (Math.random() * 40 - 20),
        y: mouseY + (Math.random() * 40 - 20),
        size: Math.random() * particleConfig.maxSize + 1,
        speed: Math.random() * particleConfig.speed + 0.2,
        color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
        life: 100
      });
    }
    
    // Update and draw particles
    particles.forEach((p, i) => {
      p.y += p.speed;
      p.x += Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.5;
      p.life -= 0.3;
      
      if (p.y > canvas.height || p.life <= 0) {
        particles.splice(i, 1); // Remove dead particles
      } else {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6 * (p.life / 100);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
    
    requestAnimationFrame(animateParticles);
  }

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Initialize
  resizeCanvas();
  createParticles();
  animateParticles();
  window.addEventListener('resize', resizeCanvas);
}

// ===== MUSIC PLAYER =====
function initMusicPlayer() {
  const bgMusic = new Audio('we are free.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;

  // Create visualizer if it doesn't exist
  if (!document.getElementById('music-visualizer')) {
    const visualizer = document.createElement('div');
    visualizer.id = 'music-visualizer';
    document.body.appendChild(visualizer);

    for (let i = 0; i < 12; i++) {
      const bar = document.createElement('div');
      bar.className = 'visualizer-bar';
      bar.style.animationDelay = `${i * 0.05}s`;
      visualizer.appendChild(bar);
    }
  }

  // Music toggle functionality
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', function() {
      if (bgMusic.paused) {
        bgMusic.play()
          .then(() => {
            this.classList.add('playing');
            this.classList.remove('muted');
            animateVisualizer();
          })
          .catch(e => console.error("Audio playback failed:", e));
      } else {
        bgMusic.pause();
        this.classList.remove('playing');
        this.classList.add('muted');
      }
      
      this.classList.add('pulse');
      setTimeout(() => this.classList.remove('pulse'), 300);
    });
  }

  // Visualizer animation
  function animateVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    bars.forEach((bar, i) => {
      const interval = setInterval(() => {
        if (!bgMusic.paused) {
          const height = Math.random() * 30 + 5;
          bar.style.height = `${height}px`;
          bar.style.opacity = 0.5 + (Math.random() * 0.5);
        } else {
          clearInterval(interval);
        }
      }, 80 + (i * 30));
    });
  }

  // Auto-play with user interaction
  function handleFirstInteraction() {
    bgMusic.play()
      .then(() => {
        const toggle = document.getElementById('music-toggle');
        if (toggle) toggle.classList.add('playing');
        animateVisualizer();
        document.body.removeEventListener('click', handleFirstInteraction);
      })
      .catch(e => console.error("Auto-play prevented:", e));
  }

  document.body.addEventListener('click', handleFirstInteraction, { once: true });
}
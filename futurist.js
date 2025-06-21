document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen Effect
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingText = document.querySelector('.loading-text');
  const backHomeButton = document.querySelector('.back-home');
  
  // Initially hide the back button
  backHomeButton.style.opacity = '0';
  
  // ===== NEW: Button Particle Effect =====
  function createButtonParticle() {
    const particle = document.createElement('div');
    particle.className = 'button-particle';
    particle.style.left = `${Math.random() * 100}%`;
    backHomeButton.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  backHomeButton.addEventListener('mouseenter', () => {
    // Create 5 golden particles on hover
    for (let i = 0; i < 5; i++) {
      createButtonParticle();
    }
  });
  // ===== END NEW =====

  // Simulate loading with a timeout
  function simulateLoading() {
    // Show loading text with delay
    setTimeout(() => {
      loadingText.style.opacity = '1';
    }, 500);

    // Hide loading screen after everything is loaded
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        // Show back button after loading completes
        backHomeButton.style.opacity = '1';
        
        // ===== NEW: Initial particle burst =====
        for (let i = 0; i < 8; i++) {
          setTimeout(() => createButtonParticle(), i * 100);
        }
        // ===== END NEW =====
      }, 1000);
    }, 1500);
  }

  // Start loading simulation
  simulateLoading();

  // Era filtering
  const eraButtons = document.querySelectorAll('.era-btn');
  const futuristCards = document.querySelectorAll('.futurist-card');
  
  eraButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      eraButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter cards
      const era = button.dataset.era;
      futuristCards.forEach(card => {
        card.style.display = card.dataset.era === era ? 'block' : 'none';
      });
      
      // Update terminal
      updateTerminal(era);
    });
  });
  
  // Card hover effects
  futuristCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const hologram = card.querySelector('.hologram-effect');
      hologram.style.background = `linear-gradient(135deg, 
        rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1}), 
        transparent)`;
    });
    
    // Explore button interaction
    const exploreBtn = card.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showConceptDetails(card);
    });
  });
  
  // Terminal functions
  function updateTerminal(era) {
    const terminal = document.querySelector('.terminal-body');
    terminal.innerHTML = `
      <p>> Loading ${getEraName(era)} concepts...</p>
      <p>> Database filter applied</p>
      <p>> ${Math.floor(Math.random() * 12) + 4} art movements found</p>
    `;
  }
  
  function getEraName(era) {
    const eraNames = {
      '2025': 'Near Future (2025-2030)',
      '2035': 'Mid Future (2035-2040)',
      '2045': 'Far Future (2045+)'
    };
    return eraNames[era] || 'All Eras';
  }
  
  function showConceptDetails(card) {
    const title = card.querySelector('h3').textContent;
    const date = card.querySelector('.date').textContent;
    const desc = card.querySelector('.description').textContent;
    
    const terminal = document.querySelector('.terminal-body');
    terminal.innerHTML = `
      <p>> ART MOVEMENT ANALYSIS</p>
      <p>> Title: ${title}</p>
      <p>> Era: ${date}</p>
      <p>> Description: ${desc}</p>
      <p>> Loading historical context...</p>
    `;
    
    // Simulate loading more data
    setTimeout(() => {
      terminal.innerHTML += `
        <p>> Related movements: ${Math.floor(Math.random() * 6) + 2}</p>
        <p>> Cultural impact analysis complete</p>
      `;
    }, 1200);
  }
  
  // Initialize terminal
  updateTerminal('2025');

  // Music Player functionality
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  if (bgMusic && musicToggle) {
    let audioContext, analyser;
    let isInitialized = false;

    // Initialize audio system
    const initAudioSystem = () => {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createMediaElementSource(bgMusic);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
        }

        if (audioContext.state === 'suspended') {
          return audioContext.resume().then(() => true);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error("Audio initialization error:", error);
        return Promise.resolve(false);
      }
    };

    // Create visualizer bars
    const createVisualizer = () => {
      const visualizer = document.createElement('div');
      visualizer.className = 'visualizer-bars';

      for (let i = 0; i < 8; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer.appendChild(bar);
      }

      musicToggle.appendChild(visualizer);
      return document.querySelectorAll('.visualizer-bar');
    };

    // Visualizer animation
    const animateVisualizer = () => {
      if (!bgMusic.paused && analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        const bars = document.querySelectorAll('.visualizer-bar');
        if (bars.length === 0) createVisualizer();

        bars.forEach((bar, i) => {
          const value = dataArray[i % dataArray.length] / 255;
          bar.style.height = `${5 + value * 30}px`;
          bar.style.opacity = 0.5 + value * 0.5;
        });
      }
      requestAnimationFrame(animateVisualizer);
    };

    // Start playback
    const startPlayback = () => {
      bgMusic.volume = 0.3;
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
      }).catch(error => {
        console.error("Playback error:", error);
      });
    };

    // Toggle playback
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isInitialized) {
        initAudioSystem().then((success) => {
          if (success) {
            isInitialized = true;
            startPlayback();
          }
        });
        return;
      }

      if (bgMusic.paused) {
        startPlayback();
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
      }
    });

    // Mute/unmute
    musicToggle.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      bgMusic.muted = !bgMusic.muted;
      musicToggle.classList.toggle('muted', bgMusic.muted);
    });

    // Start the visualizer
    animateVisualizer();
  }
});
// Enhanced Typing Animation with Loading Screen
document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen Effect
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingText = document.querySelector('.loading-text');
  
  // Add loading class to body
  document.body.classList.add('loading');

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
        document.body.classList.remove('loading');
        // Show other elements
        document.querySelector('.quote').style.visibility = 'visible';
        document.querySelector('.doors-container').style.visibility = 'visible';
        document.querySelector('.audio-player').style.visibility = 'visible';
        document.querySelector('.site-footer').style.visibility = 'visible';
      }, 1000);
    }, 3000);
  }

  // Start loading simulation
  simulateLoading();

  const quotes = [
    "BEYOND TIME, BEYOND MEMORY,\nTHE CHRONICLES AWAIT.",
    "WHISPERED SECRETS OF \nFORGOTTEN ERAS",
    "FUTURE VISIONS YET TO BE WRITTEN",
    "WHERE PAST AND FUTURE CONVERGE",
    "THE ARCHIVES OF ETERNITY \nAWAIT YOUR GAZE"
  ];

  const typingElement = document.getElementById('typing-text');
  let quoteIndex = 0;
  let isTyping = false;

  function typeWriter(text, i, callback) {
    isTyping = true;
    typingElement.classList.add('typing');

    if (i < text.length) {
      if (text.charAt(i) === '\n') {
        typingElement.innerHTML += '<br>';
      } else {
        typingElement.innerHTML += text.charAt(i);
      }

      // Random speed variation for more natural feel
      const speed = 50 + Math.random() * 30;
      setTimeout(() => typeWriter(text, i + 1, callback), speed);
    } else if (callback) {
      isTyping = false;
      typingElement.classList.remove('typing');
      setTimeout(callback, 2000);
    }
  }

  function eraseText(callback) {
    isTyping = true;
    typingElement.classList.add('typing');

    const currentText = typingElement.innerHTML;
    if (currentText.length > 0) {
      // Don't erase line breaks immediately
      if (currentText.slice(-4) === '<br>') {
        typingElement.innerHTML = currentText.substring(0, currentText.length - 4);
      } else {
        typingElement.innerHTML = currentText.substring(0, currentText.length - 1);
      }

      setTimeout(() => eraseText(callback), 30);
    } else if (callback) {
      isTyping = false;
      typingElement.classList.remove('typing');
      callback();
    }
  }

  function showNextQuote() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    const nextQuote = quotes[quoteIndex];
    typeWriter(nextQuote, 0, () => {
      setTimeout(() => {
        eraseText(showNextQuote);
      }, 2000);
    });
  }

  // Start with first quote (after loading completes)
  setTimeout(() => {
    typeWriter(quotes[0], 0, () => {
      setTimeout(() => {
        eraseText(showNextQuote);
      }, 2000);
    });
  }, 3500); // Adjusted to start after loading screen

  // Enhanced Music Player with robust error handling
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  if (bgMusic && musicToggle) {
    // Audio context variables
    let audioContext, analyser;
    let isInitialized = false;

    // Initialize audio system
    const initAudioSystem = () => {
      try {
        // Create audio context if needed
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createMediaElementSource(bgMusic);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
        }

        // Resume if suspended
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
        musicToggle.classList.remove('needs-interaction');
      }).catch(error => {
        console.error("Playback error:", error);
        musicToggle.classList.add('needs-interaction');
      });
    };

    // First interaction handler
    const handleFirstInteraction = () => {
      initAudioSystem().then((success) => {
        if (success) {
          isInitialized = true;
          startPlayback();
        }
      });
    };

    // Set up initial interaction listeners
    const setupInteractionListeners = () => {
      const interactionTypes = ['click', 'keydown', 'touchstart'];
      interactionTypes.forEach(type => {
        document.addEventListener(type, handleFirstInteraction, {
          once: true,
          passive: true
        });
      });
    };

    // Toggle playback
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();

      if (!isInitialized) {
        handleFirstInteraction();
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

      // Update mute strike visibility
      const muteStrike = musicToggle.querySelector('.mute-strike') ||
        document.createElement('div');
      muteStrike.className = 'mute-strike';
      if (bgMusic.muted && !musicToggle.contains(muteStrike)) {
        musicToggle.appendChild(muteStrike);
      } else if (!bgMusic.muted) {
        const existingStrike = musicToggle.querySelector('.mute-strike');
        if (existingStrike) existingStrike.remove();
      }
    });

    // Volume control
    musicToggle.addEventListener('wheel', (e) => {
      e.preventDefault();
      bgMusic.volume = Math.max(0, Math.min(1,
        bgMusic.volume + (e.deltaY > 0 ? -0.05 : 0.05)
      ));

      // Show visual feedback
      musicToggle.classList.add('volume-changing');
      musicToggle.setAttribute('data-volume', `${Math.round(bgMusic.volume * 100)}%`);
      setTimeout(() => {
        musicToggle.classList.remove('volume-changing');
      }, 500);
    });

    // Start the visualizer
    animateVisualizer();

    // Set up initial listeners
    setupInteractionListeners();
  }
});
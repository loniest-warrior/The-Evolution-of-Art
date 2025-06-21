document.addEventListener('DOMContentLoaded', () => {
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
          // Create a new Audio element to handle CORS
          const audioEl = new Audio(bgMusic.src);
          audioEl.crossOrigin = "anonymous";
          const source = audioContext.createMediaElementSource(audioEl);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          // Replace original audio element
          bgMusic.src = audioEl.src;
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

    // Visualizer animation
    const animateVisualizer = () => {
      if (!bgMusic.paused && analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        
        const bars = document.querySelectorAll('.visualizer-bar');
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

    // First interaction handler
    const handleFirstInteraction = () => {
      initAudioSystem().then((success) => {
        if (success) {
          isInitialized = true;
          startPlayback();
          animateVisualizer();
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
      bgMusic.muted = !bgMusic.muted;
      musicToggle.classList.toggle('muted', bgMusic.muted);
      
      // Create mute strike if it doesn't exist
      if (bgMusic.muted && !musicToggle.querySelector('.mute-strike')) {
        const muteStrike = document.createElement('div');
        muteStrike.className = 'mute-strike';
        muteStrike.textContent = '✖';
        musicToggle.appendChild(muteStrike);
      } else if (!bgMusic.muted) {
        const existingStrike = musicToggle.querySelector('.mute-strike');
        if (existingStrike) existingStrike.remove();
      }
    });

    // Volume control
    musicToggle.addEventListener('wheel', (e) => {
      e.preventDefault();
      const volumeChange = e.deltaY > 0 ? -0.05 : 0.05;
      bgMusic.volume = Math.min(1, Math.max(0, bgMusic.volume + volumeChange));
      
      // Show volume indicator
      musicToggle.setAttribute('data-volume', `${Math.round(bgMusic.volume * 100)}%`);
    });

    // Initialize
    setupInteractionListeners();
  }
});
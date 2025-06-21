// Cosmic Particle System
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cosmic-particles');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
      this.z = Math.random() * 4;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = `hsla(${Math.random() * 60 + 30}, 80%, 60%, ${Math.random() * 0.5 + 0.1})`;
      this.z = Math.random() * 4;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Reset particles that go off screen
      if (this.x < 0 || this.x > canvas.width || 
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
      
      // Interact with cursor
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (100 - distance) / 100;
        
        this.x += forceDirectionX * force * 2;
        this.y += forceDirectionY * force * 2;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * (this.z/4 + 0.5), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 15 * (this.z/4 + 0.5);
      ctx.shadowColor = this.color;
    }
  }
  
  // Mouse position
  const mouse = {
    x: null,
    y: null
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // Create particles
  const particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connection lines between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(45, 80%, 60%, ${1 - distance/100})`;
          ctx.lineWidth = 0.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

// Custom Cursor System
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const cursorTrail = document.querySelector('.cursor-trail');
  const links = document.querySelectorAll('a, button');
  
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;
  let scale = 1;
  
  // Mouse move listener
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position immediately
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${scale})`;
    
    // Create particles along trail
    if (Math.random() > 0.7) {
      createCursorParticle(mouseX, mouseY);
    }
  });
  
  // Animation loop for smooth trail
  const animateCursor = () => {
    // Ease the trail toward the cursor
    trailX += (mouseX - trailX) * 0.2;
    trailY += (mouseY - trailY) * 0.2;
    
    cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
  
  // Create cursor particles
  function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle-trail';
    document.body.appendChild(particle);
    
    // Random size and color
    const size = Math.random() * 6 + 2;
    const hue = 40 + Math.random() * 20; // Golden hues
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsla(${hue}, 80%, 60%, 0.7)`;
    particle.style.boxShadow = `0 0 ${size*2}px hsla(${hue}, 80%, 60%, 0.5)`;
    
    // Position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random movement
    const angle = Math.random() * Math.PI * 2;
    const velocity = 1 + Math.random() * 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    // Animation
    let opacity = 1;
    let currentSize = size;
    const fade = () => {
      opacity -= 0.02;
      currentSize *= 0.98;
      
      particle.style.opacity = opacity;
      particle.style.transform = `translate(-50%, -50%) scale(${currentSize/size})`;
      particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
      particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
      
      if (opacity > 0) {
        requestAnimationFrame(fade);
      } else {
        particle.remove();
      }
    };
    
    // Start with full opacity
    particle.style.opacity = 1;
    requestAnimationFrame(fade);
  }
  
  // Hover effects
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      scale = 1.8;
      cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.5)';
      cursor.style.border = '1px solid rgba(201, 176, 55, 0.8)';
      
      // Add more particles on hover
      for (let i = 0; i < 5; i++) {
        createCursorParticle(mouseX, mouseY);
      }
    });
    
    link.addEventListener('mouseleave', () => {
      scale = 1;
      cursor.style.backgroundColor = 'rgba(201, 176, 55, 0.3)';
      cursor.style.border = 'none';
    });
  });
});
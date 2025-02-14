function createBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  // Random size between 20px and 50px
  const size = Math.random() * 30 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Random starting position
  const startPos = Math.random() * 500;
  bubble.style.right = `${startPos}px`;
  
  // Random horizontal drift
  const drift = (Math.random() - 0.5) * 300;
  bubble.style.setProperty('--drift', `${drift}px`);
  
  // Duration between 2 and 4 seconds
  const duration = Math.random() * 2 + 2;
  bubble.style.setProperty('--duration', `${duration}s`);
  
  const container = document.getElementById('bubbleContainer');
  container.appendChild(bubble);
  
  setTimeout(() => {
    bubble.remove();
  }, duration * 1000);
}

// Create new bubbles
setInterval(createBubble, 100);

// Initial bubbles
for(let i = 0; i < 15; i++) {
  setTimeout(createBubble, Math.random() * 2000);
}


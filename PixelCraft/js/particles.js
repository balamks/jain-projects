// Particle System for PixelCraft
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.maxParticles = 100;
    this.colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    this.resize();
    this.init();
    this.animate();

    // Event listeners
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => this.updateMouse(e));
    window.addEventListener("mouseout", () => (this.mouse.x = null));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(new Particle(this.canvas, this.colors));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });

    // Draw connections
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 120})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.colors = colors;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.originalSpeedX = this.speedX;
    this.originalSpeedY = this.speedY;
  }

  update(mouse) {
    // Move particle
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }

    // Mouse interaction
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = dx / distance;
        const directionY = dy / distance;

        this.speedX += directionX * force * 0.01;
        this.speedY += directionY * force * 0.01;

        // Dampen speed
        this.speedX *= 0.99;
        this.speedY *= 0.99;
      } else {
        // Return to original speed
        this.speedX += (this.originalSpeedX - this.speedX) * 0.01;
        this.speedY += (this.originalSpeedY - this.speedY) * 0.01;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particle-canvas");
  if (canvas) {
    new ParticleSystem(canvas);
  }
});

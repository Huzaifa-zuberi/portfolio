/* Theme toggle */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
  icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  toggle.setAttribute("aria-pressed", String(theme === "light"));
}

setTheme(localStorage.getItem("theme") || "dark");

toggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

/* Decorative canvas: low-motion network lines, paused when hidden or reduced-motion is enabled. */
const heroCanvas = document.getElementById("heroCanvas");

if (heroCanvas) {
  const context = heroCanvas.getContext("2d");

  if (context) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let canvasWidth = 0;
    let canvasHeight = 0;
    let particles = [];
    let animationFrame = 0;
    let lastFrame = 0;

    function drawNetwork(moveParticles) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        if (moveParticles) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0) particle.x = canvasWidth;
          if (particle.x > canvasWidth) particle.x = 0;
          if (particle.y < 0) particle.y = canvasHeight;
          if (particle.y > canvasHeight) particle.y = 0;
        }
      });

      for (let first = 0; first < particles.length; first += 1) {
        const point = particles[first];
        for (let second = first + 1; second < particles.length; second += 1) {
          const other = particles[second];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          const linkDistance = 132;

          if (distance < linkDistance) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(56, 189, 248, ${(1 - distance / linkDistance) * 0.16})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(125, 211, 252, 0.58)";
        context.fill();
      }
    }

    function resizeCanvas() {
      const bounds = heroCanvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvasWidth = bounds.width;
      canvasHeight = bounds.height;
      heroCanvas.width = Math.round(canvasWidth * pixelRatio);
      heroCanvas.height = Math.round(canvasHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const pointCount = Math.min(54, Math.max(18, Math.round((canvasWidth * canvasHeight) / 24000)));
      particles = Array.from({ length: pointCount }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.1 + 0.7,
      }));

      drawNetwork(false);
    }

    function animate(timestamp) {
      animationFrame = 0;
      if (document.hidden || reducedMotion.matches) return;

      if (timestamp - lastFrame >= 33) {
        drawNetwork(true);
        lastFrame = timestamp;
      }

      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (document.hidden || reducedMotion.matches) {
        drawNetwork(false);
        return;
      }
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    }

    function refreshAnimation() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      startAnimation();
    }

    resizeCanvas();
    startAnimation();
    window.addEventListener("resize", () => {
      resizeCanvas();
      refreshAnimation();
    }, { passive: true });
    document.addEventListener("visibilitychange", refreshAnimation);
    reducedMotion.addEventListener("change", refreshAnimation);
  }
}

const navLinks = document.querySelector(".nav-links");
const menuToggle = document.getElementById("menuToggle");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMenu();
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();

/* Contact form -> mailto (static-friendly) */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    status.textContent = "Please fill in all fields.";
    status.className = "form-status error";
    return;
  }

  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:mhuzaifazuberi@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;

  status.textContent = "Opening your email app to send the message...";
  status.className = "form-status";
});

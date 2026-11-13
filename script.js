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

/* Theme toggle */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
  icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

setTheme(localStorage.getItem("theme") || "dark");

toggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

/* Mobile menu */
let menuToggleCreated = false;
const navLinks = document.querySelector(".nav-links");
const navInner = document.querySelector(".nav-inner");

if (window.innerWidth <= 768 && !menuToggleCreated) {
  const btn = document.createElement("button");
  btn.className = "menu-toggle";
  btn.setAttribute("aria-label", "Menu");
  btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  navInner.appendChild(btn);
  menuToggleCreated = true;
  btn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

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

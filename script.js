
const roles = [
  "AI & Data Science student",
  "Python developer",
  "frontend developer",
  "UI/UX enthusiast"
];

const typed = document.getElementById("typed");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

// Typing animation
function typeLoop() {
  let word = roles[roleIndex];

  typed.textContent = word.substring(0, charIndex);

  if (deleting == false && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 100);
  } 
  else if (deleting == false) {
    deleting = true;
    setTimeout(typeLoop, 1000);
  } 
  else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 50);
  } 
  else {
    deleting = false;
    roleIndex++;

    if (roleIndex >= roles.length) {
      roleIndex = 0;
    }

    setTimeout(typeLoop, 200);
  }
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.textContent = roles[0];
} else {
  typeLoop();
}


// Show elements when scrolling
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
});

document.querySelectorAll(".reveal, .glass").forEach(function(element) {
  observer.observe(element);
});


// Mobile navigation menu
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", function() {
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) {
    toggle.setAttribute("aria-expanded", "true");
  } else {
    toggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".nav-links a").forEach(function(link) {
  link.addEventListener("click", function() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});


// Random fortune messages
const fortunes = [
  "Ship the ugly version. Pretty can wait.",
  "Your next favorite project is hiding in a silly idea.",
  "A navbar is just a hug for your pages.",
  "Leave one easter egg. Future-you will thank you.",
  "If the gradient looks expensive, keep it."
];

const fortuneBtn = document.getElementById("fortune-btn");
const fortune = document.getElementById("fortune");

fortuneBtn.addEventListener("click", function() {
  fortune.style.opacity = "0";

  setTimeout(function() {
    let randomNumber = Math.floor(Math.random() * fortunes.length);

    fortune.textContent = fortunes[randomNumber];
    fortune.style.opacity = "1";
  }, 200);
});


// Custom mouse cursor
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

if (window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-custom-cursor");

  window.addEventListener("pointermove", function(event) {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    cursorDot.style.left = event.clientX + "px";
    cursorDot.style.top = event.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach(function(element) {
    element.addEventListener("mouseenter", function() {
      cursor.classList.add("grow");
    });

    element.addEventListener("mouseleave", function() {
      cursor.classList.remove("grow");
    });
  });
}


// Project card tilt effect
document.querySelectorAll("[data-tilt]").forEach(function(card) {
  card.addEventListener("pointermove", function(event) {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      "rotateY(" + (x * 10) + "deg) rotateX(" + (y * -10) + "deg)";
  });

  card.addEventListener("pointerleave", function() {
    card.style.transform = "";
  });
});

/* ---------------------------
   CARRUSEL (con autoplay)
   --------------------------- */
const carouselImgs = document.querySelectorAll('.carousel-inner img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let autoplayInterval = null;
const AUTOPLAY_MS = 4000; // cambiar cada 4s

function showImage(i) {
  carouselImgs.forEach(img => img.classList.remove('active'));
  carouselImgs[i].classList.add('active');
}

function nextImage() {
  currentIndex = (currentIndex + 1) % carouselImgs.length;
  showImage(currentIndex);
}
function prevImage() {
  currentIndex = (currentIndex - 1 + carouselImgs.length) % carouselImgs.length;
  showImage(currentIndex);
}

nextBtn.addEventListener('click', () => {
  nextImage();
  restartAutoplay();
});
prevBtn.addEventListener('click', () => {
  prevImage();
  restartAutoplay();
});

function startAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = setInterval(nextImage, AUTOPLAY_MS);
}
function restartAutoplay() {
  startAutoplay();
}

/* init */
if (carouselImgs.length > 0) {
  showImage(0);
  startAutoplay();
}

/* ---------------------------
   BOTÓN SORPRESA & CARTA
   --------------------------- */
const surpriseBtn = document.getElementById('surpriseBtn');
const card = document.getElementById('card');
const closeCard = document.getElementById('closeCard');

surpriseBtn.addEventListener('click', () => {
  // mostrar carta
  card.classList.remove('hidden');
  // encender confetti por 4 segundos
  startConfetti(4000);
});

closeCard && closeCard.addEventListener('click', () => {
  card.classList.add('hidden');
});

/* ---------------------------
   CONFETTI (simple y performante)
   --------------------------- */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
let confettis = [];

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

function ConfettiPiece() {
  this.x = Math.random() * W;
  this.y = Math.random() * -H;
  this.size = Math.random() * 8 + 4;
  this.speed = Math.random() * 3 + 1.5;
  this.tilt = Math.random() * 30;
  this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
}
function spawnConfetti(count) {
  for (let i = 0; i < count; i++) confettis.push(new ConfettiPiece());
}
function updateConfetti() {
  ctx.clearRect(0,0,W,H);
  for (let i = confettis.length - 1; i >= 0; i--) {
    const p = confettis[i];
    p.y += p.speed;
    p.x += Math.sin(p.y * 0.01) * 1.5;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tilt * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    ctx.restore();
    if (p.y > H + 40) confettis.splice(i, 1);
  }
  if (confettis.length) requestAnimationFrame(updateConfetti);
}
let confettiTimeout = null;
function startConfetti(durationMs = 3000) {
  // genera una oleada
  spawnConfetti(120);
  updateConfetti();
  if (confettiTimeout) clearTimeout(confettiTimeout);
  confettiTimeout = setTimeout(() => {
    confettis = []; // limpiar
  }, durationMs);
}

/* ---------------------------
   FIN
   --------------------------- */
// ============================
//  CARRUSEL AUTOMÁTICO
// ============================

let currentIndex = 0;
const images = document.querySelectorAll(".carousel-inner img");

function showNext() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
}

// Cambia de imagen cada 4 segundos
setInterval(showNext, 4000);

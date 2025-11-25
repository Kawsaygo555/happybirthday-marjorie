// ============================
//  CARRUSEL AUTOMÁTICO MARJORIE
// ============================

let index = 0;
const images = document.querySelectorAll(".carousel-inner img");

// Mostrar imagen correspondiente
function showImage() {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
}

// Cambio automático cada 4 segundos
function nextImage() {
    index = (index + 1) % images.length;
    showImage();
}

showImage(); // Mostrar la primera imagen
setInterval(nextImage, 4000); // Autoplay

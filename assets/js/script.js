document.addEventListener('DOMContentLoaded', function() {
    const elemento = document.querySelector('.tu-elemento');
    
    if (elemento) { // Solo si existe
        elemento.addEventListener('click', function() {
            // Tu lógica...
     

// Validación de formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");
    const btnEnviar = document.getElementById("btn-enviar");
});

// Contador del carrito (simplificado)
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = localStorage.getItem("cartCount") || 0;
  document.getElementById("cart-count").textContent = cartCount;
});

// Carrusel de imágenes
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carrusel-img");
  const prevBtn = document.querySelector(".carrusel-btn.prev");
  const nextBtn = document.querySelector(".carrusel-btn.next");
  let currentIndex = 0;

  function showImage(index) {
      images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
      });
  }

  prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
  });

  // Auto-avance cada 5 segundos (opcional)
  setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
  }, 5000);
});

// Función compartida para añadir al carrito (si necesitas acceder desde múltiples archivos)
function addToCart(productId, productName, productPrice) {
    // Implementación igual que en carrito.js
    // O mejor aún, organiza tu código en módulos
}
});
}
});
// Base de datos de productos (simulada)
const productos = [
  {
    id: 1,
    nombre: "Jarrón de Cerámica",
    precio: 45.99,
    imagen: "images/jarron.jpg",
    categoria: "ceramica"
  },
  {
    id: 2,
    nombre: "Bufanda de Lana",
    precio: 29.99,
    imagen: "images/bufanda.jpg",
    categoria: "textiles"
  },
  {
    id: 3,
    nombre: "Collar de Semillas",
    precio: 22.50,
    imagen: "images/collar.jpg",
    categoria: "accesorios"
  }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar productos en la página
function cargarProductos() {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const card = `
      <div class="col-md-4">
        <div class="card card-producto">
          <img src="${producto.imagen}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio.toFixed(2)}</p>
            <button class="btn btn-primary btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });

  // Event listeners para botones "Agregar"
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(e) {
  const id = parseInt(e.target.getAttribute('data-id'));
  const producto = productos.find(p => p.id === id);

  // Verificar si ya está en el carrito
  const itemExistente = carrito.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  guardarCarrito();
}

// Actualizar interfaz del carrito
function actualizarCarrito() {
  const contador = document.getElementById('contador-carrito');
  const itemsCarrito = document.getElementById('items-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  // Contador
  contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Items del carrito
  itemsCarrito.innerHTML = '';
  carrito.forEach(item => {
    const fila = `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>${item.cantidad}</td>
        <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
      </tr>
    `;
    itemsCarrito.innerHTML += fila;
  });

  // Total
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Evento para abrir el modal del carrito
document.getElementById('carrito-btn').addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
  modal.show();
});

// Botón "Pagar"
document.getElementById('btn-pagar').addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarCarrito();
});

function renderCatalogo() {
    const contenedor = document.getElementById("catalogo");
    if (!contenedor) return;

    contenedor.innerHTML = productos.map(producto => `
        <div class="producto-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" 
                 style="width: 150px; height: 150px; object-fit: cover;" 
                 onerror="this.src='assets/imagenes/placeholder.jpg'">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toLocaleString("es-CO")}</p>
                <button class="btn-add" onclick="añadirAlCarrito(${producto.id})">
                    Añadir al carrito
                </button>
            </div>
        </div>
    `).join('');
}
// Datos de productos (rutas actualizadas)
const productos = [
    {
        id: 1,
        nombre: "Bolso de Mujer",
        precio: 120000,
        imagen: "img/bolso-de-mujer.png", // Nombre consistente
        categoria: "tejidos"
    },
    {
        id: 2,
        nombre: "bolso tejido",
        precio: 80000,
        imagen: "img/bolso-tejido.png", // Nombre consistente
        categoria: "tejidos"
    },
    {
        id: 3,
        nombre: "Combo",
        precio: 95000,
        imagen: "img/combo.png",
        categoria: "tejidos"
    }
];


// Función para añadir al carrito (mejorada)
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        console.error("Producto no encontrado");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.id === id);
    
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Feedback visual mejor que alert()
    mostrarNotificacion(`✓ ${producto.nombre} añadido`);
}

// Nueva función para notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
    });
}


// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderCatalogo();
    actualizarContadorCarrito();
});
carrusel = document.querySelector('.carrusel');
carrusel.addEventListener('click', function() {
    const imagenes = this.querySelectorAll('.carrusel-img');
    let index = 0;

    setInterval(() => {
        imagenes[index].classList.remove('active');
        index = (index + 1) % imagenes.length;
        imagenes[index].classList.add('active');
    }, 3000);
});
// Añadir evento de clic a las imágenes del carrusel
const carruselImgs = document.querySelectorAll('.carrusel-img');
carruselImgs.forEach((img, index) => {
    img.addEventListener('click', () => {
        // Lógica para mostrar la imagen ampliada o en un modal
        console.log(`Imagen ${index + 1} clickeada`);
    });
});
// Añadir evento de clic a los botones del carrusel
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');
prevBtn.addEventListener('click', () => {
    // Lógica para mostrar la imagen anterior
    console.log('Botón anterior clickeado');
});
nextBtn.addEventListener('click', () => 
    // Lógica para mostrar la imagen siguiente
    console.log('Botón siguiente clickeado')
)

document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo de cómo cargar productos y asignar eventos
    const products = [
        { id: 1, name: 'Hamaca Tradicional', price: 120000 },
        { id: 2, name: 'Sombrero Vueltiao', price: 80000 },
        { id: 3, name: 'Mochila Arhuaca', price: 150000 }
    ];
    
    const catalog = document.getElementById('catalogo');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'producto';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toLocaleString()}</p>
            <button class="btn-add-to-cart" 
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}">
                Añadir al carrito
            </button>
        `;
        catalog.appendChild(productElement);
    });
    
    // Asignar evento a los botones
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productId, productName, productPrice);
            
            // Feedback visual
            this.textContent = '✓ Añadido';
            setTimeout(() => {
                this.textContent = 'Añadir al carrito';
            }, 2000);
        });
    });
});







document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo de productos (usa tus productos reales)
    const products = [
        {id: 1, name: "Hamaca", price: 120000},
        {id: 2, name: "Sombrero", price: 80000}
    ];

    // Renderizar productos
    const catalog = document.getElementById('catalogo');
    catalog.innerHTML = products.map(product => `
        <div class="producto">
            <h3>${product.name}</h3>
            <p>$${product.price.toLocaleString()}</p>
            <button class="add-to-cart" 
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}">
                Añadir al carrito
            </button>
        </div>
    `).join('');

    // Manejar clics en botones (¡usa delegación de eventos!)
    catalog.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const product = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                price: parseFloat(e.target.dataset.price)
            };
            addToCart(product); // Llama a la función del carrito
            
            // Feedback visual
            e.target.textContent = "✓ Añadido";
            setTimeout(() => e.target.textContent = "Añadir al carrito", 2000);
        }
    });
});





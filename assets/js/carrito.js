function actualizarCarrito() {
    const cartContainer = document.getElementById('lista-carrito');
    
    if (!cartContainer) return; // Protección
    
    // Resto de la lógica...
}




// carrito.js - Funcionalidad del carrito de compras

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const cantidadProductos = document.getElementById("cantidad-productos");
    const subtotalElement = document.getElementById("subtotal");
    const envioElement = document.getElementById("envio");
    const totalElement = document.getElementById("total");
    const btnPagar = document.getElementById("btn-pagar");
    
    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Actualizar carrito
    function actualizarCarrito() {
        // Limpiar lista
        listaCarrito.innerHTML = '';
        
        if (carrito.length === 0) {
            listaCarrito.innerHTML = `
                <div class="carrito-vacio">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="productos.html" class="btn">Ver productos</a>
                </div>
            `;
            cantidadProductos.textContent = '0';
            subtotalElement.textContent = '$0';
            envioElement.textContent = '$0';
            totalElement.textContent = '$0';
            btnPagar.disabled = true;
            return;
        }
        
        // Calcular totales
        const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const envio = subtotal > 100000 ? 0 : 10000; // Envío gratis para compras mayores a $100,000
        const total = subtotal + envio;
        
        // Mostrar productos
        carrito.forEach(item => {
            const productoElement = document.createElement('div');
            productoElement.className = 'producto-carrito';
            productoElement.innerHTML = `
                <div class="producto-info">
                    <img src="${item.imagen}" alt="${item.nombre}" class="producto-img">
                    <div>
                        <h3>${item.nombre}</h3>
                        <p>$${item.precio.toLocaleString("es-CO")}</p>
                    </div>
                </div>
                <div class="producto-cantidad">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="producto-total">
                    <p>$${(item.precio * item.cantidad).toLocaleString("es-CO")}</p>
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            listaCarrito.appendChild(productoElement);
        });
        
        // Actualizar totales
        cantidadProductos.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        subtotalElement.textContent = `$${subtotal.toLocaleString("es-CO")}`;
        envioElement.textContent = subtotal > 100000 ? 'Gratis' : `$${envio.toLocaleString("es-CO")}`;
        totalElement.textContent = `$${total.toLocaleString("es-CO")}`;
        btnPagar.disabled = false;
        
        // Actualizar contador en el header
        actualizarContadorCarrito();
    }
    
    // Funciones globales (necesarias para los onclick en HTML)
    window.cambiarCantidad = (id, cambio) => {
        const item = carrito.find(item => item.id === id);
        if (item) {
            item.cantidad += cambio;
            
            if (item.cantidad < 1) {
                carrito = carrito.filter(item => item.id !== id);
            }
            
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }
    };
    
    window.eliminarProducto = (id) => {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    };
    
    // Inicializar carrito
    actualizarCarrito();
    
    // Botón de pago
    btnPagar.addEventListener('click', () => {
        alert('Proceso de pago simulado. ¡Gracias por tu compra!');
        localStorage.removeItem("carrito");
        carrito = [];
        actualizarCarrito();
    });
});
// Función para obtener el carrito desde localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// 1. Función para obtener el carrito
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// 2. Función para actualizar el contador
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// 3. Función para añadir productos (¡exporta esta función!)
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // ¡Esta línea es crucial!
}

// 4. Inicializar el contador al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);
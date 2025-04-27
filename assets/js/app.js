// app.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada:', window.location.pathname);
    
    // Inicializa solo lo necesario para cada página
    if (document.getElementById('catalogo')) {
        // Es la página de productos
        import('./productos.js');
    }
    
    if (document.getElementById('lista-carrito')) {
        // Es la página del carrito
        import('./carrito.js');
    }
});